//* FOR = AGENT.DISPLAYS.Test.left-gauge (26.04.22)

webMI.data.subscribe(webMI.query["HookWeight"], function (e) {
  var num = 0;
  if (e.value < 0) {
  } else {
    num = e.value;
  }
  document.getElementById("WOH").innerHTML = num.toFixed(2)
})
webMI.data.subscribe(webMI.query["BitLoad"], function (e) {
  var num = 0;
  if (e.value < 0) {
  } else {
    num = e.value;
  }
  document.getElementById("LOB").innerHTML = num.toFixed(2);
})
webMI.data.subscribe(webMI.query["HookPosition"], function (e) {
  document.getElementById("HP").innerHTML = Math.round(e.value * 100) / 100;
})
webMI.data.subscribe(webMI.query["SPOSpeed"], function (e) {
  document.getElementById("SPOS").innerHTML = Math.round(e.value * 100) / 100;
})

