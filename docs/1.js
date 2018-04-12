var log = function(s) {
  var zone = document.getElementById("log");
  zone.append(s);
};

var progress = (function() {
  var scale = 5;

  var black = "rgba(0,0,0,1)";
  var red = "rgba(255,0,0,1)";
  var green = "rgba(0,255,0,1)";
  var blue = "rgba(0,0,255,1)";

  var getContext = function() {
    log("get. ");
    var canvas = document.getElementById("basicCanvas");
    var context = canvas.getContext("2d");
    context.font = "10px serif";
    context.translate(20, 0);
    return context;
  };

  var context = getContext();

  var pixel = function(color, x, y) {
    log("px. ");
    context.fillStyle = color;
    context.fillRect(x * scale, y * scale, scale -1, scale -1);
  };

  var oblique = function(text, xPos, yPos) {
    log("oblique. ");
    context.save();
    context.translate((xPos - 1) * scale, yPos * scale);
    context.rotate(-Math.PI / 4);
    context.fillStyle = black;
    context.textAlign = "right";
    context.fillText(text, 0, 3 * scale);
    context.restore();
  };

  var toX = function(time) {
    var mod = time % 10;
    var x = (time - mod) / 10;
    return x + Math.floor(time / 60); // add an x-space every 60 hits
  };

  var toY = function(time) {
    var mod = time % 10;
    return 10 - mod;
  };

  function dateToString(d) {
    d = d || new Date();
    return (
      // + ("0" + d.getHours()).slice(-2) + ":" 
      // + ("0" + d.getMinutes()).slice(-2) + ":"
      + ("0" + d.getSeconds()).slice(-2) + ":"
      + ("00" + d.getMilliseconds()).slice(-3)
    );
  }

  return {
    plot: function(delay) {
      var x = toX(delay);
      var y = toY(delay);
      //poxel(delay, delay % 7 ? green : red);
      pixel(red, x, y);
      if (delay % 60 == 0) {
        var date = dateToString();
        oblique(date, x, 10);
      }
    }
  };
})(); // end progress

for (var delay1 = 0; delay1 < 200; delay1++)
  (function(delay) {
    setTimeout(function() {
      var t = delay;
      progress.plot(delay);
    }, delay * 1000 / 10 / 4 / 5);
  })(delay1);

