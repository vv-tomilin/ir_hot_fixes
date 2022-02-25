var lebedka = document.getElementById('leb')
console.log("lebedka =", lebedka)
webMI.addOnload(function () {
  webMI.data.subscribe(webMI.query["base"], function (e) {
    document.getElementById("ROP").innerHTML = Math.round(e.value * 10) / 10
  })
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
})