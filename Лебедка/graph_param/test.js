var max = 10;

webMI.data.read(webMI.query['max'], function (e) {
  max = e.value
});

var grey_part = document.getElementById("id_6");
var blue_part = document.getElementById("id_5");
var yellow_part = document.getElementById("id_4");
var red_part = document.getElementById("id_1");
var blue_min = 0.65;
var blue_mult = 1 - blue_min;

grey_part.children[2].style.transition = '0.5s ease';
blue_part.children[2].style.transition = '0.5s ease';
yellow_part.children[2].style.transition = '0.5s ease';
red_part.children[2].style.transition = '0.5s ease';


webMI.data.subscribe(webMI.query["base"], function (e) {

  webMI.data.read("AGENT.OBJECTS.ASPD.APD1.Running", function (apdRun) {

    var query = webMI.query["base"];

    var isApdRunning = apdRun.value;

    if (isApdRunning) {

      renderStarted(e, 'default');

    } else {

      if (query == "AGENT.OBJECTS.IVE50.Drawworks.LoadOnBit") {
        renderStarted(e, 'load_on_bit');
      } else {
        renderStarted(e, 'default');
      }

    }
  });
});


function renderStarted(event, config) {

  if (config == 'default') {

    rendering(event, config);

  }

  if (config == 'load_on_bit') {

    rendering(event, config);

  }
}

function rendering(ev, valConfig) {

  var e = ev;

  if (e.value > max) {

    max = e.value;
  }

  if (valConfig == 'default') {
    var value = e.value / max;
  }

  if (valConfig == 'load_on_bit') {
    var value = 0;
  }

  var zerostr = "scale(0,0)";
  var fullstr = "scale(1,1)";

  if (value < 0.1) {

    red_part.children[2].style.WebkitTransform = zerostr;
    yellow_part.children[2].style.WebkitTransform = zerostr;
    blue_part.children[2].style.WebkitTransform = zerostr;
    grey_part.children[2].style.WebkitTransform = "scale(1,1)";

  } else if (value < 0.8) {

    red_part.children[2].style.WebkitTransform = zerostr;
    yellow_part.children[2].style.WebkitTransform = zerostr;
    grey_part.children[2].style.WebkitTransform = zerostr;

    var est_value = 0.65 + (((value - 0.1) / 7 * 10) * 0.35);
    var str = "scale(" + est_value + "," + est_value + ")";

    blue_part.children[2].style.WebkitTransform = str;

  } else if (value < 0.9) {

    red_part.children[2].style.WebkitTransform = zerostr;
    grey_part.children[2].style.WebkitTransform = zerostr;
    blue_part.children[2].style.WebkitTransform = fullstr;

    var est_value = 0.88 + ((value - 0.8) * 10 * 0.12);
    var str = "scale(" + est_value + "," + est_value + ")";

    yellow_part.children[2].style.WebkitTransform = str;

  } else {

    blue_part.children[2].style.WebkitTransform = fullstr;
    yellow_part.children[2].style.WebkitTransform = fullstr;
    grey_part.children[2].style.WebkitTransform = zerostr;

    var est_value = 0.9 + ((value - 0.9) * 10 * 0.1);
    var str = "scale(" + est_value + "," + est_value + ")";

    red_part.children[2].style.WebkitTransform = str
  }
}
