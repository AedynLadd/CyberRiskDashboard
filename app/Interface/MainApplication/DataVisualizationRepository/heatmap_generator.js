var d3 = require("d3")

url = "../../Data/anomaly_heatmap.csv"
d3.csv(url).then(function (data) {

    var svg = d3.select("#HeatmapDetect")
        .attr("id", "heatmap_svg")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(40,0)")

    var element = document.getElementById("heatmap_svg").getBoundingClientRect();
    element.width = element.width * 0.95
    element.height = element.height * 0.85

    const myGroups = Array.from(new Set(data.map(d => d.group)));

    const myVars = Array.from(new Set(data.map(d => d.variable)));
    const intial_date = myVars[0];

    // BUILDING THE AXIS
    // Build X scales and axis:
    const x = d3.scaleBand()
        .range([0, element.width])
        .domain(myGroups)
        .padding(0.05);

    // Build Y scales and axis:
    const y = d3.scaleBand()
        .range([element.height, 0])
        .domain(myVars)
        .padding(0.05);

    // DEFINE COLORS
    // Build color scale
    const myColor = d3.scaleLinear()
        .range(["#ffffff6e", "#fffc4b6e"])
        .domain([1, 100])

    // ADD DATA POINTS
    // add the squares
    const dataPoints = svg.selectAll()
        .data(data, function (d) { return d.group + ':' + d.variable; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.group) })
        .attr("y", function (d) { return y(d.variable) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", "#ffffff4e")
        .style("opacity", 0.8)

    renderColor()

    d3.selectAll('#variable_selector').on('click', function () {
        console.log("clicked")
        renderColor();
    });


    function renderColor() {
        var selected_variable = document.getElementById('variable_selector').value

        dataPoints
            .transition()
            .delay(function (d) {
                var date1 = new Date(myVars[0]);
                var date2 = new Date(d.variable);

                var Difference_In_Time = date2.getTime() - date1.getTime();
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                return Difference_In_Days*30
            })
            .duration(500)
            .style('fill', function (d, i, a) {
                return myColor(d[selected_variable]);
            });
    }
})