webMI.data.read(['AGENT.OBJECTS.RigConstruction.direction',
  'AGENT.OBJECTS.RigConstruction.conductor',
  'AGENT.OBJECTS.RigConstruction.obsCol',
  'AGENT.OBJECTS.RigConstruction.EcsCol',
  'AGENT.OBJECTS.RigConstruction.tail',
  'AGENT.OBJECTS.IVE50.Well.WellDepth',
  'AGENT.OBJECTS.Depth_day_data.start_date'], function (e) {
    console.log(e)
    resCol = 0
    for (var i = 0; i < 5; i++) {
      console.log(e[i])
      console.log(e[5])
      if (e[i].value < e[5].value & e[i].value != 0) { console.log('nth') }
      else {
        resCol = i;
        break;
      }
    }
    console.log('<colnum>' + resCol)
    serviceName = ''
    normalName = ''
    switch (resCol) {
      case 0:
        normalName = 'Направление'
        serviceName = 'Direct'
        break;
      case 1:
        normalName = 'Кондуктор'
        serviceName = 'Kond'
        break;
      case 2:
        normalName = 'Пилотный ствол'
        serviceName = 'TechCol'
        break;
      case 3:
        normalName = 'Эксплуатационная колонна'
        serviceName = 'ExCol'
        break;
      case 4:
        normalName = 'Хвостовик'
        serviceName = 'Tail'
        break;
    }
    document.getElementById('modal-info-text').innerHTML = '<b>Сейчас бурится:</b></br><br/>' + normalName + '<br/>'
    document.getElementById('modal-info-text').innerHTML += 'Плановый забой:  ' + e[5].value + '<br/><br/>'
    webMI.data.call("GetHistorySimple", { t1: e[6].value, t2: Date.now(), address: "g:AGENT.OBJECTS.ServiceParams.NNB.cols.TechCol.fact" }, function (rawNNB) {
      document.getElementById('modal-info-text').innerHTML += '<b>КНБК</b>: <br/>'
      rawNNB.forEach(function (item) {
        console.log(JSON.parse(item))
        document.getElementById('modal-info-text').innerHTML += JSON.parse(item).rows[0].element + '<br/>'
      })


    })

  })