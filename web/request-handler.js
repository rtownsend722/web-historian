var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var url = require('url');
var helpers = require('./http-helpers');

var actions = {
  'GET': function(request, response) {
    var urlPath = url.parse(request.url).pathname;
    // / means index.html
    if (urlPath === '/') { urlPath = '/index.html'; }
    helpers.serveAssets(response, urlPath, function() {
      // trim leading slash if present
      if (urlPath[0] === '/') { urlPath = urlPath.slice(1); }

      archive.isUrlInList(urlPath, function(found) {
        if (found) {
          helpers.sendRedirect(response, '/loading.html');
        } else {
          helpers.send404(response);
        }
      });
    });
  },
  'POST': function(request, response) {
    helpers.collectData(request, function(data) {
      var url = data.split('=')[1].replace('http://', '');
      // check sites.txt for web site
      archive.isUrlInList(url, function(found) {
        if (found) { // found site
          // check if site is on disk
          archive.isUrlArchived(url, function(exists) {
            if (exists) {
              // redirect to site page (/www.google.com)
              helpers.sendRedirect(response, '/' + url);
            } else {
              // Redirect to loading.html
              helpers.sendRedirect(response, '/loading.html');
            }
          });
        } else { // not found
          // add to sites.txt
          archive.addUrlToList(url, function() {
            // Redirect to loading.html
            helpers.sendRedirect(response, '/loading.html');
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];
  if (handler) {
    handler(req, res);
  } else {
    helpers.send404(response);
  }
};

//**Our Original Code for this file**




// var path = require('path');
// var archive = require('../helpers/archive-helpers');
// var httpHelpers = require('../web/http-helpers.js');
// var fs = require('fs');
// var http = require('http');
// var fetchHTML = require('../workers/htmlfetcher.js');

// // require more modules/folders here!
// var headers = httpHelpers.headers;
// var statusCode = 200;
// var response = '';

// exports.handleRequest = function (req, res) {
//   if (req.method === 'POST') {
//     var website = '';
//     req.on('data', function(chunk) {
//       website += chunk;
//     }).on('end', function() {

    
//       //If website is cached, render website to client
//       if ('./archives/sites/' + website === true) {
//         fs.readFile('./archives/sites/' + website, 'utf8', function(err, content) {
//           if (err) { 
//             console.log('error encountered in rendering cached site'); 
//           } else {
//             statusCode = 200;
//             res.writeHead(statusCode, headers);
//             res.write(content);
//             res.end();
//           }      
//         });

//       // If website is not cached, add website to sites.txt
//       } else {
//         fs.appendFile('./archives/sites.txt', website + ', ', function(err) {
//           if (err) {
//             console.log('error encountered adding site to sites.txt');
//           }
//         }); 

//         //also render loading to client
//         fs.readFile('./web/public/loading.html', 'utf-8', function(err, content) {
//           if (err) { 
//             console.log('error encountered rendering loading page'); 
//           } else {
//             statusCode = 201;
//             res.writeHead(statusCode, headers);
//             res.write(content);
//             res.end();
//           }
//         });
//       }
//     });

//   } 
  
//   //render initial page
//   if (req.method === 'GET') {
//     fs.readFile('./web/public/index.html', 'utf8', function(err, content) {
//       if (err) { 
//         throw err; 
//       } else {
//         statusCode = 200;
//         res.writeHead(statusCode, headers);
//         res.write(content);
//         res.end();
//       }      
//     });
//   }

  
// };
