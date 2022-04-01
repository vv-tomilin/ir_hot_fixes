//* FOR = SYSTEM.LIBRARY.PROJECT.WEBMIMETHODS.GetHistorySimple

//* -----------------------------------------------------------------
//* | Parameter Name |     Type     | Trigger
//* -----------------------------------------------------------------
//* | t1             | http.request | 0
//* -----------------------------------------------------------------
//* | t2             | http.request | 0
//* -----------------------------------------------------------------
//* | address        | http.request | 0
//* -----------------------------------------------------------------

() => { //* =============================================


  var from = t1.postvalues['t1']
  var to = t2.postvalues['t2']
  var adr = address.postvalues['address']

  var res = []
  console.log('<imhere>')
  var raw = call("SYSTEM.LIBRARY.PROJECT.SERVERSCRIPTS.Report.simplifier", { "nodeName": adr, "startT": from, "endT": to })
  console.log(raw)
  res = raw.map(function (e) {
    return e[1]
  })

  return res


} //* =============================================