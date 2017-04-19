var NodeWebcam = require( "node-webcam" );

var opts = {
    width: 1280,
    height: 720,
    delay: 0,
    quality: 100,
    output: "jpg",
    verbose: true
}

var capture = function (time) {
  var p = new Promise( function( res, rej ) {
    NodeWebcam.capture("./images/" + time + ".jpg", opts, function( err, location ) {
        if ( err ) rej()
        console.log('Image Captured at ' + location);
        res(location);
    });
  })
  return p;
}

module.exports = capture;
