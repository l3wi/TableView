var picam = require( "picam" );

var opts = {
    width: 1280,
    height: 720,
    quality: 100
}

var capture = function (time) {
  var p = new Promise( function( res, rej ) {
    var location = "./images/" + time + ".jpg"
    picam.still(location, opts , function(err,stdin,stdout) {
      console.log(stdin);
      console.log(stdout);
      if(err) throw err;
      console.log('Image Captured at ' + location);
      res(location);
    });
  })
  return p;
}

module.exports = capture;
