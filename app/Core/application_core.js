const { app, BrowserWindow, ipcMain } = require('electron')

// 
// Initial Loading
//

let LoadingScreen;
let MainWindow;

const createLoadingScreen = () => {
    LoadingScreen = new BrowserWindow({
        width: 400,
        height: 400,
        frame: false,
        show: true,
        alwaysOnTop: true,
        resizable: false
    });

    LoadingScreen.loadFile('app/Interface/LoadingMenu/loading.html');
    LoadingScreen.on('closed', () => (LoadingScreen = null));
}

const createMainWindow = () => {
    MainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        frame: false,
        show: false,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    MainWindow.loadFile('app/Interface/MainMenu/main.html');
    MainWindow.webContents.on('did-finish-load', () => {
        /// then close the loading screen window and show the main window
        if (LoadingScreen) {
            LoadingScreen.close();
        }
        MainWindow.show();
    });
}


app.on('ready', () => {
    // create a 'loading'-Window
    createLoadingScreen();
    /// Create list of events
    createEventList();
    // Create a 'main'-Window
    createMainWindow();
})


//
// Data Analysis Handler
//

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

let dataEvents = new Map();

const createEventList = () => {
    //passing directoryPath and callback function
    const ReadDirectory = (directoryPath) => {
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) return console.log('Incapable of scanning the directory' + err);
            
            //listing all files using forEach
            files.forEach(function (file) {
                var path = fs.statSync(directoryPath + "\\" + file);
                // Do whatever you want to do with the file
                if (path.isDirectory()){
                    ReadDirectory(directoryPath + "\\" + file)
                } else {
                    var file_data = file.split(".")
                    dataEvents.set(file_data[0], { type: file_data[1], path: directoryPath + "\\" + file})
                }
            });
        });
    }
    ReadDirectory(path.join(__dirname, 'events'));
}

// IPC Main
const python = require("child_process")

ipcMain.on('commandHandler-send', (event, arg) => {
    // Find the command in our tool list and execute it
    const command = arg.command;
    const spawnArgs = arg.data; 

    var CommandEvent;

    // check that the command exists
    if ((CommandEvent = dataEvents.get(command)) == undefined ) return

    // Call that command file
    try {
        //Call python and handle it
        const pythonProcess = python.spawn('python', [CommandEvent.path, spawnArgs ]);
        pythonProcess.stdout.on('data', (data) => { 
            event.returnValue = data.toString() 
        });
    } catch (error) {
        // Some error occured - return an error message
        console.error(error);
    }
});

