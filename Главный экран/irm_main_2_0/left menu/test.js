//* FOR = SISTEM.LIBRARY.PROJECT.OBJECTDISPLAYS.IRM_2_0.Left_Menu.menu2 (29-04-22)

webMI.libraryLoader.load([], ["CSS/left_menu.css"], function () {
  var nav = document.getElementById("left_menu_nav");

  var buttonsConfig = [
    {
      src: "url(../../IMG/main_menu.png)",
      id: "button_1",
      name: "Главное меню",
      active: true,
      path: webMI.query["mainDashbord"],
    },
    {
      src: "url(../../IMG/ggd_charts.png)",
      id: "button_2",
      name: "График глубина/день",
      active: true,
      path: webMI.query["ggd"],
    },
    {
      src: "url(../../IMG/trajectory.png)",
      id: "button_3",
      name: "Профиль скважины/осложнения",
      active: true,
      path: webMI.query["complications"],
    },
    {
      src: "url(../../IMG/skpb_charts.png)",
      id: "button_4",
      name: "Графики СКПБ",
      active: true,
      path: webMI.query["skpbCharts"],
    },
    {
      src: "url(../../IMG/hidroshema.png)",
      id: "button_5",
      name: "Гидросхема",
      active: false,
      path: webMI.query["hidroshema"],
    },
    {
      src: "url(../../IMG/rig_shema.png)",
      id: "button_6",
      name: "Схема буровой установки",
      active: false,
      path: webMI.query["rig_shema"],
    },
    {
      src: "url(../../IMG/rig.png)",
      id: "button_7",
      name: "Буровая вышка",
      active: true,
      path: webMI.query["rig"],
    },
    {
      src: "url(../../IMG/mud_node_shema.png)",
      id: "button_8",
      name: "ЦСГО",
      active: false,
      path: webMI.query["mud_node_shema"],
    },
    {
      src: "url(../../IMG/pumps.png)",
      id: "button_9",
      name: "Насосы",
      active: false,
      path: webMI.query["pumps"],
    },
    {
      src: "url(../../IMG/tools.png)",
      id: "button_10",
      name: "Оборудование",
      active: false,
      path: webMI.query["tools"],
    },
    {
      src: "url(../../IMG/reports.png)",
      id: "button_11",
      name: "Отчёты АПД",
      active: true,
      path: webMI.query["reports"],
    },
    {
      src: "url(../../IMG/documents.png)",
      id: "button_12",
      name: "Документы",
      active: false,
      path: webMI.query["documents"],
    },
    {
      src: "url(../../IMG/APD_icon.png)",
      id: "button_13",
      name: "АПД",
      active: true,
      path: webMI.query["APD"],
    },
    {
      src: "url(../../IMG/slide.png)",
      id: "button_14",
      name: "АПД-ВСП",
      active: true,
      path: webMI.query["slide"],
    },
    {
      src: "url(../../IMG/Docs.png)",
      id: "button_15",
      name: "План",
      active: true,
      path: webMI.query["plan"],
    },
    {
      src: "url(../../IMG/service_ico.png)",
      id: "button_16",
      name: "Сервисы",
      active: true,
      path: webMI.query["services"],
    }
    /*{
      src: "url(../../IMG/settings.png)",
      id: "button_16",
      name: "Настройки",
      active: "true",
      path: webMI.query["settings"],
    },*/
  ];
  nav.addEventListener("click", function (e) {
    //console.log("aaaaaaaaaaaaaaaaaa")
    if (e.target.id.includes("button_")) {
      var currentConfig = buttonsConfig.find(function (item, index) {
        return item.id == e.target.id
      })
      if (currentConfig.active) {
        webMI.display.openDisplay(currentConfig.path, {}, "main_frame")
      }
      else {
        return
      }

    }
  });

  function createButton() {
    for (var i = 0; i < buttonsConfig.length; i++) {
      var divButton = parent.document.createElement("div");

      if (buttonsConfig[i].active) {
        divButton.classList.add("left-menu-buttons");
        divButton.style.backgroundImage = buttonsConfig[i].src;
        divButton.id = buttonsConfig[i].id;
        divButton.setAttribute("tooltip", buttonsConfig[i].name);
        //  webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Tooltip", {"id":buttonsConfig[i].id, "text":buttonsConfig[i].name});  
      } else {
        divButton.classList.add("left-menu-buttons-disactivated");
        divButton.classList.add("left-menu-buttons");
        divButton.style.backgroundImage = buttonsConfig[i].src;
        divButton.id = buttonsConfig[i].id;
      }
      nav.appendChild(divButton);
    }
  }
  createButton();
});


