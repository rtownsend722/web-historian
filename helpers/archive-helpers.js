var fs = require('fs');
var request = require('request');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile('./archives/sites.txt', 'utf-8', function(err, sites) {
    if (err) { console.log('error in readListOfUrls'); }
    sites = sites.toString().split('\n');
    //what is the callback?
    if (callback) {
      callback(sites);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(sites) {
    var found = _.any(sites, function(site, i) {
      return site.match(url);
    });
    callback(found);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err, file) {
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  var sitePath = path.join(exports.paths.archivedSites, url);

  //what is this
  fs.access(sitePath, function(err) {
    callback(!err);
  });
};

//this is the last callback
exports.downloadUrls = function(urls) {
  _.each(urls, function(url) {
    if (!url) {
      return;
    }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};


/*Our old htmlfetcher code*/
// var queue;
// fs.readFile('./archives/sites.txt', 'utf-8', function(err, data) {

//   if (err) { console.log('error reading sites.txt'); }
//   queue = data.split(',');
//   for (var i = 0; i < queue.length; i++) {
//   //for each in queue
//     var file = fs.createWriteStream('./archives/sites/' + queue[i]);
//     var request = http.get(queue[i].slice(indexOf('=') + 1), function(response) {
//       response.pipe(file);
//     });
//   }
//   //clear sites.txt

//   fs.writeFile('./archives/sites.txt', '', function(err) {
//     if (err) { console.log('Error overwriting sites.txt'); }
//   });
// });
