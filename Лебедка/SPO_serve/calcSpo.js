//* ir-master-23@ad

var nodeHookDir = new UaNode("AGENT.OBJECTS.IVE50.Drawworks.HookPosition.HookDirection");
var nodeHookSpeedSPOBound = new UaNode("AGENT.OBJECTS.Variables.CalcSPO.HookSpeedSPOBound");
if (nnode.value > nodeHookSpeedSPOBound.value) {
  var nodeWorkStatus = new UaNode("AGENT.OBJECTS.Rig.WorkStatus");
  if (nodeHookDir.value) {

  } else {

  }
}

/*
var nodePrevHookPos = new UaNode("AGENT.OBJECTS.IVE50.Drawworks.HookPosition.PrevHookPosition");
var nodeHookDir = new UaNode("AGENT.OBJECTS.IVE50.Drawworks.HookPosition.HookDirection");
if(nnode.value > nodePrevHookPos.value){
  nodeHookDir.assign({value: false});
} else if (nnode.value < nodePrevHookPos.value){
  nodeHookDir.assign({value: true});
}
nodePrevHookPos.assign({value: nnode.value});
*/