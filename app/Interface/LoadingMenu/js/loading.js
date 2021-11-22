var NIST_display = document.getElementById("NIST_display");

var NIST_function_title = document.getElementById("NIST_Function");
var NIST_category_title = document.getElementById("NIST_category");
var NIST_category_description = document.getElementById("category_description");

// Return a random index of our file
framework_index = Math.floor(Math.random() * framework.length);
category_index = Math.floor(Math.random() * framework[framework_index].Category.length);


NIST_function_title.innerHTML = framework[framework_index].Function;
NIST_category_title.innerHTML = framework[framework_index].Category[category_index].Title;
NIST_category_description.innerHTML = framework[framework_index].Category[category_index].Description;

NIST_display.className += framework[framework_index].class