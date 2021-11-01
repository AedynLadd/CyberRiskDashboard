setTimeout(function() {
    ipcRenderer.send('ready-to-launch', 'ping')
}, 5000);