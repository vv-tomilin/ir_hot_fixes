//webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", {"decimalPlaces":"1", "id":"id_3", "nodeId":webMI.query["BigBN1"]});
//webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text", {"decimalPlaces":"1", "id":"id_7", "nodeId":webMI.query["SmallBN1"]});

//* LAST HOT FIX = 25.02.22

//* FOR = SYSTEM.LIBRARY.PROJECT.OBJECTDISPLAYS.VovaObj.BN1

//* BigBN1 (Ходы нансоса) = AGENT.OBJECTS.IVE50.Mud.Pump.StrokePump1

//* BN_1

var isPumpRun_1 = false;
var isPumpRun_2 = false;

webMI.data.subscribe(webMI.query["BigBN1"], function (f) {

  pumpDatasRendering(f);

});

webMI.data.subscribe(webMI.query["SmallBN1"], function (d) {

  console.log(d);

  webMI.data.read(webMI.query["BigBN1"], function (e) {
    pumpDatasRendering(e);
  });

});

webMI.data.subscribe('AGENT.OBJECTS.IVE50.Mud.Pump.StrokePump2', function (f) {

  console.log(f);

  webMI.data.read(webMI.query["BigBN1"], function (e) {
    pumpDatasRendering(e);
  });

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

function pumpDatasRendering(event) {

  var bn_1 = event.value;

  try {

    if (bn_1 <= 0) {
      isPumpRun_1 = false;
    } else {
      isPumpRun_1 = true;
    }

    document.getElementById('second').innerHTML = bn_1.toFixed(1);

    webMI.data.read('AGENT.OBJECTS.IVE50.Mud.Pump.StrokePump2', function (e) {

      var bn_2 = e.value;

      if (bn_2 <= 0) {

        isPumpRun_2 = false;

      } else {

        isPumpRun_2 = true;

      }

      if (!isPumpRun_1) {

        document.getElementById('first').innerHTML = "0.0";

      }

      if (isPumpRun_1 && isPumpRun_2) {

        webMI.data.read('AGENT.OBJECTS.IVE50.Mud.FlowInput', function (e) {

          document.getElementById('first').innerHTML = (e.value / 2).toFixed(1);

        });

      }

      if (isPumpRun_1 && !isPumpRun_2) {

        webMI.data.read('AGENT.OBJECTS.IVE50.Mud.FlowInput', function (e) {

          document.getElementById('first').innerHTML = e.value.toFixed(1);

        });
      }
    });

  } catch (err) {

    return console.log("ERROR IN BN1", err);

  }
}