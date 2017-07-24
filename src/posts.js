/*eslint-disable import/default */
var styles = require('./styles/styles.css');
var nunjucks = require('nunjucks');
nunjucks.configure('views', { autoescape: true });
var getContent =  require('./lib/getContent').default;
var parseURL = require('./lib/parseURL').default;

getContent.then((res) => {
    var json = JSON.parse(res);
    var data = {};
    var tpl = {};
    console.log(json);

    if(typeof json.length !== 'undefined'){
      if(json.length > 1){
        //list
        data = json;
        tpl = require('./views/common/multiple.njk');
      }else{
        //detail
        data = json[0];
        tpl = require('./views/common/single.njk');
      }
    }
    var html = tpl.render({"data":data});
    var content = document.getElementsByName('ajax-content');
    content[0].innerHTML = html;
    //console.log("data: ", data);

  })
  .catch((error) => {
    var tpl = require('./views/404.njk');
    var html = tpl.render(error);

    var content = document.getElementsByName('ajax-content');
    content[0].innerHTML = html;
  });

var pURL = new parseURL(location.href);
var path = pURL.pathname.split('/');

//replace with Blank Spinner
var tpl = require('./views/post.njk');

var html = tpl.render({"data":""});

var body = document.getElementById('content');
body.innerHTML = html;