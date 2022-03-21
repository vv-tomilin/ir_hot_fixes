var totalVolume = document.getElementById("total-volume");

var totalValueAddr = webMI.query['base'];

webMI.data.subscribe(totalValueAddr, function (totalVolumeEvent) {
  var value = totalVolumeEvent.value;

  totalVolume.innerText = value.toFixed(1);
});