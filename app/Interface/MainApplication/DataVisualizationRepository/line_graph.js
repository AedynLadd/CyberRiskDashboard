console.log("hello")
var d3 = require("d3")

var line_svg = d3.select("#LineGraph")
    .attr("id", "linegraph_svg")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(40,0)")

// color palette
const color = d3.scaleOrdinal()
.range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])


function generate_line_chart(group_name, data) {
    // console.log(group_name);
    // console.log(data);
    // Filter by group name

    //const sumstat = d3.group(data, d => d.group);
    //console.log(sumstat)

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.variable; }))
        .range([0, 500]);
    line_svg.append("g")
        .attr("transform", `translate(0, 100)`)
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 150])
        .range([150, 0]);
    line_svg.append("g")
        .call(d3.axisLeft(y));

    // Draw line chart
    line_svg.selectAll(".line")
        .data(data)
        .join("path")
        .attr("fill", "none")
        //.attr("stroke", function (d) { return color(d[0]) })
        .attr("stroke", '#e41a1c')
        .attr("stroke-width", 1.5)
        .attr("d", function (d) {
            return d3.line()
                .x(function (d) { return x(d.variable); })
                .y(function (d) { return y(d.valueA); })
                (d[1])
        })
    // line_svg.selectAll(".line")
    //     .data(data)
    //     .join("path")
    //     .attr("fill", "none")
    //     //.attr("stroke", function (d) { return color(d[0]) })
    //     .attr("stroke", '#377eb8')
    //     .attr("stroke-width", 1.5)
    //     .attr("d", function (d) {
    //         return d3.line()
    //             .x(function (d) { return x(d.variable); })
    //             .y(function (d) { return y(+d.valueB); })
    //             (d[1])
    //     })
    // line_svg.selectAll(".line")
    //     .data(data)
    //     .join("path")
    //     .attr("fill", "none")
    //     //.attr("stroke", function (d) { return color(d[0]) })
    //     .attr("stroke", '#4daf4a')
    //     .attr("stroke-width", 1.5)
    //     .attr("d", function (d) {
    //         return d3.line()
    //             .x(function (d) { return x(d.variable); })
    //             .y(function (d) { return y(+d.valueC); })
    //             (d[1])
    //     })
}

// url = "./../Data/anomaly_heatmap.csv"
// d3.csv(url).then(function (data) {

//     // var svg = d3.select("#LineGraph")
//     //     .attr("id", "linegraph_svg")
//     //     .append("svg")
//     //     .attr("width", "100%")
//     //     .attr("height", "100%")
//     //     .append("g")
//     //     .attr("transform", "translate(40,0)")

//     // group the data: I want to draw one line per group
//     // const sumstat = d3.group(data, d => d.name); // nest function allows to group the calculation per level of a factor

//     // Add X axis --> it is a date format
//     const x = d3.scaleLinear()
//         .domain(d3.extent(data, function (d) { return d.year; }))
//         .range([0, 500]);

//     line_svg.append("g")
//         .attr("transform", `translate(0, 100)`)
//         .call(d3.axisBottom(x).ticks(5));

//     // Add Y axis
//     const y = d3.scaleLinear()
//         .domain([0, d3.max(data, function (d) { return +d.n; })])
//         .range([100, 0]);

//     line_svg.append("g")
//         .call(d3.axisLeft(y));

//     // color palette
//     const color = d3.scaleOrdinal()
//         .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

//     // Draw the line
//     line_svg.selectAll(".line")
//         .data(sumstat)
//         .join("path")
//         .attr("fill", "none")
//         .attr("stroke", function (d) { return color(d[0]) })
//         .attr("stroke-width", 1.5)
//         .attr("d", function (d) {
//             return d3.line()
//                 .x(function (d) { return x(d.year); })
//                 .y(function (d) { return y(+d.n); })
//                 (d[1])
//         })

// })