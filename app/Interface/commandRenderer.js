//
// Command Renderer
//
const { ipcRenderer } = require('electron')

const HandleCommand = (PythonCommandEnvelope) => {
  // Send the command and args to the application core
  return ipcRenderer.sendSync('commandHandler-send', PythonCommandEnvelope)
}

