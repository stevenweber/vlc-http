module.exports = function(robot) {
  robot.respond(new RegExp('play (.*)'), function(res) {
    var song = res.match[1];
    var url = 'http://127.0.0.1/play?title=' + song;

    robot.http(url).get()(function(err, response, body) {
      res.reply(song + ' coming up');
    })
  })

  robot.respond(new RegExp('stop music'), function(res) {
    var url = 'http://127.0.0.1/stop';
    robot.http(url).get()(function(err, response, body) {
      res.reply('stopping the music');
    })
  })
}
