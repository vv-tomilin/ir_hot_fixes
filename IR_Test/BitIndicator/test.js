//* FOR = AGENT.DISPLAYS.NewView.DemoDisplays.IR_Test_demo.IR_Test_Components.BitIndicator (16.05.22)

var loadOnBitAddress = webMI.query['base'];

var rotorIndicatorElement = document.getElementById('rotor');
var slideIndicatorElement = document.getElementById('slide');

webMI.data.subscribe(loadOnBitAddress, function (e) {

  var value = e.value;

  webMI.data.subscribe('AGENT.OBJECTS.ASPD.APD1.Slide.Running', function (f) {
    var isSlide = f.value;

    webMI.data.subscribeBlock(['AGENT.OBJECTS.IVE50.Well.WellDepth', 'AGENT.OBJECTS.IVE50.Tool.ToolPosition'], [], function (d) {

      var diffWellPosition = d[0].value - d[1].value;

      if (diffWellPosition < 1) {

        if (isSlide && value > 0) {
          indicateDrillStatus(slideIndicatorElement, 1);
        } else if (isSlide === false && value > 0) {
          indicateDrillStatus(rotorIndicatorElement, 1);
        } else {
          indicateDrillStatus(slideIndicatorElement, 0);
          indicateDrillStatus(rotorIndicatorElement, 0);
        }

      }

    });
  });
});

function indicateDrillStatus(element, type) {

  if (type === 1) {
    element.style.border = '2px solid rgb(0, 255, 0)';
    element.style.fontWeight = 'bold';
    element.style.color = 'rgb(0, 255, 0';
  } else {
    element.style.border = '2px solid #c4c4c4';
    element.style.fontWeight = '400';
    element.style.color = 'rgb(205,205,205)';
  }
}