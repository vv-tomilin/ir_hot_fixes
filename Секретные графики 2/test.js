var container = document.getElementById('chart-container');

var datasJane = [1, 0, 4, 2, 5, 10, 3, 7, 9];
var datasJohn = [5, 7, 3, 8, 9, 1, 2, 4, 10];

var chart = Highcharts.chart(container, {
  chart: {
    type: 'line',
    width: '830',
    height: '672',
  },
  title: {
    text: 'Fruit Consumption'
  },
  xAxis: {
    type: 'linear',
    categories: ['Apples', 'Bananas', 'Oranges'],
    gridLineWidth: '1px',
    gridLineColor: '#6e6f70',
    tickInterval: 5,
    minorTickInterval: 1
  },
  yAxis: {
    title: {
      text: 'Fruit eaten'
    }
  },
  labels: {
    useHTML: Highcharts.hasBidiBug
  },
  tooltip: {
    formatter: function () {

    }
  },
  series: [
    {
      name: 'Jane',
      data: datasJane//[]
    },
    {
      name: 'John',
      data: datasJohn//[]
    }]
});

webMI.gfx.setScaledEvents(document.getElementById('chart-container'), true)