var d3 = require("d3");

d3.json(__dirname + "/Data/NIST_criteria.json").then(function(data) {
    var svg = d3.select("#radar_chart_vis")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "100%")

    var coordinates = []

    var draw_arc = (start_angle, end_angle, radius, color, subcategories, slice_angle, center, title) =>{ 
        // Add the inside slices
        var i = start_angle;
        sub_angle = slice_angle/Object.entries(subcategories).length;
        for (const [key, value] of Object.entries(subcategories)) {
            // use random values
            value[0] = Math.floor(Math.random() * (100 - 25 + 1) + 25)/100
            // Append the calculated point to our coordinate array
            //angle_located = i + (sub_angle / 2)

            angle_located = (i + sub_angle/2) + 36.5

            y = ((radius - 40)*value[0]) * Math.cos(angle_located * (Math.PI/180));
            x = ((radius - 40)*value[0]) * Math.sin(angle_located * (Math.PI/180));
            
            coordinates.push([x + center[0], y + center[1]])
            
            // Add an arc for the subtitle
            var subtitle_arc = d3.arc()
                            .innerRadius(radius-40)
                            .outerRadius(radius-10)
                            .startAngle(i * (Math.PI/180)) //converting from degs to radians
                            .endAngle((i + sub_angle) * (Math.PI/180)) //just radians

            hexStr = (parseInt(color,16) + 25).toString(16);
            while (hexStr.length < 6) { hexStr = '0' + hexStr; }


            svg.append("path")
                .attr("d", subtitle_arc)
                .attr("id", "Path-" + key)
                .style("fill", "#" + hexStr)
                .style("stroke", "rgb(46, 46, 46)")
                .style("stroke-width", "2px")
                .attr("transform", "translate(" + center[0] + ',' + center[1] +")");

            console.log(sub_angle)
            svg.append("text")
                .attr("dy", 20)
                .attr("x", sub_angle)
                .append("textPath")
                .attr("xlink:href", "#Path-" + key)
                .text(key.split(".")[1]);

            // Add the inside arcs for the data points
            var inner_arc = d3.arc()
                            .innerRadius(1)
                            .outerRadius(radius-40)
                            .startAngle(i * (Math.PI/180)) //converting from degs to radians
                            .endAngle((i + sub_angle) * (Math.PI/180)) //just radians

            svg.append("path")
                .attr("d", inner_arc)
                //.style("fill", "#" + color)
                .style("fill", "#00000000")
                .style("stroke", "rgb(46, 46, 46)")
                .style("stroke-width", "1px")
                .attr("transform",  "translate(" + center[0] + ',' + center[1] +")");
            
            i += sub_angle;
        }
        
        // Add the outer arc for title
        var outer_arc = d3.arc()
                    .innerRadius(radius - 10)
                    .outerRadius(radius + 20)
                    .startAngle(start_angle * (Math.PI/180)) //converting from degs to radians
                    .endAngle(end_angle * (Math.PI/180)) //just radians

        hexStr = (parseInt(color,16) + 70).toString(16);
        while (hexStr.length < 6) { hexStr = '0' + hexStr; }
        
        svg.append("path")
            .attr("id", "s" + i)
            .attr("d", outer_arc)
            .style("fill", "#" + hexStr)
            .style("stroke", "rgb(46, 46, 46)")
            .style("stroke-width", "2px")
            .attr("transform",  "translate(" + center[0] + ',' + center[1] +")")

        svg.append("text")
            .attr("dy", 20)
            .attr("x", Math.abs(start_angle-end_angle)*2)
            .append("textPath")
            .attr("xlink:href", "#s" + i)
            .text(title);
    }

    let i = 0;
    var slice_angle =360/Object.entries(data).length;
    var radius = 210;
    var center = [400, 240]

    // Slices
    for (const [key, value] of Object.entries(data)) {
        draw_arc(i, i + 72, radius, value.color, value.items, slice_angle, center, key)
        i += slice_angle
    }

    // Guides
    for (let i = 0; i < 10; i++){
        var level_arcs = d3.arc()
                        .innerRadius((radius - 40) * (i/10))
                        .outerRadius(((radius - 40) * (i/10)) + 1)
                        .startAngle(0 * (Math.PI/180)) //converting from degs to radians
                        .endAngle(360 * (Math.PI/180)) //just radians

        svg.append("path")
            .attr("d", level_arcs)
            .style("fill", "#3333334f")
            .style("stroke-width", "0px")
            .attr("transform",  "translate(" + center[0] + ',' + center[1] +")");
    }

    var hull = d3.polygonHull(coordinates);


    svg.selectAll(".area")
        .data([coordinates])
        .enter()
        .append("polygon")
        .attr("class", "chart-fill")
        .attr("points",function(d) {
            var str="";
            for(var pti=0;pti<d.length;pti++){
                str=str+d[pti][0]+","+d[pti][1]+" ";
            }
            return str;
        })
    
    svg.selectAll("circle")
        .data(coordinates)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return d[0] })
        .attr("cy", function(d) { return d[1] })
        .attr("r", 3);
    
});