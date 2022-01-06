var d3 = require("d3");

url = "../../Data/network_graph.json"
d3.json(url).then(function (data) {
    let isChord = false;

    var svg = d3.select("#networkGraph")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")

    svg_w = svg.style("width")
    svg_w = parseInt(svg_w.substring(0, svg_w.length - 2))
    svg_h = svg.style("height")
    svg_h = parseInt(svg_h.substring(0, svg_h.length - 2));

    // initialize the simulation forces
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink()
            .id(function (d) { return d.id; })
            .links(data.links)
        )
        .force("charge", d3.forceManyBody().strength(-150))
        .force("x", d3.forceX(0))
        .force("y", d3.forceY(0))
        .force("collide", d3.forceCollide(d => 15))

    var allNodes = data.nodes.map(function (d) { return d.name })

    var idToNode = {};
    data.nodes.forEach(n => idToNode[n.id] = n);

    var x = d3.scalePoint()
        .range([0, svg_w - 10])
        .domain(allNodes)

    function circlify(point) {
        var theta = (Math.PI / (svg_w / 2)) * x(point);
        var radius = (svg_h / 2)
        var y_value = radius * Math.sin(theta)
        var x_value = radius * Math.cos(theta)
        return [x_value, y_value]
    }

    // Initialize Network diagrams
    // Initialize the links
    const link = svg.append("g").attr("id", "network_diagram_g")
        .attr("transform", "translate(" + svg_w / 2 + ',' + svg_h / 2 + ")")
        .selectAll("path")
        .data(data.links)
        .join("path")
        .attr("class", "networkGraph-link")

    // Initialize the nodes
    const node = svg.append("g").attr("transform", "translate(" + svg_w / 2 + ',' + svg_h / 2 + ")")
        .selectAll("circle")
        .data(data.nodes)
        .join("circle")
        .attr("r", 10)
        .attr("class", "networkGraph-node")

    // Add interactions
    node.call(d3.drag()
        .on("start", drag_started)
        .on("drag", dragged)
        .on("end", drag_ended))
        .on("mouseover", function (event, d) {
            // Turn into a chord plot
            // Highlight the nodes
            if (!isChord) {
                d3.select(this).attr('class', 'networkGraph-node-Highlighted')
                // Highlight the links
                link.attr("class", a => a.source.id === d.id || a.target.id === d.id ? 'networkGraph-link-Highlighted' : 'networkGraph-link');
            }
        })
        .on('mouseout', function (event, d) {
            if (!isChord) {
                node.attr('class', "networkGraph-node")
                link.attr("class", "networkGraph-link")
            }
        })
        .on('click', function (event,d) {

        })
        .on('dblclick', function (event, d) {
            simulation.stop()
            isChord = (isChord) ? false : true;
            //Highlight the selected!
            d3.select(this).attr('class', 'networkGraph-node-Highlighted')
            link.attr("class", a => a.source.id === d.id || a.target.id === d.id ? 'networkGraph-link-Highlighted' : 'networkGraph-link');

            node.transition()
                .duration(500)
                .attr("transform", function (d) {
                    coords = circlify(d.name);
                    return "translate(" + coords[0] + "," + coords[1] + ")"
                });

            link
                .transition()
                .duration(600)
                .attr("d", d => ["M",circlify(d.source.name)[0], circlify(d.source.name)[1],  // M P1X P1Y
                                 "Q", 0, 0, // Q C1X C1Y
                                 circlify(d.target.name)[0], circlify(d.target.name)[1]].join(" ")); // P2X P2Y
                //.attr("d", d => "M" + circlify(d.source.name)[0] + " " + circlify(d.source.name)[1] + "L" + circlify(d.target.name)[0] + " " + circlify(d.target.name)[1] + " Z");

            //link.style("display","none");
        });


    // Circle Dragging
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
            .attr("d", d => "M" + validate_point(d.source.x, svg_w) + " " + validate_point(d.source.y, svg_h) + "L" + validate_point(d.target.x, svg_w) + " " + validate_point(d.target.y, svg_h) + "Z");
        node
            .attr("transform", function (d) {
                return "translate(" + validate_point(d.x, svg_w) + "," + validate_point(d.y, svg_h) + ")";
            })

    }

    function validate_point(point, bounds) {
        bounds = bounds / 2
        return (Math.abs(point) < bounds ? point : Math.sign(point) * bounds);
    }
})
