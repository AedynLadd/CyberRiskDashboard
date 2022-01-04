const { easeCircleIn } = require("d3");
var d3 = require("d3");

url = "../../Data/network_graph.json"
d3.json(url).then(function (data) {

    var svg = d3.select("#networkGraph")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")

    svg_w = svg.style("width")
    svg_h = svg.style("height")

    // initialize the simulation
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink()
            .id(function (d) { return d.id; })
            .links(data.links)
        )
        .force("charge", d3.forceManyBody().strength(-150))
        .force("x", d3.forceX(0))
        .force("y", d3.forceY(0))
        .force("collide", d3.forceCollide(d => 15))


    // Initialize the links
    const link = svg.append("g").attr("transform", "translate(" + parseInt(svg_w.substring(0, svg_w.length - 2)) / 2 + ',' + parseInt(svg_h.substring(0, svg_h.length - 2)) / 2 + ")")
        .selectAll("line")
        .data(data.links)
        .join("line")
        .attr("class", "networkGraph-link")

    // Initialize the nodes
    const node = svg.append("g").attr("transform", "translate(" + parseInt(svg_w.substring(0, svg_w.length - 2)) / 2 + ',' + parseInt(svg_h.substring(0, svg_h.length - 2)) / 2 + ")")
        .selectAll("circle")
        .data(data.nodes)
        .join("circle")
        .attr("r", 10)
        .attr("class", "networkGraph-node")
        .call(d3.drag()
            .on("start", drag_started)
            .on("drag", dragged)
            .on("end", drag_ended));

    // What happens when a circle is dragged?
    function drag_started(event, d) {
        if (!event.active) simulation.alphaTarget(.03).restart();
        d.fx = validate_point(d.x, svg_w);
        d.fy = validate_point(d.y, svg_h);
    }

    function dragged(event, d) {
        d.fx = validate_point(event.x, svg_w);
        d.fy = validate_point(event.y, svg_h);
    }
    function drag_ended(event, d) {
        if (!event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
    }

    // Simulation
    simulation.on("tick", ticked)

    function ticked() {
        link
            .attr("x1", function (d) { return validate_point(d.source.x, svg_w); })
            .attr("y1", function (d) { return validate_point(d.source.y, svg_h); })
            .attr("x2", function (d) { return validate_point(d.target.x, svg_w); })
            .attr("y2", function (d) { return validate_point(d.target.y, svg_h); })

        node
            .attr("transform", function (d) {
                return "translate(" + validate_point(d.x, svg_w) + "," + validate_point(d.y, svg_h) + ")";
            })
    }
    function validate_point(point, bounds) {
        bounds = parseInt(bounds.substring(0, bounds.length - 2)) / 2
        return (Math.abs(point) < bounds ? point : Math.sign(point)*bounds); 
        return point;
    }
})
