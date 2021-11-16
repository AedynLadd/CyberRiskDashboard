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


//
// INCOMING COMMUNICATIONS FROM MAIN (for whatever reason we might need in the future)
//
ipcRenderer.on('data', (event, arg) => {
    console.log(arg) // prints "pong"
})

ipcRenderer.on('analysis', (event, arg) => {
    console.log(arg) // prints "pong"
})