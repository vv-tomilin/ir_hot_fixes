//* FOR = AGENT.DISPLAYS.NewView.DemoDisplays.IR_Test_demo.IR_Test_Components.PumpIndicator (28.04.22)

var valueNodeElement = document.getElementById('stroke-pump-value');

var strokePump = webMI.query['base'];

webMI.data.subscribe(strokePump, function (e) {
  var value = e.value;

  valueNodeElement.innerHTML = value;
});
