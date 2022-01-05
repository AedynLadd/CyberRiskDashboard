var d3 = require("d3");
var d3_sankey = require("d3-sankey")

url = "../../Data/sankey_diagram.json"
d3.json(url).then(function (data) {
    // Identify intial SVG
    var svg = d3.select("#sankeyIdentityChart")
        .attr("id", "sankeyChart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")

    // Identify our element so we can use its height and width
    var element = document.getElementById("sankeyChart").getBoundingClientRect();

    // Create sankey
    var sankey = d3_sankey.sankey()
            .nodeWidth(20)
            .nodePadding(15)
            .size([element.width, element.height]);

    var graph = sankey(data)

    sankey.nodes(graph.nodes)
        .links(graph.links)

    // Add in the links
    svg.append("g")
        .selectAll(".link")
        .data(graph.links)
        .enter().append("path")
            .attr("class", "link")
            .attr("d", d3_sankey.sankeyLinkHorizontal())
            .attr("stroke-width", function(d) { return d.width; })
            .sort(function(a,b) { return b.dy - a.dy; })

    // add in the nodes
    var node = svg.append("g")
        .selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    // add the rectangles for the nodes
    node.append("rect")
        .attr("x", function(d) { return d.x0; })
        .attr("y", function(d) { return d.y0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("width", sankey.nodeWidth())
        .style("fill", "red")
        .style("stroke", "red")


})

