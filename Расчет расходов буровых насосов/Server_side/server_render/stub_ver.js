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