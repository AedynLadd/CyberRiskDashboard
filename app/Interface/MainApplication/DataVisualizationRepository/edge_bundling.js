//create a server object to listen for data:
http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(request.url);

    console.log((request.url).substring(1))
    create_hierarchical_edge_bundle((request.url).substring(1))
    response.end();
}).listen(8001); // Server Object will listen on port 8000

// Sending a command to execute the python script
console.log("Sending data")
ipcRenderer.send('dashboard-analysis', { command: "create_edge_bundle_data", data: ["empty"] });



///////////////////////////////
// EDGE BUNDLE VISUALIZATION //
///////////////////////////////

var diameter = 900,
    radius = diameter / 2,
    innerRadius = radius - 120;

var cluster = d3.cluster()
    .size([360, innerRadius]);

var line = d3.radialLine()
    .curve(d3.curveBundle.beta(0.85))
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var heirachical_svg = d3.select("#hierarchicalEdgeBundle").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

var link = heirachical_svg.append("g").selectAll(".link"),
    node = heirachical_svg.append("g").selectAll(".node");


function create_hierarchical_edge_bundle(filename) {
    d3.json(filename).then(function(classes) {
        console.log(classes)
        var root = packageHierarchy(classes)
            .sum(function(d) { return d.size; });

        cluster(root);

        link = link
            .data(packageImports(root.leaves()))
            .enter().append("path")
            .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
            .attr("class", "edge_bundle_link")
            .attr("id", function(d) {
                console.log(d.source);
                return d.source;
            })
            .attr("d", line);

        node = node
            .data(root.leaves())
            .enter().append("text")
            .attr("class", "edge_bundle_node")
            .attr("dy", "0.31em")
            .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .text(function(d) { return d.data.name; })
            .on("mouseover", highlight_links)
            .on("mouseout", unhighlight_links);
    });

    function highlight_links(event, d) {
        console.log(d)
    }

    function unhighlight_links(event, d) {
        console.log(d)
    }
    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
        var map = {};

        function find(name, data) {
            var node = map[name],
                i;
            if (!node) {
                node = map[name] = data || { name: name, children: [] };
                if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                }
            }
            return node;
        }

        classes.forEach(function(d) {
            find(d.name, d);
        });

        return d3.hierarchy(map[""]);
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
        var map = {},
            imports = [];

        // Compute a map from name to node.
        nodes.forEach(function(d) {
            map[d.data.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function(d) {
            if (d.data.imports) d.data.imports.forEach(function(i) {
                try {
                    imports.push(map[d.data.name].path(map[i]));
                } catch (e) {
                    console.log("An error occured formatting data? for some reason?")
                }
            });
        });

        return imports;
    }
}