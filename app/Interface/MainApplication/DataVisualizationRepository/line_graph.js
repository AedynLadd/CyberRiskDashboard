const { group } = require("d3");
var d3 = require("d3")

var line_svg = d3.select("#LineGraph")
    .attr("id", "linegraph_svg")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(40,20)")

// color palette
const color = d3.scaleOrdinal()
    .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])


function generate_line_chart(group_name, data) {
    console.log(group_name);
    console.log(data);
    // Reformat our data to be better suited for a line graph
    restructured_data = restructure(data, ["valueA", "valueB", "valueC"]);
    structured_A = restructured_data.valueA[1];

    //const sumstat = d3.group(data, d => d.group);

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
        .domain(0, d3.extent(data, function (d) { return d.variable; }))
        .range([0, 500]);
    line_svg.append("g")
        .attr("transform", `translate(0, 160)`)
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 160])
        .range([160, 0]);
    line_svg.append("g")
        .call(d3.axisLeft(y));

    console.log("got to here 1")

    // Draw line chart
    line_svg.selectAll(".line")
        .data(structured_A)
        .join("path")
        .attr("fill", "none")
        //.attr("stroke", function (d) { return color(d[0]) })
        .attr("stroke", '#4daf4a')
        .attr("stroke-width", 2)
        .attr("d", function (d) {
            console.log("got to here 2")
            console.log(structured_A)
            console.log("got to here 3")
            return d3.line()
                .x(function (d) { return x(d.date); })
                .y(function (d) { return y(+d.n); })
                (d[1])
        })
}


function restructure(data, group_variables) {
    console.log(group_variables)
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
    console.log(restructured_data);
    return restructured_data;
}