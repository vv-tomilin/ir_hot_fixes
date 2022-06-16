
//* FOR = AGENT.DISPLAYS.NewView.DemoDisplays.IR_Test_demo.IR_Test_Components.TestList_full (16.05.22)

var name = webMI.query["Name"];

webMI.data.subscribe(webMI.query["Value2"], function (e) {
  var id = "id_74";

  var value = Number(e.value) / 1000 / 60 / 60;

  if (name === 'Тальканат') {
    value = Number(e.value / 1000);
  }

  webMI.gfx.setText(id, webMI.sprintf("%.0f", value));

});

webMI.data.subscribe(webMI.query["Value1"], function (e) {
  var id = "id_2";
  var value = e.value;

  if (name === 'ВСП' || 'Лебедка') {
    if (Number(value) != 0) {
      webMI.gfx.setFill(id, "#009600");
    }
    if (Number(value) == 0) {
      webMI.gfx.setFill(id, "#ff5500");
    }
  } else if (name === 'Долото') {
    if (Number(value) > 1) {
      webMI.gfx.setFill(id, "#009600");
    }
    if (Number(value) <= 0) {
      webMI.gfx.setFill(id, "#ff5500");
    }
  } else {
    if (value == true || Number(value) > 0) {
      webMI.gfx.setFill(id, "#009600");
    }
    if (value == false || Number(value) <= 0) {
      webMI.gfx.setFill(id, "#ff5500");
    }
  }

});
