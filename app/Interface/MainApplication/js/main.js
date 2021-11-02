/**
 *  Copyright (c) 2021
 *
 *  long description for the file
 *
 *  @summary Short Summary
 *  @author Aedyn Ladd <aedynladd@cmail.carleton.ca>
 *
 *  Created at     : 2017-11-03 02:21:56 
 *  Last modified  : 2018-02-25 15:31:40
 */
const { ipcRenderer } = require('electron')

setTimeout(function() {
    ipcRenderer.send('ready-to-launch', 'Done!')
}, 5000);


/*
 * DATA ANALYSIS BUTTON
 */
const button = document.querySelector('input');

button.addEventListener('click', PerformAction);

function PerformAction() {
    // Disable the button
    button.disabled = true;
    button.value = 'Disabled';
    window.setTimeout(function() {
        button.disabled = false;
        button.value = 'Enabled';
    }, 2000);

    //Perform an action
    console.log("Button Was Clicked")
    ipcRenderer.send('dashboard-analysis', { command: "analysis_test", data: ["data", "data", "data"] });
}


//
// INCOMING ELECTRON COMMUNICATIONS
//
ipcRenderer.on('data', (event, arg) => {
    console.log(arg) // prints "pong"
})

ipcRenderer.on('analysis', (event, arg) => {
    console.log(arg) // prints "pong"
})