//* FOR = AGENT.DISPLAYS.NewView.APD.APD_main (28.02.22)

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Turned_On", function (e) {

  var id = "id_TurnedOn";
  var idt = "id_TextTurnedOn";
  var value = e.value;

  if (value == true) {
    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt, "#ffffff");
  }
});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Ready", function (e) {
  var id = "id_Ready"; //2
  var idt = "id_TextReady";
  var value = e.value;

  if (value == true) {
    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt, "#ffffff");
  }
});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Running", function (e) {
  var id = "id_Running"; //2
  var idt = "id_TextRunning";
  var isApdRunning = e.value;

  if (isApdRunning == true) {

    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt, "#000000");

  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt, "#ffffff");

    document.getElementById("id_16").innerHTML = "0.00";
  }

  // webMI.data.read("AGENT.OBJECTS.ASPD.APD1.MasterMode", function (masterModeEvent) {
  //   masterMode(masterModeEvent);
  // });

});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.No_Limit_Warning", function (e) {
  var id = "id_Warning"; //2
  var idt = "id_TextWarning";
  var value = e.value;

  if (value == false) {
    webMI.gfx.setFill(id, "#ffff00");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#585824");
    webMI.gfx.setFill(idt, "#ffffff");
  }
});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.No_Emergency_Stop", function (e) {
  var id = "id_Alarm"; //2
  var idt = "id_TextAlarm";
  var value = e.value;

  if (value == false) {
    webMI.gfx.setFill(id, "#f80000");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#840000");
    webMI.gfx.setFill(idt, "#ffffff");
  }
});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.ModeReg", function (e) {
  var id = "id_ModeRegSpeed"; //2
  var idt = "id_TextSpeed";
  var value = e.value;

  if (value == 2) {
    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt, "#ffffff");
  }
});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.ModeReg", function (e) {
  var id = "id_ModeRegLoad"; //0
  var idt = "id_TextLoad";
  var value = e.value;

  if (value == 0) {
    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt, "#ffffff");
  }
});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.ModeReg", function (e) {
  var id = "id_ModeRegPressure"; //1
  var idt1 = "id_TextPressure1";
  var idt2 = "id_TextPressure2";
  var value = e.value;

  if (value == 1) {
    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt1, "#000000");
    webMI.gfx.setFill(idt2, "#000000");
  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt1, "#ffffff");
    webMI.gfx.setFill(idt2, "#ffffff");
  }
});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.ModeReg", function (e) {
  var id = "id_ModeRegTorque"; //3
  var idt = "id_TextTorque";
  var value = e.value;

  if (value == 3) {
    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt, "#ffffff");
  }
});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.MasterMode", function (ev) {
  masterMode(ev);
});

function masterMode(event) {
  var e = event;

  var MDrilling = {
    id: "id_MasterModeDrilling",
    idt: "id_TextDrilling",
    idp: "id_PictDrilling"
  };

  var MDescent = {
    id: "id_MasterModeDescent",
    idt: "id_TextDescent",
    idp: "id_PictDescent"
  };

  var MRise = {
    id: "id_MasterModeRise",
    idt: "id_TextRise",
    idp: "id_PictRise"
  };

  var labelsToSwitch = [
    "id_16",      //?????????????? ???????????????? ???????????????? ??/??
    "id_48",      //?????????????????????? ???? ????????????????
    "id_4",       //???????????????????????????? ???? ????????????????
    "id_37",      //?????????????? ???? ????????????????
    "id_1",       //?????????????????????? ???? ????????????????
    "id_5"        //???????????????????????????? ???? ????????????????
  ];

  var DrillingNodes = [
    //* "AGENT.OBJECTS.ASPD.Drawworks.HookBlock.Position.Speed",
    "AGENT.OBJECTS.IVE50.Well.DrillSpeed",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Drill.Limit",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Drill.Warning_Zone",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Drill.SetPoint",
    "AGENT.OBJECTS.ASPD.APD1.Load.Drill.Limit",
    "AGENT.OBJECTS.ASPD.APD1.Load.Drill.Warning_Zone"
  ];

  var DescentNodes = [
    "AGENT.OBJECTS.ASPD.Drawworks.HookBlock.Position.Speed_Filtered_For_Chart",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Descent.Limit",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Descent.Warning_Zone",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Reg.Setpoint",
    "AGENT.OBJECTS.ASPD.APD1.Load.Descent.Limit",
    "AGENT.OBJECTS.ASPD.APD1.Load.Descent.Warning_Zone"
  ];

  var RiseNodes = [
    "AGENT.OBJECTS.ASPD.Drawworks.HookBlock.Position.Speed_Filtered_For_Chart",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Rise.Limit",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Rise.Warning_Zone",
    "AGENT.OBJECTS.ASPD.APD1.Speed.Reg.Setpoint",
    "AGENT.OBJECTS.ASPD.APD1.Load.Rise.Limit",
    "AGENT.OBJECTS.ASPD.APD1.Load.Rise.Warning_Zone"

  ];

  switch (e.value) {
    case 0:
      //console.log("??????????????")
      Fill_texts(MDrilling, [MDescent, MRise])
      createSubscribes(labelsToSwitch, DrillingNodes)
      deleteSubscribes(DescentNodes)
      deleteSubscribes(RiseNodes)
      break;
    case 1:
      //console.log("??????????")
      Fill_texts(MDescent, [MDrilling, MRise])
      createSubscribes(labelsToSwitch, DescentNodes)
      deleteSubscribes(DrillingNodes)
      deleteSubscribes(RiseNodes)
      break;
    case 2:
      //console.log("????????????")
      Fill_texts(MRise, [MDescent, MDrilling])
      createSubscribes(labelsToSwitch, RiseNodes)
      deleteSubscribes(DrillingNodes)
      deleteSubscribes(DescentNodes)
      break;
  }
}

