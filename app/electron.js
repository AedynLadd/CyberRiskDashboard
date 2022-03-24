/**
 *  Copyright (c) 2021
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


const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

// 1. ELECTRON PROCESSES
//
// 1.A USER INTERFACE
//
let LoadingScreen;
let DashboardWindow;

function createLoadingScreen() {
    LoadingScreen = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        show: true,
        alwaysOnTop: true,
        resizable: false
    });

    LoadingScreen.loadFile('app/Interface/LoadingMenu/loading.html');
}

function createRAQ() {
    const RiskAnalysisQuestionnaire = new BrowserWindow({
        width: 600,
        height: 800,
        //frame: false,
        show: true,
        //alwaysOnTop: true,
        //resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    RiskAnalysisQuestionnaire.loadFile('app/Interface/RiskAnalysisQuestionnaire/index.html');
    RiskAnalysisQuestionnaire.on('closed', createDashboardWindow);
}

function createDashboardWindow() {
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
    ipcMain.once("ready-to-launch", () => {
        // If the application is ready to launch we can swap the loading screen with the dashboard screen.
        LoadingScreen.close();
        DashboardWindow.show();

    });

    // The Windows are already destroyed by the time this gets called. It's throwing an error on close.
    // DashboardWindow.on('closed', () => {
    //     if (AnalysisRenderer) AnalysisRenderer.close()
    //     if (DataRender) DataRender.close()
    // });
}


//
// 1.B HIDDEN PROCESSES
//

let AnalysisRenderer;
let DataRender;

function createAnalysisRenderer() {
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

function createDataRenderer() {
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
ipcMain.on("dashboard-analysis", (_, arg) => AnalysisRenderer.webContents.send("dashboard", arg));
ipcMain.on("data-analysis", (_, arg) => AnalysisRenderer.webContents.send("data", arg));

// 2.B DATA ENDPOINT
ipcMain.on("dashboard-data", (_, arg) => DataRender.webContents.send("dashboard", arg));
ipcMain.on("analysis-data", (_, arg) => DataRender.webContents.send("analysis", arg));

// 2.C DASHBOARD ENDPOINT
ipcMain.on("data-dashboard", (_, arg) => DashboardWindow.webContents.send("data", arg));
ipcMain.on("analysis-dashboard", (_, arg) => DashboardWindow.webContents.send("analysis", arg));

//
// 3. APPLICATION LIFE CYCLE EVENTS
//
function launchApp() {
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
    ipcMain.on('core-action', (_, arg) => {
        console.log(arg) // prints "ping"
    })
}


app.whenReady().then(launchApp);