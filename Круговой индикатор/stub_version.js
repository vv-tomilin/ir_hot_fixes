//* FOR = SISTEM.LIBRARY.PROJECT.OBJECTDISPLAYS.Test.test_bar (26.04.22)

var number = webMI.query["base"];

var need_angle = parseInt(webMI.query["Angle"]);
var yellowBar = document.getElementById("id_0");
var MinYellowBar = document.getElementById("id_1");
var blue_circle = document.getElementById("id_3");
var red_circle = document.getElementById("id_5");
var yellow_circle = document.getElementById("id_4");

red_circle.style.WebkitTransformOrigin = 'right center';
red_circle.style.WebkitTransform = 'rotate(-180deg)';
blue_circle.style.WebkitTransformOrigin = 'right center';
blue_circle.style.WebkitTransform = 'rotate(-180deg)';
yellow_circle.style.WebkitTransformOrigin = 'right center';
yellow_circle.style.WebkitTransform = 'rotate(-180deg)';

webMI.data.subscribe(number, function (e) {
  webMI.data.read(webMI.query['MaxValue'], function (f) {

    var max = f.value;
    var min = 0;
    var restrict1 = max / 100 * 61;
    var restrict3 = max / 100 * 81;
    var value = e.value;

    if (e.value > max) {
      value = max;
    }
    if (e.value < min) {
      value = min
    }

    red_circle.style.transition = '0.5s ease';
    blue_circle.style.transition = '0.5s ease';
    yellow_circle.style.transition = '0.5s ease';

    var str = "rotate(-" + (180 - value / max * need_angle) + "deg)";

    if (value < restrict1) {
      blue_circle.style.WebkitTransform = str;
      yellow_circle.style.WebkitTransform = str;
      red_circle.style.WebkitTransform = str;
    } else if (value < restrict3) {

      var bluestr = "rotate(-" + (180 - restrict1 / max * need_angle) + "deg)";

      blue_circle.style.WebkitTransform = bluestr;
      yellow_circle.style.WebkitTransform = str;
      red_circle.style.WebkitTransform = str;

    } else {

      var bluestr = "rotate(-" + (180 - restrict1 / max * need_angle) + "deg)";
      var yellowstr = "rotate(-" + (180 - restrict3 / max * need_angle) + "deg)";

      blue_circle.style.WebkitTransform = bluestr;
      yellow_circle.style.WebkitTransform = yellowstr;
      red_circle.style.WebkitTransform = str;
    }
  });
});

