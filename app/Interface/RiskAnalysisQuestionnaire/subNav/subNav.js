/**
 * 
 * @param {*} evt 
 * @param {*} itemName 
 */
var page_number = 0;
var max_page = 2

function openSubCategory(evt, itemName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    page_number += ((itemName == "next") ? 1 : -1);

    if (page_number == 0) {
        document.getElementById("previous_page").style.display = "none";
    } else if (page_number == max_page) {
        document.getElementById("next_page").style.display = "none";
    } else {
        document.getElementById("previous_page").style.display = "block";
        document.getElementById("next_page").style.display = "block";
    }

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
    document.getElementById("Page" + page_number).style.display = "grid";
    evt.currentTarget.className += " active";
}