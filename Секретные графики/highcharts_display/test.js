webMI.libraryLoader.load(["other/lz-string.min.js"], [], function (e) {

  webMI.gfx.setVisible("label", false);
  webMI.gfx.setVisible("border", false);
  var queryParams = webMI.query;
  var skipModules = webMI.query["skipDefaultModules"] == "true" ? true : false;
  var additionalModules = webMI.query["additionalModules"].split(",");

  //Map input of saving method to parameter names
  if (queryParams["gatviseOptions_saveMethod"] == "Multiple nodes") queryParams["gatviseOptions_saveMethod"] = "multiple";
  else if (queryParams["gatviseOptions_saveMethod"] == "File system") queryParams["gatviseOptions_saveMethod"] = "filesystem";
  else queryParams["gatviseOptions_saveMethod"] = "single";
  var initialLoadingConfig = {
    "saveName": webMI.query["gatviseOptions_saveMethod"] == "filesystem" ? webMI.query["gatviseOptions_configFile"] : webMI.query["gatviseOptions_configNode"],
    "saveMethod": webMI.query["gatviseOptions_saveMethod"],
    "saveCompressed": webMI.query["gatviseOptions_saveCompressed"],
  }

  var chartDiv = document.getElementById("highcharts_container");
  var trend;

  var serverTimeOffset = 0;

  var generalProperties = [
    { name: "title_text" },
    { name: "chart_animation", type: "boolean" },
    { name: "atviseOptions_configNode" },
    { name: "atviseOptions_configFile" },
    { name: "atviseOptions_configName" },
    { name: "atviseOptions_saveMethod" },
    { name: "atviseOptions_saveCompressed", type: "boolean" },
    { name: "atviseOptions_mode" },
    { name: "atviseOptions_source" },
    { name: "atviseOptions_enableCursor1", type: "boolean" },
    { name: "atviseOptions_enableCursor2", type: "boolean" },
    { name: "atviseOptions_disableDownSampling", type: "boolean" }
  ];
  var yAxisProperties = [
    { name: "yAxis_id" },
    { name: "yAxis_title_text" },
    { name: "yAxis_visible", type: "boolean" },
    { name: "yAxis_min" },
    { name: "yAxis_max" },
    { name: "yAxis_lineWidth" },
    { name: "yAxis_lineColor" },
    { name: "yAxis_labels_enabled", type: "boolean" },
    { name: "yAxis_labels_align" },
    { name: "yAxis_labels_format" },
    { name: "yAxis_crosshair", type: "switch" },
    { name: "yAxis_crosshair_snap", type: "boolean" },
    { name: "yAxis_crosshair_width" },
    { name: "yAxis_crosshair_color" },
    { name: "yAxis_crosshair_dashStyle" },
    { name: "yAxis_gridLineWidth" },
    { name: "yAxis_gridLineColor" },
    { name: "yAxis_tickInterval" },
    { name: "yAxis_minorGridLineWidth" },
    { name: "yAxis_minorGridLineColor" },
    { name: "yAxis_minorTickInterval" },
    { name: "yAxis_opposite", type: "boolean" }
  ];
  var seriesProperties = [
    { name: "series_address" },
    { name: "series_name" },
    { name: "series_dataArchive" },
    { name: "series_dataArchive2" },
    { name: "series_type" },
    { name: "series_step", type: "boolean" },
    { name: "series_lineWidth" },
    { name: "series_color" },
    { name: "series_dashStyle" },
    { name: "series_visible", type: "boolean" },
    { name: "series_yAxis" },
    { name: "series_marker_enabled", type: "boolean" },
    { name: "series_nonStop", type: "boolean" },
    { name: "series_aggregate_aggregate" },
    { name: "series_aggregate_interval" },
    { name: "series_aggregate_unit" }
  ];

  var xAxisProperties = [
    { name: "xAxis_title_text" },
    { name: "xAxis_timeSpan" },
    { name: "xAxis_timeSpanUnit" },
    { name: "xAxis_tickInterval" },
    { name: "xAxis_lineWidth" },
    { name: "xAxis_lineColor" },
    { name: "xAxis_labels_enabled", type: "boolean" },
    { name: "xAxis_labels_align" },
    { name: "xAxis_crosshair", type: "switch" },
    { name: "xAxis_crosshair_snap", type: "boolean" },
    { name: "xAxis_crosshair_width" },
    { name: "xAxis_crosshair_color" },
    { name: "xAxis_crosshair_dashStyle" },
    { name: "xAxis_type" },
    { name: "xAxis_dateTimeLabelFormats_format" },
    { name: "xAxis_gridLineWidth" },
    { name: "xAxis_gridLineColor" },
    { name: "xAxis_minorGridLineWidth" },
    { name: "xAxis_minorGridLineColor" },
    { name: "xAxis_minorTickInterval" },
    { name: "xAxis_opposite", type: "boolean" }
  ];

  // Is a series configured and a y-axis attached?
  var activeYAxis = [];
  for (s = 1; s <= 10; s++) {
    if (queryParams["series" + s + "series_address"] && queryParams["series" + s + "series_yAxis"]) {
      var yAxisId = queryParams["series" + s + "series_yAxis"];
      var allAxisIds = [queryParams["yAxis1yAxis_id"], queryParams["yAxis2yAxis_id"], queryParams["yAxis3yAxis_id"], queryParams["yAxis4yAxis_id"]];
      if (allAxisIds.indexOf(yAxisId) != -1 && yAxisId != "" && yAxisId != undefined) {
        activeYAxis.push(allAxisIds.indexOf(yAxisId));
      } else if (yAxisId >= 0 && yAxisId <= 3) {
        activeYAxis.push(parseInt(yAxisId));
      } else {
        console.warn("Invalid yAxis id (" + yAxisId + ")");
      }
    }
  }

  var timeRangeUnits = [
    { text: "second(s)", value: "1" },
    { text: "minute(s)", value: "60" },
    { text: "hour(s)", value: "3600" },
    { text: "day(s)", value: "86400" },
    { text: "week(s)", value: "604800" },
    { text: "month(s)", value: "2592000" },
  ];

  /* Convert unit text to unit value */
  var type = 0;
  while (webMI.query["xAxisxAxis_timeSpanUnit"] != timeRangeUnits[type].text)
    type++;
  webMI.query["xAxisxAxis_timeSpanUnit"] = timeRangeUnits[type].value;

  var Configvar_Without_ID_Allowed_On_Parameter = [];
  activeYAxis.forEach(function (item) {
    Configvar_Without_ID_Allowed_On_Parameter["yAxis" + (item + 1) + "yAxis_id"] = "yAxis" + (item + 1) + "yAxis_crosshair";
  });

  /* Translate AxisOpposite left = false, others = true */
  /* and return highchart compatible boolan (=string)   */
  var nAxisTranslate = [
    { name: "xAxisxAxis_opposite" },
    { name: "yAxis1yAxis_opposite" },
    { name: "yAxis2yAxis_opposite" },
    { name: "yAxis3yAxis_opposite" },
    { name: "yAxis4yAxis_opposite" }
  ];
  for (nAxis in nAxisTranslate) {
    webMI.query[nAxisTranslate[nAxis].name] = isAxisOpposite(webMI.query[nAxisTranslate[nAxis].name]);

    function isAxisOpposite(axis) {
      if (axis == "right" || axis == "top") {
        return "true";
      }
      return "false";
    }
  }

  /** check export rights **/
  var right = (webMI.query["export_right"] == undefined) ? "" : webMI.query["export_right"];
  if (right.search(/SYSTEM\.SECURITY\.RIGHTS\./) != -1) {
    right = right.substring(23, right.length); //remove "prefix" SYSTEM.SECURITY.RIGHTS.
  }

  var hasRight = false;
  if (right != "") {
    webMI.addEvent(webMI.data, "clientvariableschange", function (e) {
      hasRight = false;
      if (("username" in e) && (e.username != "")) {
        hasRight = webMI.hasRight(right);
      }

      if (typeof trend != "undefined") {
        if (trendInstance.chart.userOptions.exporting.enabled == true) {
          trendInstance.chart.update({ "exporting": { "enabled": true } });
        } else {
          trendInstance.chart.update({ "exporting": { "enabled": false } });
        }
      }
    });
  }

  webMI.addEvent(webMI.data, "servertimeoffsetchanged", function (offset) {
    serverTimeOffset = offset;
  });

  webMI.addOnload(function () {
    webMI.data.loadScript("highcharts/helpers/confighandler.js", function () {
      var configurator = new webMI.rootWindow.ConfigHandler();
      //no highcharts setting found for: configurationId, enableCursor1, enableCursor2, showTooltip, showExportMenu, useLocalTime, disableDownSampling
      var trendConfig = createConfig(configurator, "g", generalProperties, 1);

      //no highcharts setting found for position
      var yAxisConfig = createConfig(configurator, "yAxis", yAxisProperties, 4, "id");
      if (yAxisConfig.yAxis && yAxisConfig.yAxis.length > 0) {
        Object.assign(trendConfig, yAxisConfig);
      }

      prepareSeries(10);
      var seriesConfig = createConfig(configurator, "series", seriesProperties, 10, "address");
      if (seriesConfig.series && seriesConfig.series.length > 0) {
        Object.assign(trendConfig, seriesConfig);
      }

      //no highcharts setting found for: xaxisPosition
      var xAxisConfig = createConfig(configurator, "xAxis", xAxisProperties, 1);
      Object.assign(trendConfig, xAxisConfig);

      if (initialLoadingConfig.saveName == "" || trendConfig.atviseOptions.configName == "") {
        createTrend(trendConfig);
      } else {
        configurator.loadConfig(initialLoadingConfig.saveName, initialLoadingConfig.saveMethod, trendConfig.atviseOptions.configName, function (chartConfig) {
          chartConfig = typeof chartConfig == 'undefined' ? {} : chartConfig;
          for (var item in trendConfig) {
            if (!(item in chartConfig)) {
              chartConfig[item] = trendConfig[item];
            }
          }

          // use builder settings for configNode and configName
          chartConfig.atviseOptions.configNode = trendConfig.atviseOptions.configNode;
          // chartConfig.atviseOptions.configName = trendConfig.atviseOptions.configName; [Issue-ID: 10259]

          //check marker for wrong initialization (old cfg / wrong setup)
          for (seriesNumber in chartConfig.series) {
            if (typeof chartConfig.series[seriesNumber].marker.enabled === 'undefined' || chartConfig.series[seriesNumber].marker.enabled === null) {
              chartConfig.series[seriesNumber].marker.enabled = false;
            }
          }

          createTrend(chartConfig);
        });
      }
    });
  });

  function combineTimeSpanWithUnit(options) {
    if (typeof options.trendConfig.xAxis[0] != "undefined") {
      /* case of old config - ignore timeSpanUnit */
      var timeRange = options.trendConfig.xAxis[0].timeSpan;
    } else {
      var timeRange = webMI.query["xAxisxAxis_timeSpan"] * webMI.query["xAxisxAxis_timeSpanUnit"];
    }

    if (typeof options.trendConfig.xAxis[0] != "undefined" && typeof options.trendConfig.xAxis[0].timeSpanUnit != "undefined") {
      timeRange = options.trendConfig.xAxis[0].timeSpan * options.trendConfig.xAxis[0].timeSpanUnit;
    }
    return timeRange;
  }

  function createTrend(trendConfig) {
    var options = {
      trendName: webMI.query.trendName,
      trendGroup: webMI.query.trendGroup,
      trendConfig: trendConfig
    };

    options["skipDefaultModules"] = skipModules;
    if (additionalModules != "")
      options["additionalModules"] = additionalModules;

    if (trendConfig.atviseOptions.mode == "history") {
      var to = (new Date()).valueOf() + serverTimeOffset;
      var from = to - combineTimeSpanWithUnit(options) * 1000;

      trendConfig.xAxis.min = from;
      trendConfig.xAxis.max = to;
    }

    webMI.trendFactory.createTrend(chartDiv, options,
      function (trendInstance) {
        trend = trendInstance;

        if (trendConfig.atviseOptions.mode !== 'history') {
          trendInstance.control.startLiveMode();
        } else {
          trendInstance.control.loadHistory();
        }

        var oldIsLegendEnabled = false;
        if (trendInstance.chart.legend != undefined && trendInstance.chart.legend.options != undefined && trendInstance.chart.legend.options.enabled == true) oldIsLegendEnabled = true;

        trendInstance.chart.update({
          "exporting": {
            "enabled": true,
            "menuItemDefinitions": {
              "printChart": {
                "onclick": function () {
                  trendInstance.chart.update({ "legend": { "enabled": true } });
                  trendInstance.control.setExportOptions(trendInstance.chart.options);
                  this.print();
                  trendInstance.control.unsetExportOptions(trendInstance.chart.options);
                  trendInstance.chart.update({ "legend": { "enabled": oldIsLegendEnabled } });
                }
              }
            }
          }
        });
        trendInstance.chart.update({
          "exporting": {
            "enabled": true,
            "menuItemDefinitions": {
              "downloadPNG": {
                "onclick": function () {
                  trendInstance.chart.update({ "legend": { "enabled": true } });
                  trendInstance.control.setExportOptions(trendInstance.chart.options);
                  this.exportChartLocal();
                  trendInstance.control.unsetExportOptions(trendInstance.chart.options);
                  trendInstance.chart.update({ "legend": { "enabled": oldIsLegendEnabled } });
                }
              }
            }
          }
        });
        trendInstance.chart.update({
          "exporting": {
            "enabled": true,
            "menuItemDefinitions": {
              "downloadJPEG": {
                "onclick": function () {
                  trendInstance.chart.update({ "legend": { "enabled": true } });
                  trendInstance.control.setExportOptions(trendInstance.chart.options);
                  this.exportChartLocal({ type: "image/jpeg" });
                  trendInstance.control.unsetExportOptions(trendInstance.chart.options);
                  trendInstance.chart.update({ "legend": { "enabled": oldIsLegendEnabled } });
                }
              }
            }
          }
        });
        trendInstance.chart.update({
          "exporting": {
            "enabled": true,
            "menuItemDefinitions": {
              "downloadPDF": {
                "onclick": function () {
                  trendInstance.chart.update({ "legend": { "enabled": true } });
                  trendInstance.control.setExportOptions(trendInstance.chart.options);
                  this.exportChartLocal({ type: "application/pdf" });
                  trendInstance.control.unsetExportOptions(trendInstance.chart.options);
                  trendInstance.chart.update({ "legend": { "enabled": oldIsLegendEnabled } });
                }
              }
            }
          }
        });
        trendInstance.chart.update({
          "exporting": {
            "enabled": true,
            "menuItemDefinitions": {
              "downloadSVG": {
                "onclick": function () {
                  trendInstance.chart.update({ "legend": { "enabled": true } });
                  trendInstance.control.setExportOptions(trendInstance.chart.options);
                  this.exportChartLocal({ type: "image/svg+xml" });
                  trendInstance.control.unsetExportOptions(trendInstance.chart.options);
                  trendInstance.chart.update({ "legend": { "enabled": oldIsLegendEnabled } });
                }
              }
            }
          }
        });

        if (!trendInstance.chart.options.exporting.buttons.contextButton.menuItems.includes("downloadXLSX")) trendInstance.chart.options.exporting.buttons.contextButton.menuItems.push("downloadXLSX");

        /** check rights on export **/
        function check_builderExportMenu(permission) {
          if (permission && webMI.query['gshowExportMenu'] == "true") {
            trendInstance.chart.update({ "exporting": { "enabled": true } });
          } else {
            trendInstance.chart.update({ "exporting": { "enabled": false } });
          }
        }

        function check_configExportMenu(permission) {
          if (permission && trendInstance.chart.userOptions.exporting.enabled == true) {
            trendInstance.chart.update({ "exporting": { "enabled": true } });
          } else {
            trendInstance.chart.update({ "exporting": { "enabled": false } });
          }
        }

        if (typeof trendInstance.chart.userOptions.exporting != "undefined") {
          check_configExportMenu(right != "" ? hasRight : true);
        } else {
          check_builderExportMenu(right != "" ? hasRight : true);
        }

        if (trend.chart.options.exporting) {
          var items = trend.chart.options.exporting.buttons.contextButton.menuItems;
          var index = items.indexOf("viewData");
          if (index > -1)
            items.splice(index, 1);
          index = items.indexOf("openInCloud");
          if (index > -1)
            items.splice(index, 1);
          index = items.indexOf("viewFullscreen");
          if (index > -1)
            items.splice(index, 1);
        }
      }
    );
  }

  function createConfig(configurator, type, properties, nrObjects, identifier) {
    var confObj = {};

    if (!identifier)
      nrObjects = 1;

    var keysToIgnore = getKeysToIgnore(type, properties, nrObjects);

    for (var i = 1; i <= nrObjects; i++) {

      var CrossQuery = false;
      if (typeof Configvar_Without_ID_Allowed_On_Parameter[type + i + type + "_" + identifier] !== "undefined") {
        CrossQuery = queryParams[Configvar_Without_ID_Allowed_On_Parameter[type + i + type + "_" + identifier]];
      }

      if (!identifier || queryParams[type + i + type + "_" + identifier] || CrossQuery !== false) {
        var arrayIdx;
        if (identifier) {
          arrayIdx = i - 1;
        }

        for (var j = 0; j < properties.length; ++j) {
          var key = properties[j].name;
          var prefix = nrObjects > 1 ? type + i : type;
          var keyOK = isKeyOK(prefix + key, keysToIgnore);

          if (keyOK) {
            var val = nrObjects > 1 ? queryParams[type + i + properties[j].name] : queryParams[type + properties[j].name];
            if (properties[j].type && (properties[j].type == "boolean" || properties[j].type == "switch")) {
              val = val.toLowerCase() == "true";
            } else {
              if (val != "" && !isNaN(val)) {
                val = parseInt(val);
              }
            }


            if (keysToIgnore.indexOf(key) == -1) {
              var confSubObj = configurator.createConfigObject(key, val);
              configurator.merger(confObj, confSubObj, arrayIdx);
            }
          }
        }
      }
    }

    return confObj;
  }

  function getKeysToIgnore(type, properties, nrObjects) {
    var keysToIgnore = [];
    for (var i = 0; i < properties.length; ++i) {
      if (properties[i].type == "switch") {
        for (var j = 1; j <= nrObjects; ++j) {
          var queryParamKey = nrObjects > 1 ? type + j + properties[i].name : type + properties[i].name;
          var queryParamValue = queryParams[queryParamKey];
          queryParamValue = queryParamValue.toLowerCase() == "true";
          if (!queryParamValue) {
            keysToIgnore.push(queryParamKey);
          }
        }
      }
    }
    return keysToIgnore;
  }

  function isKeyOK(key, keysToIgnore) {
    for (var i = 0; i < keysToIgnore.length; ++i) {
      var ignoreKey = keysToIgnore[i];
      if (key != ignoreKey && key.indexOf(ignoreKey) == 0) {
        return false;
      }
    }
    return true;
  }

  function prepareSeries(nrObjects) {
    for (var i = 1; i <= nrObjects; i++) {
      var interpolation = queryParams["series" + i + "series_interpolation"].toLowerCase();
      queryParams["series" + i + "series_type"] = interpolation;
      queryParams["series" + i + "series_step"] = "false";

      if (interpolation == "step") {
        queryParams["series" + i + "series_type"] = "line";
        queryParams["series" + i + "series_step"] = "true";
      }
    }
  }

});