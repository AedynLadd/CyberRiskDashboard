// load in the help info
var d3 = require("d3");

var modal, settings_content, btn, settings_button_list_EXIT, settings_button_list_HELP, settings_button_list_RAQ, span

var _directory_split = __dirname.split("\\")
var dir = _directory_split.slice(0, _directory_split.indexOf("MainApplication") + 1).join("/")

d3.json(dir + "/Information_Modal/visual_info.json").then(function (data) {
  // Get the modal
  modal = document.getElementById("settings_modal");
  settings_content = document.getElementById("modal_content");

  for (key in data["visuals"]) {
    var visual_element = document.getElementById(key)

    if (visual_element != null) {
      modal.innerHTML += create_help_card(key)

      var new_help_item = document.getElementById("help_me_" + key)

      var offsets = visual_element.getBoundingClientRect();
      new_help_item.style.position = "absolute";
      new_help_item.style.left = offsets.left + "px";
      new_help_item.style.top = offsets.top + "px";
      new_help_item.style.display = "none";
    }
  }

  // Get the button that opens the modal
  btn = document.getElementById("settings_button_open");

  settings_button_list_EXIT = document.getElementById("settings_button_list_EXIT");
  settings_button_list_HELP = document.getElementById("settings_button_list_HELP");
  settings_button_list_RAQ = document.getElementById("settings_button_list_RAQ");

  // Get the <span> element that closes the modal
  span = document.getElementsByClassName("modal_close")[0];

  help_items_displayed = {}
  // Is the help menu on?
  var help_menu_on = false

  // When the user clicks the button, open the modal 
  btn.onclick = function () {
    modal.style.display = "block";
    settings_content.style.display = "";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      if (help_menu_on) {
        settings_content.style.display = "block";
        // hide the help modals
        for (item in help_items_displayed) {
          console.log(item)
          this_help_element = document.getElementById(item)
          this_help_element.style.display = "none";
        }
        help_menu_on = false
      } else {
        modal.style.display = "none";
      }
    }
  }

  //
  // BUTTON CLICKS
  //

  settings_button_list_EXIT.onclick = function (event) {
    ipcRenderer.send("core-action", "close_app")
  }


  function create_help_card(key) {

    var div_element = [
      "<div class='help_modal_element' id='help_me_" + key + "'>",
      key,
      "</div>"
    ]

    return div_element.join(" ")
  }

  settings_button_list_HELP.onclick = function (event) {
    console.log("was clicked?")
    help_menu_on = true
    settings_content.style.display = "none";

    for (key in data["visuals"]) {
      var visual_element = document.getElementById(key)
      if (visual_element != null) {
        var new_help_item = document.getElementById("help_me_" + key)
        help_items_displayed["help_me_" + key] = 1
        new_help_item.style.display = "block";
      }
    }
  }

  settings_button_list_RAQ.onclick = function (event) {
    ipcRenderer.send('core-action', "summon_raq");
  }

})