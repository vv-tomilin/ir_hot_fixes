//* FOR = SYSTEM.LIBRARY.PROJECT.OBJECTSDISPLAYS.VovaObj.top


var timezone = 'Europe/Moscow';
function clock() {
  var date = document.getElementById("currentData")
  date.innerHTML = new Date().toLocaleString().slice(11, 20);
  var time = document.getElementById("curent_date")
  time.innerHTML = new Date().toLocaleString().slice(0, 10);
  var timeMoscow = document.getElementById("time_moscow");
  timeMoscow.innerHTML = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Moscow' }).slice(11, 20);
}
setInterval(clock, 1000);
webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_29", "nodeId": "AGENT.OBJECTS.Rig.General.Contract.OrgCustomer" });
webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_30", "nodeId": "AGENT.OBJECTS.Rig.General.Contract.OrgContractor" });
webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_0", "nodeId": "AGENT.OBJECTS.Rig.General.Coordinates.Latitude" });
webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_1", "nodeId": "AGENT.OBJECTS.Rig.General.Coordinates.Longitude" });

webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_33", "nodeId": "AGENT.OBJECTS.Rig.General.WellName" });

webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_31", "nodeId": "AGENT.OBJECTS.Rig.General.FieldName" });
webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_32", "nodeId": "AGENT.OBJECTS.Rig.General.BushName" });
webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_35", "nodeId": "AGENT.OBJECTS.Rig.General.RigName" });
webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", { "decimalPlaces": "0", "id": "id_34", "nodeId": "AGENT.OBJECTS.Rig.Brigade.BrigadeName" });

webMI.libraryLoader.load([], ["CSS/main.css"], function (e) {
  webMI.addEvent("id_0", "dblclick", function (e) {
    //* webMI.display.openDisplay("SYSTEM.LIBRARY.ATVISE.OBJECTDISPLAYS.Advanced.highcharts.main_display", webMI.query, "main_frame");
    webMI.display.openDisplay("AGENT.DISPLAYS.Test.SecretCharts", webMI.query, "main_frame");
    //* webMI.display.openDisplay("AGENT.DISPLAYS.Test.SecretChartsSmall", webMI.query, "main_frame");
  });
});