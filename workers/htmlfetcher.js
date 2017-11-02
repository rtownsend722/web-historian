// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// Look in archive sites.txt for files that haven't been cached

var http = require('http');
var fs = require('fs');

//make queue array
var queue;
fs.readFile('./archives/sites.txt', 'utf-8', function(err, content) {
  queue = content.split(',');
});

for (var i = 0; i < queue.length; i++) {
//for each in queue
  var file = fs.createWriteStream('./archives/test.html');
  var request = http.get('www.google.com', function(response) {
    response.pipe(file);
  });
}
//clear sites.txt