/**
 *  Copyright (c) 2021
 *
 *  long description for the file
 *
 *  @summary Speaks directly to the database and all nodes, and sends necessary data to Analysis
 *  @author Aedyn Ladd <aedynladd@cmail.carleton.ca>
 *
 *  Created at     : 2017-11-03 02:21:56 
 *  Last modified  : 2018-02-25 15:31:40
 */

const { ipcRenderer } = require('electron')

// IPC RECEIVING FROM APPLICATION
ipcRenderer.on('dashboard', (event, arg) => {
    console.log(arg) // prints "pong"
})

ipcRenderer.on('analysis', (event, arg) => {
    console.log(arg) // prints "pong"
})

// OUTWARD COMMUNICATION WITH NODES

