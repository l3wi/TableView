var RaspiCam = require("raspicam");

var camera = new RaspiCam({ mode: 'photo', output: './images/photo.jpg'});

var capture = function (time) {
  var p = new Promise( function( res, rej ) {
      camera.start();
      camera.on("read", function(err, timestamp, filename){
      	//do stuff
      	console.log('Image Captured at ' + filename);
        res("./images/" + time + ".jpg");
      });
    });
  return p;
}

module.exports = capture;
