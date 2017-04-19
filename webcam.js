var RaspiCam = require("raspicam");

var capture = function (time) {
  var p = new Promise( function( res, rej ) {
      var opts = {
          width: 1280,
          height: 720,
          timeout: 0,
          encoding: 'jpg',
          mode: 'photo',
          quality: 80,
          output: "./images/" + time + ".jpg"
      }
      var camera = new RaspiCam({opts});
      camera.start( );
      console.log('Image Captured at ' + opts.output);
      setTimeout(function () {
        res(opts.output);
      }, 1000);
    });
  return p;
}

module.exports = capture;
