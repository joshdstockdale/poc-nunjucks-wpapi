var nunjucks = require('nunjucks');
var env = new nunjucks.Environment(new nunjucks.WebLoader('views'));
// var $http = require('./ajax');
// var parseURL = require('./parseURL');

// function RemoteExtension() {
//     this.tags = ['remote'];

//     this.parse = function(parser, nodes, lexer) {
//         // get the tag token
//         var tok = parser.nextToken();

//         // parse the args and move after the block end. passing true
//         // as the second arg is required if there are no parentheses
//         var args = parser.parseSignature(null, true);
//         parser.advanceAfterBlockEnd(tok.value);

//         // parse the body and possibly the error block, which is optional
//         var body = parser.parseUntilBlocks('error', 'endremote');
//         var errorBody = null;

//         if(parser.skipSymbol('error')) {
//             parser.skip(lexer.TOKEN_BLOCK_END);
//             errorBody = parser.parseUntilBlocks('endremote');
//         }

//         parser.advanceAfterBlockEnd();

//         // See above for notes about CallExtension
//         return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
//     };

//     this.run = function(context, url, body, errorBody) {
//       var config = require('../config.json');
//       var bURL = config.url;
//       if(BG_ENV == 'dev'){
//         bURL = config.dev.url;
//       }
//       var dataP = config.data_path;
//       if(BG_ENV == 'dev'){
//         dataP = config.dev.data_path;
//       }
//       var rURL = parseURL(url);
//       console.log("rURL: ",rURL.protocol+rURL.host+rURL.port);
//       console.log("Config: ", bURL);
//       if(rURL.protocol+rURL.host+rURL.port !== bURL){
//         return false;
//       }
//       console.log("Send to $http: ", dataP+rURL.pathname);
//       $http(rURL, 'get', dataP+rURL.pathname);
//     };
// }
// env.addExtension('RemoteExtension', new RemoteExtension());
module.exports = env;