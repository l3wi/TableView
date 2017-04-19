var RaspiCam = require("raspicam");

var camera = new RaspiCam({ mode: 'photo', output: './images/photo.jpg'});

var capture = function (time) {
  var p = new Promise( function( res, rej ) {
      camera.start();

      camera.on("read", function(err, timestamp, filename){
        console.log('Stopping Camera');
         setTimeout(function () {
           camera.stop();
         }, 500);
      });
      camera.on("stop", function(err, timestamp, filename) {
      	console.log('Image Captured at ' + filename);
        res("./images/photo.jpg");
      });
    });
  return p;
}

module.exports = capture;
