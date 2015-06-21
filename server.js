var express = require("express");
var fs = require('fs');
var multer = require('multer');
var request = require('request');

var app = express();
var songsDir = './library/';
var vlcHost = 'http://10.0.100.2:8080';

app.use(multer({
  dest: songsDir,
  rename: function(fieldname, filename) {
    return filename;
  }
}));

app.get('/vlc*', function(req, res) {
  var vlcUrl = (vlcHost + req.path.match(new RegExp('/vlc(.*)'))[1]);
  request(vlcUrl).pipe(res);
});

app.get('/',function(req,res){
  res.sendFile(__dirname + "/app/views/index.html");
});

app.get('/assets/*', function(req, res) {
  res.sendFile(__dirname + '/app' + req.path);
});

app.post('/api/songs', function(req, res) {
  res.redirect('/');
});

app.get('/api/songs', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  fs.readdir(songsDir, function(err, files) {
    var songs = files.reduce(function(songs, file) {
      if (!file.match(new RegExp('^\\.'))) {
        songs.push(file);
      }
      return songs;
    }, []);

    var data = { songs: songs };
    res.send(JSON.stringify(data));
  });
});

app.listen(3000, function(){
  console.log("Working on port 3000");
});
