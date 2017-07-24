var express = require('express');
var webpack = require('webpack');
var path = require('path');
var open = require('open');
var fs = require('fs');
/* eslint-disable no-console */

const port = 5000;
const app = express();

var env = '';
process.argv.forEach(function (val, index, array) {
  if(val.toString().startsWith('webpack.config')){
    env = val;
  }
});

var config = require("../"+env);
//console.log("config", config);
if(JSON.stringify(config) !== JSON.stringify({})){

  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('/', function(req, res) {
    console.log("HOME");
    res.sendFile(path.join( __dirname, '../src/index.html'));
  });
  app.get('/api/*', function(req, res) {
    console.log("API");
    const detailDir = path.join( __dirname, '../src'+req.path+'/');
    if(typeof(req.query.slug) !== 'undefined'){
      res.sendFile(detailDir+req.query.slug+'.json');
    }else{
      let list = [];
      fs.readdir(detailDir, function(err, file){
        if (err) {
          res.send(JSON.stringify(err));
          return;
        }
        file.forEach(file => {
          const structure = {title: {rendered: ""}, slug: "" }
          let item = structure;
          item.title.rendered = file.replace(/-/g, ' ').replace('.json', '');
          item.slug = file.replace('.json', '');
          list.push(item);
        });
        res.send(JSON.stringify(list));
      });
      // fs.readdirSync(detailDir).forEach(file => {
      //   let item = structure;
      //   item.title.rendered = file.replace(/-/g, ' ').replace('.json', '');
      //   item.slug = file.replace('.json', '');
      //   list.push(item);
      // });

    }
  });

  var exclude = [
    'index.html',
    'page.html'
  ];

  fs.readdir(path.join( __dirname, '../src/'), (err, files) => {
    files.forEach(file => {
      if(file.indexOf('.html') > -1){
        var name = file.replace('.html', '');
        //Skip if in exclude or if it is a list page
        if(exclude.indexOf(file) === -1 ){
          app.get('/'+name+'/*', function(req, res) {
            console.log("NAME*");

            res.sendFile(path.join( __dirname, '../src/'+name+'.html'));
          });
          app.get('/'+name+'/', function(req, res) {
            console.log("NAME");

            res.sendFile(path.join( __dirname, '../src/'+name+'.html'));
          });
        }
      }
    });
    app.get('/*', function(req, res) {
        console.log("OTHER");

      res.sendFile(path.join( __dirname, '../src/page.html'));
    });
    // app.get('/*/*', function(req, res) {
    //   res.sendFile(path.join( __dirname, '../src/page.html'));
    // });


    app.listen(port, function(err) {
      if (err) {
        console.log(err);
      } else {
        open(`http://localhost:${port}`);
      }
    });
  });
}else{
  console.log("ERROR: Bad webpack.config file.");
}
