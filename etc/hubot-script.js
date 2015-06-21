module.exports = function(robot) {
  var sayings = [
    'I\'m surprised this thing still works',
    'You do realize everyone can see who requested this, right?',
    'Play it again!'
  ];

  var otherWork = [
    'making a martini',
    'rescuing a cat from a tree',
    'napping'
  ];

  robot.hear(new RegExp('^play (.*)', 'i'), function(res) {
    var song = res.match[1];
    var url = 'http://127.0.0.1/play?title=' + song;
    robot.http(url).get()(function(err, response, body) {
      res.emote('Puts quarter in jukebox');
      res.reply(res.random(sayings));
    })
  })

  robot.hear(new RegExp('^(pause|resume) music', 'i'), function(res) {
    var url = 'http://127.0.0.1/pause';

    robot.http(url).get()(function(err, response, body) {
      var job = res.random(otherWork);
      res.emote('Stops ' + job);

      if (res.match[1] === 'pause') {
        res.reply('Paused');
      } else {
        res.reply('I do enjoy this song.');
      }

      res.emote('Resumes ' + job);
    })
  })

  robot.hear(new RegExp('^stop music', 'i'), function(res) {
    var url = 'http://127.0.0.1/stop';
    robot.http(url).get()(function(err, response, body) {
      res.emote('Trips on the jukebox cord');
    })
  })
}
