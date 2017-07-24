/*eslint-disable import/default */
var styles = require('./styles/styles.css');
var nunjucks = require('nunjucks');
nunjucks.configure('views', { autoescape: true });
var getContent =  require('./lib/getContent').default;

var tpl = require('./views/page.njk');
var html = tpl.render({ message: 'page!' });

var content = document.getElementById('content');
content.innerHTML = html;