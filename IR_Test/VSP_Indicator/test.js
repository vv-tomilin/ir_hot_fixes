//* FOR = AGENT.DISPLAYS.NewView.DemoDisplays.IR_Test_demo.IR_Test_Components.VSP_Indikator (28.04.22)

var valueNodeElement = document.getElementById('vsp-rotation');

var VSPRotation = webMI.query['base'];

webMI.data.subscribe(VSPRotation, function (e) {
  var value = Number(e.value).toFixed(1);

  valueNodeElement.innerHTML = value;
});