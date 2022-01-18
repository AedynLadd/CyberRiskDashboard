var d3 = require("d3");

d3.json(__dirname + "/Data/NIST_criteria.json").then(function (data) {
    data = reformat_data(data)

    var width = 100;
    const stacked_svg = d3.select("#stackedAreaChart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", `translate(0, 0)`);

    // List of groups = header of the csv files
    const keys = data.columns.slice(1)

    // Add X axis
    const x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.year; }))
        .range([0, width]);
    stacked_svg.append("g")
        .attr("transform", `translate(0, 0)`)
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 200000])
        .range([100, 0]);
    stacked_svg.append("g")
        .call(d3.axisLeft(y));

    // color palette
    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'])

    //stack the data
    const stackedData = d3.stack()
        .keys(keys)
        (data)

    // Show the areas
    stacked_svg
        .selectAll("mylayers")
        .data(stackedData)
        .join("path")
        .style("fill", function (d) { return color(d.key); })
        .attr("d", d3.area()
            .x(function (d, i) { return x(d.data.year); })
            .y0(function (d) { return y(d[0]); })
            .y1(function (d) { return y(d[1]); })
        )

});


function reformat_data(data){
    console.log(reformat_data)
    return formatted_data;
}