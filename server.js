var express = require("express");
var fs = require('fs');
var multer = require('multer');
var request = require('request');

var app = express();
var songsDir = (__dirname + '/library');
// var vlcHost = '10.0.100.2';
var vlcHost = '127.0.0.1';
var vlcPort = '8080';

var vlc = require('vlc-api')({
  host: vlcHost,
  port: vlcPort
})

app.use(multer({
  dest: songsDir,
  rename: function(fieldname, filename) {
    return filename;
  }
}));

app.get('/vlc*', function(req, res) {
  var vlcUrl = ('http://' + vlcHost + ':' + vlcPort + req.path.match(new RegExp('/vlc(.*)'))[1]);
  request(vlcUrl).pipe(res);
});

app.get('/play', function(req, res) {
  var songName = req.query.title;
  var songMatcher = new RegExp(songName, 'i');
  var matchedFile;

  fs.readdir(songsDir, function(err, files) {
    matchedFile = files.reduce(function(song, path) {
      return path.match(songMatcher) ? path : song;
    }, undefined);

    vlc.status.play(songsDir + '/' + matchedFile, {}, function(error) {});
    res.redirect('/');
  });
});

app.get('/stop', function(req, res) {
  vlc.status.stop(function(error) {});
  res.redirect('/');
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
