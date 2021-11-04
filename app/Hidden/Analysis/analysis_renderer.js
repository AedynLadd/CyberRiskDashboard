/**
 *  Copyright (c) 2021
 *
 *  long description for the file
 *
 *  @summary Used to startup python processes to perform data analysis
 *  @author Aedyn Ladd <aedynladd@cmail.carleton.ca>
 *
 *  Created at     : 2017-11-03 02:21:56 
 *  Last modified  : 2018-02-25 15:31:40
 */

const { ipcRenderer } = require('electron');
const python = require("child_process");
const path = require('path');
const fs = require('fs');

/**
 * Compile the Data Analysis Folder into a Map
 */
const createEventList = () => {
    let dataEvents = new Map();
    //passing directoryPath and callback function
    const ReadDirectory = (directoryPath) => {
        fs.readdir(directoryPath, function(err, files) {
            //handling error
            if (err) return console.log('Incapable of scanning the directory: ' + err);

            //listing all files using forEach
            files.forEach(function(file) {
                var path = fs.statSync(directoryPath + "\\" + file);
                // Do whatever you want to do with the file
                if (path.isDirectory()) {
                    ReadDirectory(directoryPath + "\\" + file)
                } else {
                    var file_data = file.split(".")
                    dataEvents.set(file_data[0], { type: file_data[1], path: directoryPath + "\\" + file })
                }
            });
        });
    }
    ReadDirectory(path.join(__dirname, 'DataAnalysis'));

    return dataEvents
}

let subprocess_analysis = createEventList();

/**
 * 
 * @param {*} arg //example { command: "analysis_test", data: ["data", "data", "data"] }
 * @returns None
 */
const summonSubProcess = (subprocess_call) => {
    var CommandEvent;
    // check that the command exists
    if ((CommandEvent = subprocess_analysis.get(subprocess_call.command)) == undefined) return

    // Call that command file
    try {
        //Call python and handle it
        var pythonProcess = python.spawn('python', [CommandEvent.path, subprocess_call.data]);
    } catch (error) {
        // Some error occured - return an error message
        console.error(error);
    }
};


//
// INCOMING IPC
//
ipcRenderer.on('dashboard', (event, arg) => {
    summonSubProcess(arg)
})

ipcRenderer.on('data', (event, arg) => {
    console.log(arg) // prints "pong"
})