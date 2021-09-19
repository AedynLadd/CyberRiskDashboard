const { app, BrowserWindow } = require('electron')
const EventEmitter = require('events')

const loadingEvents = new EventEmitter()
const createWindow = (winWidth, winHeight, isFullscreen) => new BrowserWindow({ width: winWidth, height: winHeight, frame: false, show: false, fullscreen: isFullscreen })

app.on('ready', () => {
    // Start by showing users the loading screen
    const LoadingWindow = createWindow(400, 400, false)
    LoadingWindow.once('ready-to-show', () => { 
        LoadingWindow.show() 
    })

    LoadingWindow.loadFile("app/modules/loading/loading.html")
    
    // Create the main dashboard window, once this is loaded in completely we can show it to the user
    const DashboardWindow = createWindow(0,0, true)
    DashboardWindow.loadFile("app/modules/main-menu/main.html")
    

})
