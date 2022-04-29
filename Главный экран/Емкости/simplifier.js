//* FOR = SYSTEM.LIBRARY.PROJECT.SERVERSCRIPTS.Report.simplifier

//* -----------------------------------------------------------------
//* | Parameter Name |     Type     | Trigger
//* -----------------------------------------------------------------
//* | nodeName       | string | 0
//* -----------------------------------------------------------------
//* | startT         | string | 0
//* -----------------------------------------------------------------
//* | endT           | string | 0
//* -----------------------------------------------------------------

() => { //* ===================================


  var filter = {};

  filter.type = ["v:1"];

  filter.timestamp = ["n:>=" + startT + "<" + endT];

  filter.address = [nodeName];

  var NodeData = history.query(filter);

  NodeData = NodeData.result;

  var result = NodeData.map(function (e) {
    var elem = []

    elem.push(e.servertimestamp);
    elem.push(e.value);

    return (elem);
  })

  return result


} //* ===================================