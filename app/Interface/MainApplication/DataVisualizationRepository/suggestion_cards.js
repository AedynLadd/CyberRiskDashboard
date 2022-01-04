

suggestion_stack = [];

colors = ["4be4ff2f", "da1eff2f", "fffc4b2f", "ff4b4b2f", "4bff692f"]
for(var i = 1; i <= 5; i++){
    var suggestion_card = document.getElementById("suggestion_card_" + i)
    suggestion_stack[i-1] = suggestion_card;

    hexStr = (parseInt(colors[i - 1],16) + 70).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; }

    suggestion_card.style.borderBottom = "10px solid #" + hexStr;
}
