var config = require("../config."+process.env.NODE_ENV+".json");
var parseURL = require("./parseURL").default;
var send = require('./ajax').default;

export default new Promise( function(resolve, reject) {
  var pURL = new parseURL(location.href);
  if(pURL.protocol+"//"+pURL.host == location.protocol+"//"+location.host){
    var content = document.getElementsByName('ajax-content');
    var dURL = config.data_url;

    //Make exception for home page, and pages which have to identifier in pathname
    var path = pURL.pathname.split('/');

    // adding posts/slug
    dURL += path[1];

    var qParams = [];
console.log("path[1]", path[1]);
    // if path includes a detail slug
    if(typeof path[2] !== 'undefined'){
      //if data url in config starts with http
      if(path[2] !== ''){
        qParams.push("slug="+path[2]);
      }
    }

    //Account for search
    if(pURL.search !== ''){
      qParams.push(pURL.search.replace('?', ''));
    }
    //Add any query params from client
    if(qParams.length > 0){
      dURL += "?"+qParams.join('&');
    }

    //If local, nodeJS handles request, otherwise external API.
    send('GET',dURL,true).then((res) => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  }
});