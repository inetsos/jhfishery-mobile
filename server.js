var express = require('express');
var cors = require('cors');
var vhost = require('vhost');
var app     = express();
var path    = require('path');

app.use(cors());

// Angular
app.use(express.static(path.resolve(__dirname, './dist/jhfishery-mobile'))); //1
app.get('*', function (req, res) { //2
  var indexFile = path.resolve(__dirname,'./dist/jhfishery-mobile/index.html');
  res.sendFile(indexFile);
});

// Server
var server = express();
var hostname = 'jhfishery-mobile.ebizpia.co.kr';
var port = 3302;

server.use(vhost(hostname, app));

server.listen(port, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});