/**
 *  Copyright (c) 2021
 *
 *  long description for the file
 *
 *  @summary Short Summary
 *  @author Aedyn Ladd <aedynladd@cmail.carleton.ca>
 *
 *  Created at     : 
 *  Last modified  : 
 */
var TimeoutVars = [];

function changeText(text, id) {
    // Clear timeouts
    TimeoutVars.forEach(element => clearTimeout(element));

    var display = document.getElementById(id);
    if (text.length == 2) {
        display.innerHTML = text;
    } else {
        var i = 0
        let update = () => {
            display.innerHTML = text.substring(0, i);
            i++;
            if (i <= text.length)
                TimeoutVars[i] = setTimeout(update, 50);
        }
        update();
    }

}