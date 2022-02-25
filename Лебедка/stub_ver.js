//* FOR = AGENT.DISPLAYS.Test.left-gauge


webMI.data.subscribe(webMI.query["HookWeight"], function (e) {
  var num = 0;
  if (e.value < 0) {
  } else {
    num = e.value
  }
  document.getElementById("WOH").innerHTML = num.toFixed(2)
});

webMI.data.subscribe(webMI.query["BitLoad"], function (e) {
  var num = 0;
  if (e.value < 0) {
  } else {
    num = e.value
  }

  webMI.data.read("AGENT.OBJECTS.ASPD.APD1.Running", function (apdRun) {
    var isAdpRunning = apdRun.value;

    if (isAdpRunning) {
      document.getElementById("LOB").innerHTML = num.toFixed(2)
    } else {
      document.getElementById("LOB").innerHTML = "0.00"
    }
  })
});

webMI.data.subscribe(webMI.query["HookPosition"], function (e) {
  document.getElementById("HP").innerHTML = Math.round(e.value * 100) / 100
});

var sposAverageCalc = [];
var prevCalc = 0;
var averageResult = 0;
var CALC_AVERAGE_COUNT = 4;

webMI.data.subscribe(webMI.query["SPOSpeed"], function (e) {

  webMI.data.read("AGENT.OBJECTS.IVE50.Drawworks.HookSpeed", function (hookSpeedEv) {

    var hookSpeed = hookSpeedEv.value;

    if (hookSpeed <= 0) {

      document.getElementById("SPOS").innerHTML = "0.00";

      sposAverageCalc = [];

    } else {

      sposAverageCalc.push(e.value);

      if (sposAverageCalc.length == CALC_AVERAGE_COUNT) {

        var averCalc = sposAverageCalc.reduce(function (accumulator, currentValue) {
          return (accumulator + currentValue) / sposAverageCalc.length;
        });

        averageResult = averCalc;

        prevCalc = averCalc;

        sposAverageCalc = [];

      } else {

        averageResult = prevCalc;

      }

      document.getElementById("SPOS").innerHTML = Math.round(averageResult * 100) / 100;

    }

  });

});

