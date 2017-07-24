// /*eslint-disable import/default */
var styles = require('./styles/styles.css');
var env = require('./lib/nunjucksEnv');

var tpl = require('./views/frontPage.njk');
var html = tpl.render({ message: '<a href=./posts/>Go to Posts</a>' });

var content = document.getElementById('content');
content.innerHTML = html;

