var express = require('express');
var path = require('path');
var open = require('open');
var compression = require('compression');
var fs = require('fs');

/*eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join( __dirname, '../dist/index.html'));
});
app.get('/api/*', function(req, res) {
    res.sendFile(path.join( __dirname, '../src'+req.path+'/'+req.query.slug));
});

var exclude = [
'index.html',
'page.html'
];

fs.readdir(path.join( __dirname, '../dist/'), (err, files) => {
    files.forEach(file => {
        if(file.indexOf('.html') > -1){
            var name = file.replace('.html', '');
            //Skip if in exclude or if it is a list page
            if(exclude.indexOf(file) === -1 ){
                app.get('/'+name+'/*', function(req, res) {
                res.sendFile(path.join( __dirname, '../dist/'+name+'.html'));
                });
            }
        }
    });
    app.get('/*', function(req, res) {
        res.sendFile(path.join( __dirname, '../dist/page.html'));
    });

     app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });

    app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
    });
});

