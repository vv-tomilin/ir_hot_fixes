//*------------------------------------------------------------------------------------------------------------
//* Parameter Name       | Type   | Trigger | Value
//*------------------------------------------------------------------------------------------------------------
//* apd_running          | node   | 1       | ns=1;s=AGENT.OBJECTS.ASPD.APD1.Running
//*------------------------------------------------------------------------------------------------------------
//* optimal_drill_on     | string | 1       | AGENT.OBJECTS.ASPD.Mode_Signals.APD1_Optimal_Drill_On
//*------------------------------------------------------------------------------------------------------------
//* optimal_drill_on_raw | node   | 1       | ns=1;s=AGENT.OBJECTS.ASPD.Mode_Signals.APD1_Optimal_Drill_On.APD1_Optimal_Drill_On_Raw
//*------------------------------------------------------------------------------------------------------------

var isApdRunning = apd_running.value;
var isOptimalDrillOn = optimal_drill_on_raw.value;

var optimalDrillOn = new UaNode(optimal_drill_on);

if (isOptimalDrillOn) {
  if (isApdRunning) {
    toggleOptimalDrillOn(true);
  } else {
    toggleOptimalDrillOn(false);
  }
} else {
  toggleOptimalDrillOn(false);
}

function toggleOptimalDrillOn(value) {
  optimalDrillOn.assign({ value: value });
}
