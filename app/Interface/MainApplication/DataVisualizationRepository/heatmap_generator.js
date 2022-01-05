var d3 = require("d3")

url = "../../Data/anomaly_heatmap.csv"
d3.csv(url).then(function(data) {

    var svg = d3.select("#HeatmapDetect")
        .attr("id", "heatmap_svg")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(40,0)")

    var element = document.getElementById("heatmap_svg").getBoundingClientRect();
    element.width = element.width * 0.95
    element.height = element.height * 0.8

    const myGroups = Array.from(new Set(data.map(d => d.group)))
    const myVars = Array.from(new Set(data.map(d => d.variable)))

    // BUILDING THE AXIS
    // Build X scales and axis:
    const x = d3.scaleBand()
        .range([ 0, element.width ])
        .domain(myGroups)
        .padding(0.05);

    svg.append("g")
        .style("font-size", 15)
        .attr("transform", `translate(0, ${ element.height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    const y = d3.scaleBand()
        .range([ element.height, 0 ])
        .domain(myVars)
        .padding(0.05);
        svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()


    // DEFINE COLORS
    // Build color scale
    const myColor = d3.scaleLinear()
        .range(["#ffffff6e", "#fffc4b6e"])
        .domain([1,100])

    // ADD DATA POINTS
    // add the squares
    svg.selectAll()
        .data(data, function(d) {return d.group + ':' + d.variable;})
        .join("rect")
            .attr("x", function(d) { return x(d.group) })
            .attr("y", function(d) { return y(d.variable) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d.value)} )
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)

})