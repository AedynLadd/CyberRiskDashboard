const { max, svg } = require("d3");
var d3 = require("d3")

var line_svg = d3.select("#LineGraph")
    .attr("id", "linegraph_svg")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(40,20)")


function generate_line_chart(group_name, data) {
    line_svg.selectAll("g.line_axis").remove();
    line_svg.selectAll("text.line_axis").remove();
    line_svg.selectAll("path.data_display").remove();

    // Reformat our data to be better suited for a line graph
    restructured_data = restructure(data, ["valueA", "valueB", "valueC"]);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain(d3.extent(data, d => new Date(d.variable)))
        .range([0, 900]);

    line_svg.append("g")
        .attr("class", "line_axis")
        .attr("transform", `translate(0, 300)`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%B, %d, %Y")).ticks(5));

    line_svg.append("text")      // text label for the x axis
        .attr("x", 450)
        .attr("y",  320)
        .attr("class", "line_axis")
        .style("text-anchor", "middle")
        .style("font-size","11px")
        .text("Dates");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            var max_of_set = [d.valueA, d.valueB, d.valueC]
            return d3.max(max_of_set)
        })])
        .range([300, 0]);

    line_svg.append("g")
        .attr("class", "line_axis")
        .call(d3.axisLeft(y));
    
    line_svg.append("text")
        .attr("x", 450)             
        .attr("y", 5)
        .attr("text-anchor", "middle")
        .attr("class", "line_axis")
        .style("font-size", "11px") 
        .style("text-decoration", "underline")  
        .text("Trainings Taken vs Number of People Who Took");


    var color = d3.scaleOrdinal()
        .range(["#f5f37cd5", "#bebc45d5"]);
    
    // Draw line chart
    line_svg.selectAll(".line")
        .data(Object.values(restructured_data))
        .enter()
        .append("path")
        .attr("class", "data_display")
        .attr("fill", "none")
        .attr("stroke", d => color(d[0]))
        .attr("d", function (d) {
            return d3.line()
                .x(d => x(new Date(d.date)))
                .y(d => y(d.n))
                (d[1])
        })
        .on("mouseover", function(d){
            d3.select(this).attr("stroke-width", 3)
        })
        .on("mouseout", function(d){
            d3.select(this).attr("stroke-width", 1)
        })
}


function restructure(data, group_variables) {
    var restructured_data = new Object();

    (data).forEach(element => {
        (group_variables).forEach(group => {
            if (restructured_data[group] == undefined) {
                restructured_data[group] = [
                    group,
                    [{
                        "date": element["variable"],
                        "name": group,
                        "n": parseInt(element[group])
                    }]
                ];
            } else {
                restructured_data[group][1]
                    .push(
                        {
                            "date": element["variable"],
                            "name": group,
                            "n": parseInt(element[group])
                        });
            }
        })
    });

    return restructured_data;
}