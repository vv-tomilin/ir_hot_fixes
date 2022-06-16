var demo = true;
var GGD_chart = Highcharts.chart(document.getElementById('GGD_container'), {
  labels: {
    useHTML: Highcharts.hasBidiBug
  },
  chart: {
    type: 'line',
    backgroundColor: 'rgba(0,0,0,0)',
    width: 1220,
    height: 610,
    plotBackgroundColor: '#101010',
    styledMode: false
  },
  title: {
    text: 'ГРАФИК: ГЛУБИНА/ДЕНЬ',
    margin: 0,
    style: {
      color: '#fff'
    }
  },
  xAxis: {
    type: 'linear',
    min: 0,
    title: {
      text: 'ПРОДОЛЖИТЕЛЬНОСТЬ БУРЕНИЯ (СУТ)',
      margin: 0,
      style: {
        color: '#fff',
        fontSize: '18px'
      },
      enabled: false
    },
    gridLineWidth: '1px',
    gridLineColor: '#6e6f70',
    tickInterval: 5,
    minorTickInterval: 1
  },
  yAxis: [{
    title: {
      text: 'ГЛУБИНА ПО СТВОЛУ (М)',
      style: {
        color: '#fff',
        fontSize: '18px'
      }
    },
    reversed: true,
    min: 0,
    gridLineColor: '#6e6f70'
  },
  {
    title: {
      enabled: false
    },
    reversed: true,
    min: 0,
    opposite: true,
    gridLineColor: '#6e6f70'
  }],
  tooltip: {
    /*headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%e. %b}: {point.y:.2f} m {point.name}'*/
    formatter: function () {
      var str = "<b>" + this.series.name + "</b><br>"
      var buf = this.point.name.split(";")
      str = str + "Дата/Время: "
      var f = new Date()
      f.setTime(buf[0])
      //console.log(f)
      var fd = f.getHours()
      if (fd < 10) { fd = "0" + fd }
      str = str + fd + ":"
      fd = f.getMinutes()
      if (fd < 10) { fd = "0" + fd }
      str = str + fd + " "

      fd = f.getDate()
      if (fd < 10) { fd = "0" + fd }
      str = str + fd + "."

      fd = f.getMonth() + 1
      if (fd < 10) { fd = "0" + fd }
      str = str + fd + "."

      fd = f.getFullYear()
      str = str + fd + "<br>"

      str = str + "<b>Забой:</b> "
      str = str + this.y
      if (buf[1] != "") {
        str = str + "<br><b>Операция: </b>"
        str = str + buf[1]
      }
      return str
      //return console.log(this.point.name)     
    }
  },
  legend: {
    enabled: false
  },

  plotOptions: {
    series: {
      turboThreshold: 60000,
      marker: {
        enabled: false
      },
      label: {
        enabled: false
      }

    }
  },
  credits: {
    enabled: false
  },

  colors: ['#FFF', '#F00', '#FF0'],
  series: [{
    name: "План",
    data: []
  }, {
    name: "Факт",
    data: []
  }, {
    name: "Положение долота",
    data: []
  }]
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

var planVis = true;
var factVis = true;
var drillVis = true;


document.getElementById("pb").addEventListener('click', function (e) {
  if (planVis) {
    GGD_chart.series[0].hide()
    document.getElementById("pb").setAttribute('src', '../../GGD_page/button_gray.png')
  } else {
    GGD_chart.series[0].show()
    document.getElementById("pb").setAttribute('src', '../../GGD_page/button_white.png')
  }
  planVis = !planVis
  var mx = Math.floor(GGD_chart.axes[0].max * 10) / 10 - 1
  advance_chart.update({ xAxis: { max: mx } })
  Effect_chart.update({ xAxis: { max: mx } })
  NPV_chart.update({ xAxis: { max: mx } })
  mx = Math.floor(GGD_chart.axes[1].max * 10) / 10
  GGD_chart.update({ yAxis: [{}, { max: mx }] })
  webMI.data.write('AGENT.OBJECTS.RigConstruction.nowMax', mx)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

document.getElementById("fb").addEventListener('click', function (e) {
  if (factVis) {
    GGD_chart.series[1].hide()
    document.getElementById("fb").setAttribute('src', '../../GGD_page/button_gray.png')
  } else {
    GGD_chart.series[1].show()
    document.getElementById("fb").setAttribute('src', '../../GGD_page/button_red.png')
  }
  factVis = !factVis
  var mx = Math.floor(GGD_chart.axes[0].max * 10) / 10 - 1
  advance_chart.update({ xAxis: { max: mx } })
  Effect_chart.update({ xAxis: { max: mx } })
  NPV_chart.update({ xAxis: { max: mx } })
  mx = Math.floor(GGD_chart.axes[1].max * 10) / 10
  GGD_chart.update({ yAxis: [{}, { max: mx }] })
  webMI.data.write('AGENT.OBJECTS.RigConstruction.nowMax', mx)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

document.getElementById("db").addEventListener('click', function (e) {
  if (drillVis) {
    GGD_chart.series[2].hide()
    document.getElementById("db").setAttribute('src', '../../GGD_page/button_gray.png')
  } else {
    GGD_chart.series[2].show()
    document.getElementById("db").setAttribute('src', '../../GGD_page/button_yellow.png')
  }
  drillVis = !drillVis
  var mx = Math.floor(GGD_chart.axes[0].max * 10) / 10 - 1
  advance_chart.update({ xAxis: { max: mx } })
  Effect_chart.update({ xAxis: { max: mx } })
  NPV_chart.update({ xAxis: { max: mx } })
  mx = Math.floor(GGD_chart.axes[1].max * 10) / 10
  GGD_chart.update({ yAxis: [{}, { max: mx }] })
  webMI.data.write('AGENT.OBJECTS.RigConstruction.nowMax', mx)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

webMI.gfx.setScaledEvents(document.getElementById('GGD_container'), true)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

webMI.data.subscribe("AGENT.OBJECTS.Depth_day_data.start_date", function (e) {
  var id = "id_4";
  var value = new Date();
  value.setTime(e.value)
  //console.log(value)
  var str = ""
  var buf = value.getDate()
  if (buf < 10) {
    str = str + "0" + buf
  } else {
    str = str + buf
  }
  str = str + "."
  buf = value.getMonth()
  buf++;
  if (buf < 10) {
    str = str + "0" + buf
  } else {
    str = str + buf
  }
  str = str + "."
  buf = value.getFullYear()
  str = str + buf;
  webMI.gfx.setText(id, str);

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Заполнение 

webMI.data.subscribeBlock(["AGENT.OBJECTS.Depth_day_data.end_date", "AGENT.OBJECTS.Depth_day_data.start_date", "AGENT.OBJECTS.Depth_day_data.plan_data", "AGENT.OBJECTS.IVE50.Well.WellDepth", "AGENT.OBJECTS.IVE50.Tool.ToolPosition"], function (e) {
  var id = "id_8";
  var res = e[0].value - e[1].value
  res = Math.floor(res / 8640000) / 10
  var str = res + " дней"
  webMI.gfx.setText(id, str);
  res = Date.now() - e[1].value
  res = Math.floor(res / 8640000) / 10
  str = res + " дней"
  webMI.gfx.setText("id_12", str);
  res = JSON.parse(e[2].value)
  res = res[res.length - 1].vD
  str = res
  webMI.gfx.setText("id_15", str);
  res = Math.floor(e[3].value * 100) / 100
  webMI.gfx.setText("id_19", res);
  res = Math.floor(e[4].value * 100) / 100
  webMI.gfx.setText("id_23", res);
});

///////////////////////////////////////////////////////////////////////////////////////Заполнение ГГД факт (долото/забой)

webMI.data.read(["AGENT.OBJECTS.Depth_day_data.plan_data", "AGENT.OBJECTS.Depth_day_data.end_date", "AGENT.OBJECTS.Depth_day_data.start_date"], function (e) {
  var data_raw = JSON.parse(e[0].value)
  var start_day = e[2].value
  var end_day = e[1].value
  var res = []
  var plan = []
  var fact = []
  res = data_raw.map(function (f) {
    var ts = (f.time - start_day) / 86400000
    return { x: ts, y: f.vD, name: f.time + ";" + f.opr }
  })

  //console.log(res)
  GGD_chart.series[0].update({ data: res })
  plan = res
  webMI.data.call("GetHistoryAvrg", { t1: start_day, t2: Date.now(), address: "g:AGENT.OBJECTS.IVE50.Well.WellDepth" }, function (f) {
    //console.log(f)

    res = f.map(function (t) {
      var ts = (Math.floor(t[0]) - start_day) / 86400000
      return { x: ts, y: Math.floor(t[1]), name: t[0] + ";" }

    })
    GGD_chart.series[1].update({ data: res })
    fact = res
    setAdvance(plan, fact)

    for (var i = 0; i < plan[plan.length - 1].x; i++) {
    }
  })
  webMI.data.call("GetHistoryAvrg", { t1: start_day, t2: Date.now(), address: "g:AGENT.OBJECTS.IVE50.Tool.ToolPosition" }, function (f) {
    //console.log(f)
    res = f.map(function (t) {
      var ts = (Math.floor(t[0]) - start_day) / 86400000
      return { x: ts, y: Math.floor(t[1]), name: t[0] + ";" }

    })
    GGD_chart.series[2].update({ data: res })

    var mx = Math.floor(GGD_chart.axes[0].max * 10) / 10 - 1
    advance_chart.update({ xAxis: { max: mx } })
    Effect_chart.update({ xAxis: { max: mx } })
    NPV_chart.update({ xAxis: { max: mx } })
    mx = Math.floor(GGD_chart.axes[1].max * 10) / 10
    GGD_chart.update({ yAxis: [{}, { max: mx }] })
    webMI.data.write('AGENT.OBJECTS.RigConstruction.nowMax', mx)
    //console.log(GGD_chart.axes)

  })

})

//* /////////////////////////////////////////////////////////////////////////////////////Диаграмма "Ежедневная сводка операций"

var oper_chart = Highcharts.chart(document.getElementById("operations_container"), {
  chart: {
    type: 'xrange',
    width: 400,
    height: 700,
    backgroundColor: '#1f1f1f',
    plotBackgroundColor: '#333333'
  },
  tooltip: {
    formatter: function () {
      var str = ""
      str += this.point.name
      str = str + '<br/>'
      str = str + Math.floor(this.x / 10 * 24) / 10 + 'ч - ' + Math.floor(this.x2 / 10 * 24) / 10 + 'ч'
      return str
    }
  },
  plotOptions: {
    series: {
      turboThreshold: 90000
    }
  },
  title: {
    text: 'ЕЖЕДНЕВНАЯ СВОДКА ОПЕРАЦИЙ',
    style: {
      "fontSize": "1.2em",
      color: 'white'
    },
    margin: 0
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  xAxis: {
    type: 'linear',
    labels: {
      format: '{text}%',
      style: {
        color: 'white',
        fontSize: '9px'
      }
    },
    gridLineWidth: 1,
    tickInterval: 20,
    min: 0,
    max: 100,
    opposite: true
  },
  yAxis: {
    max: 10,
    title: {
      text: ''
    },
    labels: {
      style: {
        color: 'white'
      }
    },
    categories: ['02.07', '03.07', '04.07', '05.07', '06.07', '07.07', '08.07'],
    reversed: true,
    gridLineWidth: 0
  },
  series: [{
    name: 'operData',
    // pointPadding: 0,
    // groupPadding: 0,
    pointWidth: 10,
    borderRadius: 0,
    borderWidth: 0,
    data: [],
    dataLabels: {
      enabled: true
    }
  }]
})
//* ///////////////////////////////////////////////////////////////////////////////////// Круговая диаграмма операций

var pie_chart = Highcharts.chart(document.getElementById('pie_container'), {
  labels: {
    useHTML: Highcharts.hasBidiBug
  },
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    width: 391,
    height: 300,
    backgroundColor: '#000'
  },
  title: {
    text: ''
  },
  tooltip: {
    /*headerFormat:'<b>{point.name}</b>',
        pointFormat: '{point.percentage:.1f}%'*/
    formatter: function () {
      var str = ''
      str = str + '<b>' + this.point.name + '</b><br>'
      str = str + Math.floor(this.point.percentage * 100) / 100 + '%'
      //console.log(this.point)
      return str
    }
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: []
  }]
});

//* /////////////////////////////////////////////////////////////////////////////////////Диаграмма опережение/отставание

var advance_chart = Highcharts.chart(document.getElementById('gotta_go_fast_container'), {
  chart: {
    type: 'column',
    height: 50,
    width: 1078,
    margin: [0, 0, 0, 0],
    backgroundColor: '#333333'
  },
  title: {
    text: 'Отклонение от нормы (часы)',
    style: {
      "display": "none"
    },

  },
  xAxis: {
    categories: [],
    min: 0,
    max: 25,
    labels: {
      enabled: false
    },
    tickInterval: 1,
    gridLineWidth: 1,
    gridLineColor: '#6e6f70'
  },
  yAxis: {
    title: {
      enabled: false
    },
    labels: {
      enabled: false
    },
    tickInterval: 2,
    gridLineColor: '#6e6f70'
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  plotOptions: {
    column: {
      pointPadding: 0,
      borderWidth: 0
    }
  },
  series: [{
    name: 'Advance',
    data: [],
    pointRange: 1.5

  }]
});

///////////////////////////////////////////////////////////////////////////////////////

webMI.gfx.setScaledEvents(document.getElementById('gotta_go_fast_container'), true)

///////////////////////////////////////////////////////////////////ГРАФИК ЭФФЕКТИВНОСТИ

var Effect_chart = Highcharts.chart(document.getElementById('Effecivity_container'), {
  chart: {
    type: 'line',
    height: 50,
    width: 1078,
    margin: [0, 0, 0, 0],
    backgroundColor: '#333333'
  },
  title: {
    style: {
      "display": "none"
    },

  },
  xAxis: {
    categories: [],
    min: 0,
    max: 25,
    tickInterval: 1,
    gridLineWidth: 1,
    gridLineColor: '#6e6f70',
    labels: {
      enabled: false
    }
  },
  yAxis: {
    min: -0.5,
    max: 0.5,
    title: {
      enabled: false
    },
    labels: {
      enabled: false
    },
    tickInterval: 0.5,
    gridLineColor: '#6e6f70'
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  plotOptions: {
    column: {
      pointPadding: 0,
      borderWidth: 0
    }
  },
  series: [{
    name: '',
    data: [

    ],
    zones: [{ value: -0.02, color: '#ff0000' }, { value: 0.02, color: '#0cbce8' }, { color: '#00ff00' }]

  }]
});

//* ///////////////////////////////////////////////////////////////////////////////////// Запрос и формирование данных для ежедневной сводки операций

webMI.data.read(["AGENT.OBJECTS.Depth_day_data.start_date", "AGENT.OBJECTS.Depth_day_data.end_date"], function (e) {
  var update_arr = []
  var start = new Date()
  var end = new Date()
  if (e[1].value > Date.now()) {
    start.setTime(e[0].value)
    end.setTime(e[1].value)
  }
  else {
    start.setTime(e[0].value)
    end.setTime(Date.now())
  }
  var ran = (end - start) / 86400000
  if ((ran % 1) != 0) {
    ran = Math.floor(ran + 1)
  }
  //console.log(ran)
  for (var i = 0; i <= ran; i++) {
    var str = ""
    var ntp = parseInt(e[0].value) + i * 86400000
    var nd = new Date()
    nd.setTime(ntp)
    var buf = nd.getDate()
    if (buf < 10) { buf = "0" + buf }
    str = str + buf + '.'
    buf = nd.getMonth() + 1
    if (buf < 10) { buf = "0" + buf }
    str = str + buf
    update_arr.push(str)
  }
  //console.log("start: "+start,"end: "+end,"now: "+new Date().setTime(Date.now()))
  oper_chart.update({
    yAxis: {
      max: ran,
      categories: update_arr
    }
  })

  webMI.data.call("GetHistoryOperations", { t1: start.getTime(), t2: Date.now(), address: "g:AGENT.OBJECTS.Support.Auto.Operation" }, function (f) {
    console.log('HISTORY_OPERATIONS', f)
    oper_chart.series[0].update({ data: f[0] })
    var oper_raw = f[0].map(function (el) {
      var obj = {
        oper: el.name,
        prod: (el.x2 - el.x),
        color: (el.color)
      }
      if (obj.oper === "Постановка ") { obj.oper = "Постановка" }
      if (obj.oper === "Остановка ") { obj.oper = "Остановка" }
      return obj
    })
    var namesArr = []
    var numbersArr = []
    var colorsArr = []
    var max = 0
    oper_raw.forEach(function (el) {
      var index = namesArr.indexOf(el.oper)
      if (index === -1) {
        namesArr.push(el.oper)
        numbersArr.push(el.prod)
        colorsArr.push(el.color)
        max += el.prod
      }
      else {
        numbersArr[index] += el.prod
        max += el.prod
      }
    })
    var operations = []
    numbersArr.forEach(function (el, cnt) {
      if (namesArr[cnt] != null) {
        var Obj = {
          id: "",
          color: colorsArr[cnt],
          name: namesArr[cnt],
          time: el / max * 100
        }
        operations.push(Obj)
      }
    })
    console.log(operations)
    pie_chart.series[0].update({ data: operations.map(function (el) { return { name: el.name, y: el.time } }), colors: operations.map(function (item) { return item.color }) })
    operations.forEach(function (item) {
      var text_to_push = '<tr><td style="width:259px;margin-right:7px;"><div style="padding-left:40px">'
      text_to_push += '<div style="width:10px;height:10px;background-color:' + item.color + '; display: inline-block; border-radius:50%"></div>'
      text_to_push += '<div style="display: inline-block"><b>' + item.name + '</b></div></div></td><td id="oper_1" style="width:125px; text-align:center;">'
      text_to_push += item.time.toFixed(1) + '</td></tr>'
      console.log(text_to_push)
      document.getElementById('oper_table').insertAdjacentHTML('beforeend', text_to_push)
    })
  })


})

///////////////////////////////////////////////////////////////////////////////////////////ПЕРЕКЛЮЧЕНИЕ ГРАФИК/СПИСОК

var ChartOn = false
document.getElementById('switchPieChart').addEventListener('click', function (e) {
  if (ChartOn) {
    document.getElementById('pie_figure').style.display = 'none'
    document.getElementById('oper_legend').style.display = 'block'
    ChartOn = !ChartOn
  } else {
    document.getElementById('pie_figure').style.display = 'block'
    document.getElementById('oper_legend').style.display = 'none'
    ChartOn = !ChartOn
  }
})

///////////////////////////////////////////////////////////////////////////////////////////ОПРЕЖЕНИЕ/ОТСТАВАНИЕ

function setAdvance(plan, fact) {
  //console.log(plan)
  //console.log(fact)
  var res = []
  for (var i = 0; i < fact[fact.length - 1].x; i++) {
    res.push("")
  }
  fact.forEach(function (e) {
    var cnt = Math.floor(e.x)
    res[cnt] = e
  })
  //console.log(res)

  var adv_chart_data = []
  res.forEach(function (e) {
    var buf = []
    for (var i = 0; i < plan.length; i++) {
      if (plan[i].y > e.y) {
        buf = [plan[i], plan[i - 1]]
        //console.log(buf)
        break;
      }
    }
    //console.log(buf)
    if (buf.length != 0) {
      var elem = ((e.y - buf[1].y) / (buf[0].y - buf[1].y)) * (buf[0].x - buf[1].x) + buf[1].x - e.x
      var res_el = {}
      res_el.y = elem;
      if (elem > 0) { res_el.color = '#00ccff' } else { res_el.color = '#ff0000' }
      adv_chart_data.push(res_el)
    } else {
      if (adv_chart_data.length != 0) {
        var res_el = {}
        if (e.y >= plan[plan.length - 1].y) {
          res_el.y = plan.filter(function (f) { if (f.y == plan[plan.length - 1].y) { return f } })[0].x - e.x
          if (res_el.y > 0) { res_el.color = '#00ccff' } else { res_el.color = '#ff0000' }
        }
        else {
          res_el.y = adv_chart_data[adv_chart_data.length - 1].y - 1
          res_el.color = adv_chart_data[adv_chart_data.length - 1].color
        }


        adv_chart_data.push(res_el)
      } else {
        adv_chart_data.push({ y: -1, color: '#ff0000' })
      }
    }

  })
  //console.log(adv_chart_data)
  advance_chart.series[0].update({ data: adv_chart_data })
  setNPV(adv_chart_data)
  setEffectivity(adv_chart_data)
  var hours = Math.floor(adv_chart_data[adv_chart_data.length - 1].y * 24 * 10) / 10
  if (hours < 0) {
    webMI.gfx.setFill('id_34', '#ff0000')
  } else {
    webMI.gfx.setFill('id_34', '#00ccff')
  }
  webMI.gfx.setText('id_34', hours);
}

////////////////////////////////////////////////////////////////ЭФФЕКТИВНОСТЬ

function setEffectivity(raw_data) {
  //console.log(raw_data)
  var numberOfDays = Math.floor(GGD_chart.axes[0].max * 10) / 10
  //console.log(numberOfDays)
  res = []
  numberOfDays--;
  for (var i = 0; i < raw_data.length; i++) {
    var buf = 0;
    var t0 = numberOfDays * 24
    var dt = 0
    if (i == 0) {
      dt = raw_data[i].y * 24
    }
    else {
      dt = (raw_data[i].y - raw_data[i - 1].y) * 24
    }
    if (Math.abs(dt) > 24) {
      buf = 1.5
    } else {
      buf = t0 / (t0 - ((t0 / 24) * dt))
    }
    if (buf > 1.5) { buf = 1.5 }
    if (buf < 0.5) { buf = 0.5 }
    buf = [i - 0.5, buf - 1]
    res.push(buf)
    buf = [i + 0.5, buf[1]]
    res.push(buf)
    numberOfDays--
  }
  //console.log(res)
  var val = Math.floor((res[res.length - 1][1] + 1) * 100) / 100
  //console.log(val)
  if (val < 1) {
    webMI.gfx.setFill('id_31', '#ff0000')
  }
  else if (val == 1) {
    webMI.gfx.setFill('id_31', '#0cbce8')
  }
  else {
    webMI.gfx.setFill('id_31', '#00ff00')
  }
  webMI.gfx.setText('id_31', val);
  Effect_chart.series[0].update({ data: res })
}

/////////////////////////////////////////////////////////////////////////////кнопка редактировать НПВ

/*document.getElementById('setNPV').addEventListener('click',function(e){
  webMI.display.openDisplay('AGENT.DISPLAYS.NewView.ForGGD.NPV_table',webMI.query,'main_frame');
})*/
webMI.gfx.setScaledEvents(document.getElementById('NPV_container'), true)

/////////////////////////////////////////////////////////////////////////////ГРАФИК НПВ

var NPV_chart = Highcharts.chart(document.getElementById('NPV_container'), {
  chart: {
    type: 'column',
    height: 50,
    width: 1078,
    margin: [0, 0, 0, 0],
    backgroundColor: '#333333'
  },
  title: {
    text: 'Отклонение от нормы (часы)',
    style: {
      "display": "none"
    },

  },
  xAxis: {
    categories: [],
    min: 0,
    max: 25,
    labels: {
      enabled: false
    },
    tickInterval: 1,
    gridLineWidth: 1,
    gridLineColor: '#6e6f70'
  },
  yAxis: {
    min: 0,
    title: {
      enabled: false
    },
    labels: {
      enabled: false
    },
    gridLineWidth: 0,
    //tickInterval:2,
    //gridLineColor:'#6e6f70'
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  tooltip: {
    enabled: true,
    headerFormat: '',
    pointFormat: '{series.name}: <b>{point.y}</b><br/>',
    valueSuffix: 'ч'

  },
  plotOptions: {
    column: {
      pointPadding: 0,
      borderWidth: 0
    }
  },
  series: [{
    name: 'НПВ',
    data: [],
    color: 'red',
    pointRange: 1.5

  }]
});

/////////////////////////////////////////////////////////////////////////////ЗАПОЛНЕНИЕ ГРАФИКА НПВ

/*webMI.data.read('AGENT.OBJECTS.Depth_day_data.NPV',function(e){
  var res=[]
  var NPVsum=0
  var raw = JSON.parse(e.value)
  raw.forEach(function(f){
    res.push({y:parseFloat(f.td2),color:'#f00'})
    NPVsum+=parseFloat(f.td2)
  })
  //console.log(res)
  webMI.gfx.setText('id_39', NPVsum);
  NPV_chart.series[0].update({data:res})
})*/
function setNPV(data) {
  console.log(data)
  var sum = 0;
  res = []
  /*var res=data.map(function(e){
    if(e.y<0){
      sum=sum-(e.y*24)
      return Math.abs(Math.floor(e.y*24*10)/10)		
    }
    else{
      return 0				
    }	
  })*/
  var t = 0;
  data.forEach(function (e) {
    var buf = t - e.y
    if ((buf > 0) && (e.y < 0)) {
      res.push(Math.floor(buf * 24 * 10) / 10)
      sum += Math.floor(buf * 24 * 10) / 10
    }
    else {
      res.push(0)
    }
    t = e.y
  })
  console.log(res, sum)
  webMI.gfx.setText('id_39', Math.floor(sum * 10) / 10);
  NPV_chart.series[0].update({ data: res })
  webMI.data.write("AGENT.OBJECTS.Depth_day_data.NPV", JSON.stringify(res))

}