export default function(method, url, async=true, args) {
  var http = new XMLHttpRequest();
  // Creating a promise
  const promise = new Promise( function (resolve, reject) {

    // Instantiates the XMLHttpRequest
    const client = new XMLHttpRequest();
    let uri = url;

    if (args && (method === 'POST' || method === 'PUT')) {
      uri += '?';
      let argcount = 0;
      for (let key in args) {
        if (args.hasOwnProperty(key)) {
          if (argcount++) {
            uri += '&';
          }
          uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
        }
      }
    }

    client.open(method, uri, true);
    client.send();

    client.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        // Performs the function "resolve" when this.status is equal to 2xx
        resolve(this.responseText);
      } else {
        // Performs the function "reject" when this.status is different than 2xx
        reject(this.statusText);
      }
    };
    client.onerror = function () {
      reject(this.statusText);
    };
  });

  // Return the promise
  return promise;
}