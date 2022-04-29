//* FOR = AGENT.DISPLAYS.NewView.DemoDisplays.IR_Test_demo.IR_Test_Components.WinchIndikator (28.04.22)

var valueNodeElement = document.getElementById('spo-speed');

var SPOSpeed = webMI.query['base'];

webMI.data.subscribe(SPOSpeed, function (e) {
  var value = Number(e.value).toFixed(1);

  valueNodeElement.innerHTML = value;
});
