/**
 *  Copyright (c) 2021
 * 
 *   .d88b  Yb  dP  888b.  8888  888b.    888b.  888  .d88b.  8  dP    888b.     db     .d88b.  8   8  888b.  .d88b.     db     888b.  888b. 
 *   8P      YbdP   8wwwP  8www  8  .8    8  .8   8   YPwww.  8wdP     8   8    dPYb    YPwww.  8www8  8wwwP  8P  Y8    dPYb    8  .8  8   8 
 *   8b       YP    8   b  8     8wwK'    8wwK'   8       d8  88Yb     8   8   dPwwYb       d8  8   8  8   b  8b  d8   dPwwYb   8wwK'  8   8 
 *   `Y88P    88    888P'  8888  8  Yb    8  Yb  888  `Y88P'  8  Yb    888P'  dP    Yb  `Y88P'  8   8  888P'  `Y88P'  dP    Yb  8  Yb  888P'
 *  
 * The main process is responsible for responding to application lifecycle event:
 *         - Starting Up
 *         - Quitting
 *         - Preparing to Quit
 *         - Going to the background
 *         - Coming to the foreground
 *         - Creating and Destroying renderers
 *  The main process is also responsible for handling communication with native
 *  Operating System APIs, for example, displaying a dialogue box to open or save
 *  a file.
 *
 *  @summary Responds to application lifecycle events 
 *  @author Aedyn Ladd <aedynladd@cmail.carleton.ca>
 *
 *  Created at     : 2017-11-03 02:21:56 
 *  Last modified  : 2018-02-25 15:31:40
 */


const { app, BrowserWindow, ipcMain, webContents } = require('electron')
const fs = require('fs')

// 1. ELECTRON PROCESSES
//
// 1.A USER INTERFACE
//
let LoadingScreen;
let RiskAnalysisQuestionnaire;
let DashboardWindow;

const createLoadingScreen = () => {
    LoadingScreen = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        show: true,
        alwaysOnTop: true,
        resizable: false
    });

    LoadingScreen.loadFile('app/Interface/LoadingMenu/loading.html');
    LoadingScreen.on('closed', () => (LoadingScreen = null));
}

const createRAQ = () => {
    RiskAnalysisQuestionnaire = new BrowserWindow({
        width: 400,
        height: 600,
        frame: false,
        show: true,
        alwaysOnTop: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    RiskAnalysisQuestionnaire.loadFile('app/Interface/RiskAnalysisQuestionnaire/RAQ.html');
    RiskAnalysisQuestionnaire.on('closed', () => {
        RiskAnalysisQuestionnaire = null
        createDashboardWindow()
    });
}

const createDashboardWindow = () => {
    DashboardWindow = new BrowserWindow({
        width: 400,
        height: 400,
        frame: false,
        show: false,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    DashboardWindow.loadFile('app/Interface/MainApplication/main.html');

    // create a 'loading'-Window to wait for the application to load
    createLoadingScreen();

    // Once the dashboard window sends the ready-to-launch we can show it, otherwise we'll hold off... 
    ipcMain.once("ready-to-launch", (event, arg) => {
        // If the application is ready to launch we can swap the loading screen with the dashboard screen.
        LoadingScreen.close()
        DashboardWindow.show()

    })

    DashboardWindow.on('closed', () => {
        AnalysisRenderer = null
        AnalysisRenderer.close()
        DataRender = null
        DataRender.close()
        DashboardWindow = null
    });
}


//
// 1.B HIDDEN PROCESSES
//

let AnalysisRenderer;
let DataRender;

const createAnalysisRenderer = () => {
    AnalysisRenderer = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    AnalysisRenderer.loadFile('app/Hidden/Analysis/analysis_renderer.html');
}

const createDataRenderer = () => {
    DataRender = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    DataRender.loadFile('app/Hidden/Data/data_renderer.html');
}


//
// 2. INTER PROCESS COMMUNICATIONS
// 2.A ANALYSIS ENDPOINT
ipcMain.on("dashboard-analysis", (event, arg) => AnalysisRenderer.webContents.send("dashboard", arg));
ipcMain.on("data-analysis", (event, arg) => AnalysisRenderer.webContents.send("data", arg));

// 2.B DATA ENDPOINT
ipcMain.on("dashboard-data", (event, arg) => DataRender.webContents.send("dashboard", arg));
ipcMain.on("analysis-data", (event, arg) => DataRender.webContents.send("analysis", arg));

// 2.C DASHBOARD ENDPOINT
ipcMain.on("data-dashboard", (event, arg) => DashboardWindow.webContents.send("data", arg));
ipcMain.on("analysis-dashboard", (event, arg) => DashboardWindow.webContents.send("analysis", arg));


//
// 3. APPLICATION LIFE CYCLE EVENTS
//
app.on('ready', () => {
    // Create a 'main'-Window
    createAnalysisRenderer();
    createDataRenderer();

    // Check to see if the Risk Analysis Config file exists or not
    if (fs.existsSync('./app/Hidden/Data/data_config.json')) {
        // If the file exists we carry on with our launch as usual
        console.log("file exists");
        // Create a 'main'-Window
        createDashboardWindow();
    } else {
        // If the file does NOT exist - we launch our RAQ window
        console.log("file does not exist");
        // Do not create the 'main'-window
        createRAQ();
    }

    // Configure Listeners here if events are directly requesting something of the main process
    ipcMain.on('core-action', (event, arg) => {
        console.log(arg) // prints "ping"
    })
})