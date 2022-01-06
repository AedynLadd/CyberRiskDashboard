var d3 = require("d3");
var d3_sankey = require("d3-sankey")

url = "../../Data/sankey_data.json"
d3.json(url).then(function (data) {
    // Identify intial SVG
    var svg = d3.select("#sankeyIdentityChart")
        .attr("id", "sankeyChart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .on("dblclick", update)
        .append("g")

    // Identify our element so we can use its height and width
    var element = document.getElementById("sankeyChart").getBoundingClientRect();

    // Create sankey
    var sankey = d3_sankey.sankey()
        .nodeWidth(20)
        .nodePadding(2)
        .size([element.width, element.height]);

    var graph = sankey(data)

    sankey.nodes(graph.nodes)
        .links(graph.links)

    // Add in the links
    const link = svg.append("g")
        .attr("id", "sankey_links_g")
        .selectAll("path")
        .data(graph.links)
        .join("path")
        .attr("class", "link")

    // add in the nodes
    const node = svg.append("g")
        .selectAll("rect")
        .data(graph.nodes)
        .join("rect")
        .attr("class", "node")

    update();
    function update() {

        node.attr("x", function (d) { return d.x0; })
            .attr("y", function (d) { return d.y0; })
            .attr("height", function (d) { return Math.max(d.y1 - d.y0, 1); })
            .attr("width", sankey.nodeWidth())
            .on("click", function (event, d) {
                // filter our data here
                update();
            })


        link.attr("d", d3_sankey.sankeyLinkHorizontal())
            .attr("stroke-width", function (d) { return d.width; });

        console.log("updating - or trying too....")

    }
})