/**
 *  Copyright (c) 2021
 *
 *  This is more just for reference, its not really imported into anything since the functions are so small and specific already
 *
 *  @summary Respond to application lifecycle events 
 *  @author Aedyn Ladd <aedynladd@cmail.carleton.ca>
 *
 *  Created at     : 2017-11-03 02:21:56 
 *  Last modified  : 2018-02-25 15:31:40
 */

const { ipcRenderer } = require('electron')


ipcRenderer.on('from-main', (event, arg) => {
    console.log(arg)
})

ipcRenderer.send('to-main', 'ping')