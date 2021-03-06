//* FOR = IRM_2_0.main_2.0

webMI.data.read(['AGENT.OBJECTS.RigConstruction.direction',
  'AGENT.OBJECTS.RigConstruction.conductor',
  'AGENT.OBJECTS.RigConstruction.obsCol',
  'AGENT.OBJECTS.RigConstruction.EcsCol',
  'AGENT.OBJECTS.RigConstruction.tail',
  'AGENT.OBJECTS.IVE50.Well.WellDepth',
  'AGENT.OBJECTS.Depth_day_data.start_date'], function (e) {

    resCol = 0;

    for (var i = 0; i < 5; i++) {

      if (e[i].value < e[5].value & e[i].value != 0) { console.log('nth') }
      else {
        resCol = i;
        break;
      }

    }

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

    var adr = "g:AGENT.OBJECTS.ServiceParams.NNB.cols." + serviceName + ".fact";

    document.getElementById('modal-info-text').innerHTML = '<b>Сейчас бурится:</b></br><br/>' + normalName + '<br/>'
    document.getElementById('modal-info-text').innerHTML += 'Плановый забой:  ' + e[5].value.toFixed(2) + '<br/><br/>'
    webMI.data.call("GetHistorySimple", { t1: e[6].value, t2: Date.now(), address: adr }, function (rawNNB) {

      document.getElementById('modal-info-text').innerHTML += '<b>КНБК</b>: <br/>'
      rawNNB.forEach(function (item) {

        document.getElementById('modal-info-text').innerHTML += JSON.parse(item).rows[0].element + '<br/>'
      })


    })

  })