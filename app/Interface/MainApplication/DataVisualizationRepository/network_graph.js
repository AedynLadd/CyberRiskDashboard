var http = require('http');

//create a server object to listen for data:
http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(request.url);
    console.log("Received Something");
    console.log((request.url).substring(1))
    create_network_graph((request.url).substring(1))
    response.end();
}).listen(8000); // Server Object will listen on port 8000


// Sending a command to execute the python script
console.log("Sending data")
ipcRenderer.send('dashboard-analysis', { command: "analyze_network_data", data: ["empty"] });


////////////////////////////////
// NETWORK DATA VISUALIZATION //
////////////////////////////////

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 40 }


// append the svg object to the body of the page
var network_svg = d3.select("#networkGraph")
    .append("svg")
    .attr("position", "absolute")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr("viewBox", "0 0 {{defaultWidth}} {{defaultHeight}}")
    .append("g")
    .attr("transform",
        "translate(" + 400 + "," + 400 + ")");


function create_network_graph(filename) {
    d3.json(filename).then(function(data) {

        // Initialize the links
        const link = network_svg
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("class", "network_link")

        // Initialize the nodes
        const node = network_svg
            .selectAll("circle")
            .data(data.nodes)
            .join("circle")
            .attr("r", 10)
            .attr("class", "network_node")
            .on("click", function(d) {
                console.log(d.name)
            })

        // Add node id as a tooltip
        node.append("title")
            .text(function(d) {
                return d.name;
            });

        const simulation = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink()
                .id(function(d) { return d.id; })
                .links(data.links)
            )
            .force("charge", d3.forceManyBody().strength(-50))
            .on("end", ticked);


        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node
                .attr("cx", function(d) { return d.x + 4; })
                .attr("cy", function(d) { return d.y - 4; });
        }
    })
}

/////////////////////////////
// EDGE DATA VISUALIZATION //
/////////////////////////////