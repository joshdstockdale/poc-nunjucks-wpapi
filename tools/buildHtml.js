// This script copies src/index.html into /dist/index.html
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only use a separate css file in prod.
var fs = require('fs');
var cheerio = require('cheerio');
var colors = require('colors');

/*eslint-disable no-console */
var webpackConfig = require('../webpack.config.prod');
if(JSON.stringify(webpackConfig) !== JSON.stringify({})){
  fs.readdir('src', (err, files) => {
    files.forEach(file => {
      if(file.indexOf('.html') > -1){
        fs.readFile('src/'+file, 'utf8', (err, markup) => {
          if (err) {
            return console.log(err);
          }

          const $ = cheerio.load(markup);

          // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
          // $('head').prepend('<link rel="stylesheet" href="styles.css">');
          // $('body').append('<script src="./'+file.replace('.html', '')+'-bundle.js"></script>');

          fs.writeFile(webpackConfig.output.path+'/'+file, $.html(), 'utf8', function (err) {
            if (err) {
              return console.log(err);
            }
            console.log((file+' written to /dist').green);
          });
        });
      }
    });
  });
}



