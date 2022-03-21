
//* ------------------------------------------------------------------------------
//*                               Parameters
//* ------------------------------------------------------------------------------
//* flowPumpSum      | string | AGENT.OBJECTS.IVE50.Mud.Pump.FlowPumpsSum
//* ------------------------------------------------------------------------------
//* flowPump1        | node   | ns=1;s=AGENT.OBJECTS.IVE50.Mud.Pump.FlowPump1
//* flowPump2        | node   | ns=1;s=AGENT.OBJECTS.IVE50.Mud.Pump.FlowPump2
//* ------------------------------------------------------------------------------
//* nodeFlowPumpsSum | node   | ns=1;s=AGENT.OBJECTS.IVE50.Mud.Pump.FlowPumpsSum
//* ------------------------------------------------------------------------------

var nodeFlowPumpsSum = new UaNode(flowPumpSum);

var sumCalc = flowPump1.value + flowPump2.value;

nodeFlowPumpsSum.assign({ value: sumCalc });

console.log("==== SUM CALC ====", sumCalc);
console.log("==== RESULT ====", nodeFlowPumpsSum.value);