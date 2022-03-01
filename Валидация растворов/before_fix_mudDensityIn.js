function returnValid() {
  var validVar = new UaNode("AGENT.OBJECTS.IVE50.Mud.Properties.MudDensityIn")
  var validValue = 0

  if (isWits) {
    validValue = mudDensity || 0
  } else {
    validValue = parseFloat(currentDensity.replace(/[^0-9.]/g, ""))
  }

  validVar.assign({ value: validValue })
}

returnValid()