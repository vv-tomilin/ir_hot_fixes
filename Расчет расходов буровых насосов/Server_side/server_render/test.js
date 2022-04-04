//*------------------------------------------------------------------------------------------------------------
//* Parameter Name | Type   | Trigger | Value
//*------------------------------------------------------------------------------------------------------------
//* flowInput      | node   | 1       | ns=1;s=AGENT.OBJECTS.IVE50.Mud.FlowInput
//*------------------------------------------------------------------------------------------------------------
//* pump1          | node   | 1       | ns=1;s=AGENT.OBJECTS.IVE50.Mud.Pump.StrokePump1
//*------------------------------------------------------------------------------------------------------------
//* pump2          | node   | 1       | ns=1;s=AGENT.OBJECTS.IVE50.Mud.Pump.StrokePump2
//*------------------------------------------------------------------------------------------------------------
//* flow_1         | string | 0       | AGENT.OBJECTS.IVE50.Mud.Pump.SyntheticFlowPumps.Synthetic_FlowPump_1
//*------------------------------------------------------------------------------------------------------------
//* flow_2         | string | 0       | AGENT.OBJECTS.IVE50.Mud.Pump.SyntheticFlowPumps.Synthetic_FlowPump_2
//*------------------------------------------------------------------------------------------------------------


var flowPump_1 = new UaNode(flow_1);
var flowPump_2 = new UaNode(flow_2);

var isPumpRun_1 = false;
var isPumpRun_2 = false;

var strokePump_1 = pump1.value;
var strokePump_2 = pump2.value;

isPumpRun_1 = isRun(strokePump_1, isPumpRun_1);
isPumpRun_2 = isRun(strokePump_2, isPumpRun_2);

if (isPumpRun_1 && isPumpRun_2) {

  var divideFlowValue = (flowInput.value / 2).toFixed(2);

  flowPump_1.assign({ value: divideFlowValue });
  flowPump_2.assign({ value: divideFlowValue });

} else if (isPumpRun_1 && !isPumpRun_2) {

  flowPump_1.assign({ value: flowInput.value });
  flowPump_2.assign({ value: 0 });

} else if (isPumpRun_2 && !isPumpRun_1) {

  flowPump_1.assign({ value: 0 });
  flowPump_2.assign({ value: flowInput.value });

} else {
  flowPump_1.assign({ value: 0 });
  flowPump_2.assign({ value: 0 });
}

function isRun(pumpValue, pumpStatus) {

  if (pumpValue > 0) {
    return pumpStatus = true;
  } else {
    return pumpStatus = false;
  }
}