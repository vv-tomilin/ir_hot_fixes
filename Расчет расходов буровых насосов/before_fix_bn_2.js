
//webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", {"decimalPlaces":"1", "id":"id_8", "nodeId":webMI.query["SmallBN2"]});


var isPumpRun = false;

webMI.data.subscribe(webMI.query["SmallBN2"], function (e) {
  if (!isPumpRun) {
    document.getElementById('first').innerHTML = "0.00"
  }
  document.getElementById('first').innerHTML = (e.value / 2).toFixed(1);
});

webMI.data.subscribe(webMI.query["BigBN2"], function (e) {

  console.log("STROKE", e.value);

  try {
    if (e.value <= 0) {
      isPumpRun = false;
    } else {
      isPumpRun = true;
    }
    document.getElementById('second').innerHTML = e.value.toFixed(2)
  } catch (err) {
    return console.log("ERROR IN BN2", err);
  }
});

webMI.data.subscribe("AGENT.OBJECTS.Test.ForMainWindow.APDWorking", function (e) {
  var value = e.value;
  if (value == true)
    document.getElementById('leb').style.color = "#1fc9ae"
  if (value == false)
    document.getElementById('leb').style.color = "#36404a"

});