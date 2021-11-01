/**
 *  Copyright (c) 2021
 *
 *  The main process is responsible for responding to application lifecycle event:
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

//
// USER INTERFACE PROCESSES
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

    DashboardWindow.on('closed', () => (DashboardWindow = null));
}


//
// HIDDEN PROCESSES
//

let AnalysisRenderer;
let DataRender;

const createAnalysisRenderer = () => {
    AnalysisRenderer = new BrowserWindow({
        show: false,
        webPreferences: { nodeIntegration: true }
    });

    AnalysisRenderer.loadFile('app/Hidden/Analysis/analysis_renderer.html');
    AnalysisRenderer.on('closed', () => (AnalysisRenderer = null));
}

const createDataRenderer = () => {
    DataRender = new BrowserWindow({
        show: false,
        webPreferences: { nodeIntegration: true }
    });
    DataRender.loadFile('app/Hidden/Data/data_renderer.html');
    DataRender.on('closed', () => (DataRender = null));
}


//
// Inter Process Messages Communication
//

/*
 *  @window - The Window of the renderer process we are sending too
 *  @channel - The name of the channel
 *  @message - Message being sent
 */
function sendToRenderer(window, channel, message) {
    window.webContents.send(channel, message);
}

function getFromRenderer() {
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg) // prints "ping"
        event.reply('asynchronous-reply', 'pong')
    })
}



//
// Application Life Cycle
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





})