const { lineRadial, filter } = require("d3");
var d3 = require("d3");
var d3_sankey = require("d3-sankey")

url = "../../Data/sankey_data.json"

d3.json(url).then(function (data) {
    // Configure tree_family diagram and master data set
    const family_diagram = data.family
    const master_data = data.graph

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
        .nodePadding(2)
        .size([element.width, element.height]);

    // Load in the sankey data
    var graph = sankey(master_data)

    sankey.nodes(graph.nodes)
        .links(graph.links)

    // Create Nodes
    const _nodes = svg.append("g")
        .selectAll("rect")
        .data(graph.nodes)
        .enter()
        .append("rect")
        .attr("class", "node")
        .attr("x", function (d) { return d.x0; })
        .attr("y", function (d) { return d.y0; })
        .attr("height", function (d) { return Math.max(d.y1 - d.y0, 1); })
        .attr("width", sankey.nodeWidth())
        .on("click", (event, d) => update_nodes(d))
        .on("dblclick", (event,d) => update_nodes())

    // Create Links
    const _links = svg.append("g")
        .selectAll("path")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3_sankey.sankeyLinkHorizontal())
        .attr("stroke-width", function (d) { return d.width; });

    function update_nodes(d) {
        console.log("updating nodes")

        // filter the data
        var test_graph = (d != null) ? filter_graph(d) : reset();
        //rejoin node data

        _nodes.data(test_graph.nodes)
            .attr("class", "node")
            .transition()
            .duration(500)
            .attr("x", function (d) { return d.x0; })
            .attr("y", function (d) { return d.y0; })
            .attr("height", function (d) { return Math.max(d.y1 - d.y0, 1); })
            .attr("width", sankey.nodeWidth())

        // rejoin link data
        _links.data(test_graph.links)
            .attr("class", "link")
            .transition()
            .duration(500)
            .attr("d", d3_sankey.sankeyLinkHorizontal())
            .attr("stroke-width", function (d) { return d.width; });

        _nodes.data(test_graph.nodes)
            .exit().remove()

        _links.data(test_graph.links)
            .exit().remove()

    }

    function reset(){
        document.location.reload()
    }

    function filter_graph(d = null) {
        var saved_nodes = family_diagram[d.name];
        saved_nodes.push(d.name);

        var new_data = { "nodes": [], "links": []};

        // functions to generate new data
        var node_generate = (id, name) => { return { "node": id, "name": name } };
        var link_generate = (source, target) => { return { "source": source, "target": target, "value": 1 } };

        // filter nodes 
        // we also need to reset their IDs
        var id_link = {};
        let new_id = 0;
        for (var i = 0; i < master_data.nodes.length; i++) {
            var node_name = master_data.nodes[i].name;
            if (saved_nodes.includes(node_name)) {
                id_link[node_name] = new_id;
                new_id++;
                // node is included in our known list
                new_data.nodes.push(node_generate(new_id, node_name));
            }
        }

        // filter the links
        for (var i = 0; i < master_data.links.length; i++) {
            var source_name = master_data.links[i].source.name;
            var target_name = master_data.links[i].target.name;
            if (saved_nodes.includes(source_name) & saved_nodes.includes(target_name)) {
                // link includes both a source and target
                new_data.links.push(link_generate(id_link[source_name], id_link[target_name]));
            }
        }

        // Create sankey
        var new_sankey = d3_sankey.sankey().nodeWidth(20).nodePadding(2).size([element.width, element.height]);

        // Load in the sankey data
        var new_graph = new_sankey(new_data)
        new_sankey.nodes(new_graph.nodes).links(new_graph.links)

        return new_graph
    }
})