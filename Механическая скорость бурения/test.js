//* FOR = SYSTEM.LAYBRARY.PROJECT.OBJECTDISPLAYS.VovaObj.WinchLeft (26.04.22)

//* base = AGENT.OBJECTS.IVE50.Well.DrillSpeed

var lebedka = document.getElementById('leb');

webMI.data.subscribe(webMI.query["base"], function (baseEvent) {

  var baseValue = baseEvent.value;

  document.getElementById("ROP").innerHTML = baseValue.toFixed(2);

});

webMI.data.subscribe("AGENT.OBJECTS.Test.ForMainWindow.APDWorking", function (e) {

  var value = e.value;

  if (value == true) {
    document.getElementById('leb').style.color = "#1fc9ae";
  }

  if (value == false) {
    document.getElementById('leb').style.color = "#36404a";
  }

});

webMI.data.subscribe("AGENT.OBJECTS.Test.ForMainWindow.APDWorking", function (e) {

  var id = "id_5";

  var value = e.value;

  if (value == true) {
    webMI.gfx.setFill(id, "#1fc9ae");
  }

  if (value == false) {
    webMI.gfx.setFill(id, "#343e47");
  }

});

