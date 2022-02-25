var strokeNormal = "none";
var strokePressed = webMI.query["strokePressed"];
var focusStrokeColor = webMI.query["focusStrokeColor"];
var fillColor = webMI.query["fillColor"];
var fillColorInactive = webMI.query["fillColorInactive"];
var display = webMI.query["display"];
var name = webMI.query.name;
var _value = 0;

webMI.trigger.connect("clicked", function (e) {
  webMI.display.openWindow({
    display: "SYSTEM.LIBRARY.PROJECT.OBJECTDISPLAYS.FlatComponents.Datepicker",
    extern: false,
    height: 326.5,
    menubar: false,
    modal: true,
    movable: false,
    resizable: false,
    scrollbars: false,
    status: false,
    title: '',
    toolbar: false,
    width: 500,
    query: {
      value: _value,
      popupId: name
    }
  });
});

var tabHandler = webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Tab Handler");
var tabIndex = (webMI.query["tabIndex"] == undefined) ? "" : webMI.query["tabIndex"];
var tooltip = (webMI.query["tooltip"] == undefined) ? "" : webMI.query["tooltip"];

var right = (webMI.query["right"] == undefined) ? "" : webMI.query["right"];
if (right.search(/SYSTEM\.SECURITY\.RIGHTS\./) != -1) {
  right = right.substring(23, right.length); //remove "prefix" SYSTEM.SECURITY.RIGHTS.
}

var active = false;
var hasRight = false;

if (right != "") {
  webMI.addEvent(webMI.data, "clientvariableschange", function (e) {
    hasRight = false;
    if (("username" in e) && (e.username != "")) {
      hasRight = webMI.hasRight(right);
    }
    deActivate();
  });
}

var activeValue = (webMI.query["activeValue"] == undefined) ? "" : webMI.query["activeValue"];
var activeNode = (webMI.query["activeNode"] == undefined) ? "" : webMI.query["activeNode"];
var nodeIsActive = false;

if ((activeNode != "") && (String(activeValue) != "")) {
  webMI.data.subscribe(activeNode, function (e) {
    var nodeActiveValue = e.value;
    if (typeof nodeActiveValue == "boolean") {
      nodeIsActive = (String(nodeActiveValue) == activeValue);
    } else if (typeof nodeActiveValue == "number") {
      try {
        var temp = parseFloat(activeValue);
        nodeIsActive = (nodeActiveValue == temp);
      } catch (e) {
        nodeIsActive = false;
      }
    } else {
      nodeIsActive = (nodeActiveValue == activeValue);
    }
    deActivate();
  });
} else {
  deActivate();
}

function deActivate(forceDeActivate) {
  if (typeof forceDeActivate !== "undefined" && forceDeActivate) {
    active = false;
  } else if (right != "") {
    if ((String(activeValue) != "") && (activeNode != "")) {
      active = (nodeIsActive && hasRight);
    } else {
      active = hasRight;
    }
  } else {
    if ((String(activeValue) != "") && (activeNode != "")) {
      active = nodeIsActive;
    } else {
      active = true;
    }
  }
  if (active) {
    webMI.gfx.setFill("id_2", fillColor);
  } else {
    webMI.gfx.setFill("id_2", fillColorInactive);
  }
}

function release() {
  if (active) {
    webMI.gfx.setFill("button_stroke", "none");
    webMI.gfx.setStroke("button_stroke", strokeNormal);
  }
}

function focusTH() {
  if (active) {
    webMI.gfx.setStroke("button_stroke", focusStrokeColor);
  }
}

function applyTH() {
  if (active) {
    webMI.trigger.fire("clicked", true, "");
  }
}

function backTH() { }

function arrowTH(dir) { }

function keyHandler(keyTH, param2) {
  if (keyTH == "focus") {
    focusTH();
  } else if (keyTH == "blur") {
    release();
  } else if (keyTH == "apply") {
    applyTH();
  } else if (keyTH == "releaseClick") {

  } else if (keyTH == "back") {
    backTH();
  } else if (keyTH == "arrow") {
    arrowTH(param2);
  } else if (keyTH == "isActive") {
    return active && param2(document.getElementById("button_clickarea").parentNode);
  }
}

