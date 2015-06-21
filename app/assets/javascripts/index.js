$(document).ready(function() {
  var View = {
    songs: $('#available-songs'),
    title: $('#title'),
    artist: $('#artist'),
    art: $('#artwork'),
    uploadForm: $('#upload-form')
  };

  var poll = function(callback) {
    callback();
    setTimeout(function() {
      poll(callback);
    }, 3000);
  }

  View.uploadForm.change(function() {
    View.uploadForm.submit();
  });

  var updateSongs = function() {
    $.get('/api/songs', function(data) {
      View.songs.html('');
      data.songs.forEach(function(songTitle) {
        var songView = $('<li>', { html: songTitle });
        View.songs.append(songView);
      });
    });
  }
  poll(updateSongs);

  var updateAlbumArt = function() {
    var imageUrl = ('/vlc/art?' + new Date().getTime());
    $.ajax({
      url: imageUrl,
      type: 'HEAD',
      success: function() {
        $('#artwork').attr({ src: imageUrl });
      },
      error: function() {
        $('#artwork').attr({ src: '' });
      }
    });
  }
  poll(updateAlbumArt);

  var updateStatus = function() {
    $.get('/vlc/requests/status.xml').then(function(data) {
      var status = $(data);
      var title = status.find('info[name=title]').text() || 'Nothing Playing';
      var artist = status.find('info[name=artist]').text();

      View.title.html(title);
      View.artist.html(artist);
    });
  }
  poll(updateStatus);
});
