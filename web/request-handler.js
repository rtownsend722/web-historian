var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers.js');
var fs = require('fs');
var http = require('http');

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
      //If website is cached, render website to client
      if ('./archives/sites/' + website === true) {
        fs.readFile('./archives/sites/' + website, 'utf8', function(err, content) {
          if (err) { 
            console.log('error encountered in rendering cached site'); 
          } else {
            statusCode = 200;
            res.writeHead(statusCode, headers);
            res.write(content);
            res.end();
          }      
        });

      // If website is not cached, add website to sites.txt
      } else {
        fs.appendFile('./archives/sites.txt', website + ', ', function(err) {
          if (err) {
            console.log('error encountered adding site to sites.txt');
          }
        }); 

        //also render loading to client
        fs.readFile('./web/public/loading.html', 'utf-8', function(err, content) {
          if (err) { 
            console.log('error encountered rendering loading page'); 
          } else {
            statusCode = 201;
            res.writeHead(statusCode, headers);
            res.write(content);
            res.end();
          }
        });
      }
    });

  } 
  
  //render initial page
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