function Fill_texts(objectToFill, objectsToClear) {
  webMI.gfx.setFill(objectToFill.id, "#00ff00");
  webMI.gfx.setFill(objectToFill.idt, "#000000");
  webMI.gfx.setFill(objectToFill.idp, "#000000");
  objectsToClear.forEach(function (e) {
    webMI.gfx.setFill(e.id, "#004400");
    webMI.gfx.setFill(e.idt, "#ffffff");
    webMI.gfx.setFill(e.idp, "#ffffff");
  })
}

function createSubscribes(labels, nodes) {

  labels.forEach(function (e, cnt) {

    const label = labels[cnt];

    webMI.data.subscribe(nodes[cnt], function (f) {

      if (label == "id_16") {

        webMI.data.read("AGENT.OBJECTS.ASPD.APD1.Running", function (d) {

          const isApdRunning = d.value;

          if (isApdRunning) {

            webMI.gfx.setText(e, webMI.sprintf("%.2f", f.value));

          } else {

            webMI.gfx.setText(e, webMI.sprintf("%.2f", 0));

          }

        });

      } else {

        webMI.gfx.setText(e, webMI.sprintf("%.2f", f.value));

      }

    });

  });
}

function deleteSubscribes(nodes) {
  nodes.forEach(function (e) { webMI.data.unsubscribe(e) });
}

webMI.data.subscribe("AGENT.OBJECTS.ASPD.Tool.Drillstem.Rotation_Right.Active", function (e) {

  var id = "id_Turning";
  var idt = "id_TextTurning";
  var value = e.value;

  if (value == true) {
    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt, "#ffffff");
  }

});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.MSE.Inputs.MSE_Start", function (e) {

  var id = "id_Optimum";
  var idt = "id_TextOptimum";
  var value = e.value;

  if (value == true) {
    webMI.gfx.setFill(id, "#00ff00");
    webMI.gfx.setFill(idt, "#000000");
  } else {
    webMI.gfx.setFill(id, "#004400");
    webMI.gfx.setFill(idt, "#ffffff");
  }

});



webMI.data.subscribe("AGENT.OBJECTS.IVE50.Drawworks.WeightOnHook", function (e) {

  var id = "id_10";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});



webMI.data.subscribe("AGENT.OBJECTS.IVE50.Mud.Pump.PressureManifold", function (e) {

  var id = "id_12";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});


//* ????????????????
webMI.data.subscribe("AGENT.OBJECTS.IVE50.Drawworks.LoadOnBit", function (e) {

  var id = "id_20";
  var value = e.value;

  webMI.data.read("AGENT.OBJECTS.ASPD.APD1.Running", function (isRun) {
    var isApdRunning = isRun.value;

    if (isApdRunning) {
      webMI.gfx.setText(id, webMI.sprintf("%.2f", value));
    } else {
      document.getElementById(id).innerHTML = "0.00";
    }
  });

});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Diff_Pressure.PID.Inputs.Input", function (e) {

  var id = "id_23";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});

webMI.data.subscribe("AGENT.OBJECTS.IVE50.TDS.TDSTorque", function (e) {

  var id = "id_26";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});



webMI.data.subscribe("AGENT.OBJECTS.IVE50.TDS.TDSSpeed", function (e) {

  var id = "id_30";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});


webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.ModeReg", function (e) {

  var id = "id_36";
  var value = e.value;

  if (value == 2)
    webMI.gfx.setFill(id, "#00ff00");

});




webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Load.Reg.Setpoint", function (e) {

  var id = "id_39";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Diff_Pressure.Reg.Setpoint", function (e) {

  var id = "id_41";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});


webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Torque.Setpoint", function (e) {

  var id = "id_43";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});







webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Diff_Pressure.Drill.Limit", function (e) {

  var id = "id_2";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});

webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Torque.Limit", function (e) {

  var id = "id_3";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});


webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Diff_Pressure.Reg.Warning_Zone", function (e) {

  var id = "id_6";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});
webMI.data.subscribe("AGENT.OBJECTS.ASPD.APD1.Torque.Warning_Zone", function (e) {

  var id = "id_7";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});



webMI.data.subscribe("AGENT.OBJECTS.ASPD.Drawworks.HookBlock.Position.Value.Ing", function (e) {

  var id = "id_64";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});
webMI.data.subscribe("AGENT.OBJECTS.ASPD.Drawworks.HookBlock.Position.Limit_High_Warning", function (e) {

  var id = "id_60";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});
webMI.data.subscribe("AGENT.OBJECTS.ASPD.Drawworks.HookBlock.Position.Limit_Low_Warning", function (e) {

  var id = "id_62";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});



webMI.data.subscribe("AGENT.OBJECTS.IVE50.Tool.ToolPosition", function (e) {

  var id = "id_28";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));
});


webMI.data.subscribe("AGENT.OBJECTS.IVE50.Well.WellDepth", function (e) {

  var id = "id_32";
  var value = e.value;

  webMI.gfx.setText(id, webMI.sprintf("%.2f", value));

});
