//* FOR = AGENT.DISPLAYS.NewView.DemoDisplays.IR_Test_demo.IR_Test_Components.PressureManifoldIndicator (28.04.22)

var valueNodeElement = document.getElementById('pressure-value');

var pressure = webMI.query['base'];

webMI.data.subscribe(pressure, function (e) {
  var value = e.value;

  valueNodeElement.innerHTML = value;
});
