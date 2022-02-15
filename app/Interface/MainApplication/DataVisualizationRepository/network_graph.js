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
        var radius = (svg_h / 2) * 0.95
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
        .on('click', function (event, d) {
            // Display information on panel
            display_node_info(d)
            // Highlight the node
            if (isChord) {
                // Highlight the links
                link.attr("class", a => a.source.id === d.id || a.target.id === d.id ? 'chord-link-Highlighted' : 'chord-link');
                node.attr('class', a => a.id === d.id ? 'networkGraph-node-Highlighted' : "networkGraph-node")
            } else {
                node.attr('class', a => a.id === d.id ? 'networkGraph-node-Highlighted' : "networkGraph-node")
                // Highlight the links
                link.attr("class", a => a.source.id === d.id || a.target.id === d.id ? 'networkGraph-link-Highlighted' : 'networkGraph-link');
            }
        })
        .on('dblclick', function (event, d) {
            isChord = (isChord) ? false : true;

            if (isChord) {
                simulation.stop()
                //Highlight the selected!
                d3.select(this).attr('class', 'networkGraph-node-Highlighted')
                link.attr("class", a => a.source.id === d.id || a.target.id === d.id ? 'chord-link-Highlighted' : 'chord-link');

                node.transition()
                    .duration(500)
                    .attr("transform", function (d) {
                        coords = circlify(d.name);
                        return "translate(" + coords[0] + "," + coords[1] + ")"
                    });

                link
                    .transition()
                    .duration(500)
                    .attr("d", d => ["M", circlify(d.source.name)[0], circlify(d.source.name)[1],  // M P1X P1Y
                        "Q", 0, 0, // Q C1X C1Y
                        circlify(d.target.name)[0], circlify(d.target.name)[1]].join(" ")); // P2X P2Y
            } else {
                simulation.restart();
                // Network highlighting
                node.attr('class', a => a.id === d.id ? 'networkGraph-node-Highlighted' : "networkGraph-node")
                // Highlight the links
                link.attr("class", a => a.source.id === d.id || a.target.id === d.id ? 'networkGraph-link-Highlighted' : 'networkGraph-link');
            }

        });


    // Circle Dragging
    function drag_started(event, d) {
        if (isChord) return;
        if (!event.active) simulation.alphaTarget(.03).restart();
        d.fx = validate_point(d.x, svg_w);
        d.fy = validate_point(d.y, svg_h);

    }

    function dragged(event, d) {
        if (isChord) return;
        d.fx = validate_point(event.x, svg_w);
        d.fy = validate_point(event.y, svg_h);

    }

    function drag_ended(event, d) {
        if (isChord) return;
        if (!event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;

    }

    // Simulation
    simulation.on("tick", ticked)

    function ticked(transition_duration = 50) {
        link.transition()
            .duration(transition_duration)
            .attr("d", d => "M" + validate_point(d.source.x, svg_w) + " " + validate_point(d.source.y, svg_h) + "L" + validate_point(d.target.x, svg_w) + " " + validate_point(d.target.y, svg_h) + "Z");
        node.transition()
            .duration(transition_duration)
            .attr("transform", function (d) {
                return "translate(" + validate_point(d.x, svg_w) + "," + validate_point(d.y, svg_h) + ")";
            })

    }

    function validate_point(point, bounds) {
        bounds = bounds / 2
        return (Math.abs(point) < bounds ? point : Math.sign(point) * bounds);
    }
})

let cvss_data = undefined
url_cvss = "../../Data/NVD_analysis.json"
d3.json(url_cvss).then(data => cvss_data = data);

//
// INFORMATION TAB
//
// Displaying node information
function display_node_info(node_element) {
    document.getElementById("networkGraph_info_id").innerHTML = node_element.id
    document.getElementById("networkGraph_info_ip").innerHTML = node_element.name
    createSoftwareTable("networkGraph_info_software_assets", node_element.data)
    createDataTable("networkGraph_info_data_assets", node_element)
    createHardwareTable("networkGraph_info_physical_assets", node_element)
}

// Create table with software assets and linked risks
function createSoftwareTable(id, data_items) {
    var base_div = document.getElementById(id);
    var base_tbl = document.createElement('table');

    // Data keys
    // Append the data
    let max_rows = data_items.length;
    let max_columns = 2;
    for (let rows = 0; rows <= (max_rows); rows++) {
        var tbl_row = base_tbl.insertRow();
        for (let columns = 0; columns <= (max_columns - 1); columns++) {
            var cell_element = tbl_row.insertCell();
            if (rows == 0) {
                cell_element.style.fontWeight = "bold";
                if (columns == 0) {
                    cell_info = "Software";
                } else {
                    cell_info = "Number of Vulnerabilities"
                }
            } else {
                // define columns
                if (columns == 0) {
                    cell_info = data_items[rows - 1];
                } else if (columns == 1) {
                    cell_info = cvss_data[data_items[rows - 1]].length;
                    if(cell_info >= 1000) {
                        cell_info = "1000+";
                    }
                }
            }

            cell_element.appendChild(document.createTextNode(cell_info + ''));
        }
    }

    // Create table
    base_div.innerHTML = ""
    base_div.append(base_tbl)
}

// Create a table indicating hardware assets
function createHardwareTable(id, data_items) {
    var base_div = document.getElementById(id);
    var base_tbl = document.createElement('table');
}

// Creates the folder structure for the data assets
function createDataTable(id, data_items) {
    var base_div = document.getElementById(id);
    var base_tbl = document.createElement('table');

}