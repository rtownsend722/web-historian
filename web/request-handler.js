var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers.js');
var fs = require('fs');

// require more modules/folders here!
var headers = httpHelpers.headers;
var statusCode = 200;
var response = '';

exports.handleRequest = function (req, res) {
  if (req.method === 'POST') {
    var website = '';
    req.on('data', function(chunk) {
      website += chunk;
    }).on('end', function() {
      fs.readFile('./archives/sites.txt', function(err, data) {
        if (err) { 
          throw err; 
        }

        if (data.indexOf(website) >= 0) {
          console.log('FOUND IT!!!!!!!');
          //return the cached website
          res.writeHead(statusCode, headers);
          res.end(response);

        } else {
          fs.appendFile('./archives/sites.txt', website + ' '); // added url to queue
          fs.readFile('./web/public/loading.html', 'utf-8', function(err, content) {
            console.log(content);
            if (err) { 
              throw err; 
            } else {
              statusCode = 201;
              res.writeHead(statusCode, headers);
              res.write(content);
              res.end();
            }
          });
        }
      });
    });
  } 
  
  if (req.method === 'GET') {
    fs.readFile('./web/public/index.html', 'utf8', function(err, content) {
      if (err) { 
        throw err; 
      } else {
        statusCode = 200;
        res.writeHead(statusCode, headers);
        res.write(content);
        res.end();
      }      
    });
  }

  
};
