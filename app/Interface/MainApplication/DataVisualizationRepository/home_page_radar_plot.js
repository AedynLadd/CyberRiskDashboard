var d3 = require("d3");

// set the dimensions and margins of the graph
const element = document.querySelector('#radar_chart_vis')

const rec = element.getBoundingClientRect();

console.log(rec)

// append the svg object to the div called 'my_dataviz'
const radar_chart_svg = d3.select("#radar_chart_vis")
                          .append("svg")
                          .attr("width", "100%")
                          .attr("height", "100%")

