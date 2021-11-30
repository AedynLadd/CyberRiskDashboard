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

/**
 * Write in the text
 * @param {*} text What is being written
 * @param {*} id Div ID
 */
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
                TimeoutVars[i] = setTimeout(update, 25);
        }
        update();
    }

}


/**
 * 
 * @param {*} evt 
 * @param {*} itemName 
 */
function openSubCategory(evt, itemName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("subCategoryTab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("subcategoryLink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(itemName).style.display = "grid";
    evt.currentTarget.className += " active";
}