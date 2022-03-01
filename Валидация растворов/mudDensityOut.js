function returnValid() {
  try {
    console.log('Validation MudDensityOut');
    var validVar = new UaNode("AGENT.OBJECTS.IVE50.Mud.Properties.MudDensityOut")
    var validValue = 0

    if (isWits) {
      validValue = mudDensity || 0
    } else {
      validValue = parseFloat(currentDensity.replace(/[,-]/g, ".").replace(/[^0-9.]/g, ""));
    }
    console.log('Validation MudDensityOut = ', validValue, isWits);
    validVar.assign({ value: validValue });
  }
  catch (error) {
    console.log("Validate densityOUT:", error.message || error)
  }
}

returnValid()