function updateDisplay(write) {
  var date = new Date(_value);
  dateString = date.toLocaleDateString();

  webMI.gfx.setText('button_label', dateString);
  webMI.trigger.fire("valuechanged", _value, "");

  if (write && webMI.query.base && webMI.query.base != '') {console.log("xxx: " + webMI.query.base + " " + _value); webMI.data.write([webMI.query.base], [_value])};
}

webMI.addEvent("button_clickarea", ["mousedown", "touchstart"], function (e) {
  var id = "button_clickarea";
  var value = true;
  return function (value) {
    if (active) {
      webMI.gfx.setFill("button_stroke", "none");
      webMI.gfx.setStroke("button_stroke", strokePressed);
    }
  }(value);
});

webMI.addEvent("button_clickarea", ["mouseup", "touchend", "touchcancel"], function (e) {
  var id = "button_clickarea";
  var value = true;
  return function (value) {
    release();
  }(value);
});

webMI.addEvent("button_clickarea", ["mouseout", "touchleave"], function (e) {
  var id = "button_clickarea";
  var value = true;
  return function (value) {
    release();
  }(value);
});

webMI.addEvent("button_clickarea", ['touchend', 'click'], function (e) {
  if (active) {
    tabHandler.setCurrentIndex(keyHandler, function () {
      webMI.trigger.fire("clicked", true, "")
    });
  }
});

webMI.addEvent("button_clickarea", ["touchend"], function (e) {
  var pX = event.pageX,
    pY = event.pageY;
  e.preventDefault();
});

webMI.addEvent("button_clickarea", ["touchleave"], function () {
  alert('leaving');
})

webMI.addEvent("button_clickarea", "dragstart", function (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
});
webMI.addOnload(function () {
  var doc = document.getElementById("button_clickarea").ownerDocument;
  tabHandler.register(tabIndex, keyHandler, doc);
  if (!webMI.query.base || webMI.query.base == '') updateDisplay();
  else {
    webMI.data.read(webMI.query.base, function (e) {
      _value = e.value;
      updateDisplay();
    });
    webMI.data.subscribe(webMI.query.base, function (e) {
      _value = e.value;
      updateDisplay();
    });
  }
});

webMI.trigger.connect("com.atvise.setActive", function (e) {
  if (e.value) {
    deActivate();
  } else {
    deActivate(true);
  }
});

if (tooltip != "") {
  webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Tooltip", {
    "auto": "true",
    "id": "button_clickarea",
    "text": tooltip
  });
}

webMI.trigger.connect('com.atvise.datepicker_' + name, function (e) {
  _value = e.value;
  updateDisplay(true);
});

webMI.callExtension("SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.ResetScaling", {
  callback: function (originalSize, renderedSize, scale, scaleInverse) {
    webMI.gfx.setScaleX('button_label', scaleInverse.x);

    webMI.gfx.setScaleX('button_id_2', scaleInverse.x);
    webMI.gfx.setWidth('button_id_2', renderedSize.width);
    webMI.gfx.setMoveX('button_id_2', -(renderedSize.width - originalSize.width) / 2);

    webMI.gfx.setScaleX('button_stroke', scaleInverse.x);
    webMI.gfx.setWidth('button_stroke', (originalSize.width * scale.x) - 1);
    webMI.gfx.setMoveX('button_stroke', -(renderedSize.width - originalSize.width) / 2);
  },
  originalWidth: 100,
  originalHeight: 31,
  innerNode: document.getElementById('button_clickarea')
});

var _active = true;

function setActive(value) {
  webMI.trigger.fire('com.atvise.setActive', value || _active, 'button');
}

webMI.trigger.connect('com.atvise.setActive', function (e) {
  setActive(_active = e.value);
});

webMI.gfx.setStroke('button_stroke', 'none');

function adjustButtonLabelPosition() {
  var button_label = document.getElementById("button_label");
  var fontsize = Number(button_label.getAttribute("font-size"));
  var yPosition = button_label.getAttribute("y");

  if (fontsize !== 16) {
    var adjustment = ((16 / 2) - (fontsize / 2)) * 0.857; // The assumed ratio between font size and line height is 12/14 == 0.875...
    button_label.setAttribute("y", (yPosition - adjustment));
  }
}

adjustButtonLabelPosition();