var lebedka = document.getElementById('leb')


webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Running", function (e) {
  var valueApdRun = e.value;

  if (valueApdRun == false) {
    document.getElementById("ROP").innerHTML = 0.00;
  }

  webMI.data.subscribe(webMI.query["base"], function (e) {
    var baseValue = e.value;
    document.getElementById("ROP").innerHTML = baseValue;
  })

});

webMI.data.subscribe("AGENT.OBJECTS.Test.ForMainWindow.APDWorking", function (e) {
  var value = e.value;
  console.log(document.getElementById('leb'))
  if (value == true)
    document.getElementById('leb').style.color = "#1fc9ae"
  if (value == false)
    document.getElementById('leb').style.color = "#36404a"

});
webMI.data.subscribe("AGENT.OBJECTS.Test.ForMainWindow.APDWorking", function (e) {
  var id = "id_5";
  var value = e.value;
  if (value == true)
    webMI.gfx.setFill(id, "#1fc9ae");
  if (value == false)
    webMI.gfx.setFill(id, "#343e47");

});

