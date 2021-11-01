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

const { ipcRenderer } = require('electron')
const { spawn } = require("child_process").spawn;

// INCOMING IPC
ipcRenderer.on('dashboard', (event, arg) => {
    console.log(arg) // prints "pong"
})

ipcRenderer.on('data', (event, arg) => {
    console.log(arg) // prints "pong"
})

//
function summonPython(req, res) {
    var process = spawn('python', ["./hello.py",
        req.query.firstname,
        req.query.lastname
    ]);
}