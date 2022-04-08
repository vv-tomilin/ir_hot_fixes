//* FOR = AGENT.DISPLAYS.Test.left-gauge (02.03.22)


webMI.data.subscribe(webMI.query["HookWeight"], function (e) {
  var num = 0;
  if (e.value < 0) {
  } else {
    num = e.value
  }
  document.getElementById("WOH").innerHTML = num.toFixed(2)
});

webMI.data.subscribe(webMI.query["BitLoad"], function () {
  var num = 0;

  webMI.data.read(webMI.query["BitLoad"], function (e) {

    if (e.value < 0) {
    } else {
      num = e.value
    }

  });

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
  document.getElementById("HP").innerHTML = Math.round(e.value * 100) / 100;
});

webMI.data.subscribe(webMI.query["SPOSpeed"], function (sposEvent) {

  var sposValue = sposEvent.value;

  webMI.data.read("AGENT.OBJECTS.IVE50.Drawworks.HookSpeed", function (hookSpeedEv) {

    var hookSpeed = hookSpeedEv.value;

    if (hookSpeed == 0) {

      document.getElementById("SPOS").innerHTML = "0.00";

    } else {

      document.getElementById("SPOS").innerHTML = (Math.round(sposValue * 100) / 100).toFixed(2);

    }

  });

});

