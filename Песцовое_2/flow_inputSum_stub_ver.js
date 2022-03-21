//* FOR - AGENT.OBJECTS.IVE50.Mud.Pump.FlowPumpsSum.flowPumpsSummCalculate (21.03.2022)

//* Расчет общей суммы расхода с двух насосов

//* -----------------------------------------------------------------------------------
//* |                               Parameters
//* -----------------------------------------------------------------------------------
//* | 1 | flowPumpSum      | string | AGENT.OBJECTS.IVE50.Mud.Pump.FlowPumpsSum
//* -----------------------------------------------------------------------------------
//* | 2 | flowPump1        | node   | ns=1;s=AGENT.OBJECTS.IVE50.Mud.Pump.FlowPump1
//* -----------------------------------------------------------------------------------
//* | 3 | flowPump2        | node   | ns=1;s=AGENT.OBJECTS.IVE50.Mud.Pump.FlowPump2
//* -----------------------------------------------------------------------------------
//* | 4 | nodeFlowPumpsSum | node   | ns=1;s=AGENT.OBJECTS.IVE50.Mud.Pump.FlowPumpsSum
//* -----------------------------------------------------------------------------------

var nodeFlowPumpsSum = new UaNode(flowPumpSum);

var sumCalc = flowPump1.value + flowPump2.value;

nodeFlowPumpsSum.assign({ value: sumCalc });