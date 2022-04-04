
//* BN_2

webMI.data.subscribe(webMI.query["SmallBN2"], function (e) {

  var value = e.value;

  if (value >= 0) {

    document.getElementById('first').innerHTML = e.value.toFixed(1);

  } else {

    document.getElementById('first').innerHTML = "0.0";

  }

});

webMI.data.subscribe(webMI.query["BigBN2"], function (e) {

  document.getElementById('second').innerHTML = e.value.toFixed(1);

});

webMI.data.subscribe("AGENT.OBJECTS.Test.ForMainWindow.APDWorking", function (e) {

  var value = e.value;

  if (value == true)

    document.getElementById('leb').style.color = "#1fc9ae";

  if (value == false)

    document.getElementById('leb').style.color = "#36404a";

});