$(document).ready(function() {
  var View = {
    songs: $('#available-songs'),
    title: $('#title'),
    artist: $('#artist'),
    art: $('#artwork'),
    uploadForm: $('#upload-form'),
    nowPlaying: $('#now-playing'),
    notPlaying: $('#not-playing')
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
        var songParam = $.param({
          title: encodeURI(songTitle)
        });

        var songLink = $('<a>', {
          href: ('/play?' + songParam),
          html: songTitle
        });

        var songView = $('<li>', { html: songLink });
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
    $.ajax({
      url: '/vlc/requests/status.xml',
      success: function(data) {
        var status = $(data);
        var title = status.find('info[name=title]').text();
        var artist = status.find('info[name=artist]').text();

        if (title) {
          View.title.html(title);
          View.artist.html(artist);

          View.notPlaying.hide();
          View.nowPlaying.show();
        } else {
          View.notPlaying.show();
          View.nowPlaying.hide();
        }
      },
      error: function() {
      }
    });
  }
  poll(updateStatus);
});
