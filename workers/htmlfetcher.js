// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// Look in archive sites.txt for files that haven't been cached

// var http = require('http');
// var fs = require('fs');
var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(archive.downloadUrls);






//make queue array
// var queue;
// fs.readFile('./archives/sites.txt', function(err, data) {

//   if (err) { console.log('error reading sites.txt'); }
//   data = data.toString().split(',');
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

