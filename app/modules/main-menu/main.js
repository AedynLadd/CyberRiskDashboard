const { app, BrowserWindow } = require('electron')

function createWindow() {
    window = new BrowserWindow({
        width: 800, height: 600,
        frame: false,
    })
    window.loadFile('app/modules/main-menu/index.html')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})