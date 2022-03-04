// Get the modal
var modal = document.getElementById("settings_modal");

// Get the button that opens the modal
var btn = document.getElementById("settings_button_open");

var settings_button_list_EXIT = document.getElementById("settings_button_list_EXIT");
var settings_button_list_HELP = document.getElementById("settings_button_list_HELP");
var settings_button_list_RAQ = document.getElementById("settings_button_list_RAQ");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal_close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//
// BUTTON CLICKS
//

settings_button_list_EXIT.onclick = function(event){
  console.log("EXITING")
  ipcRenderer.send("core-action", "close_app")
}

settings_button_list_HELP.onclick = function(event){
  console.log("HELP ME!")
}

settings_button_list_RAQ.onclick = function(event){
  console.log("RAQ OPEN")
  ipcRenderer.send('core-action', "summon_raq");
}