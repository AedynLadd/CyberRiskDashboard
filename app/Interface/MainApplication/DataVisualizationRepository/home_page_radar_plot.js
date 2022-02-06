var d3 = require("d3");

d3.json(__dirname + "/Data/NIST_criteria.json").then(function (data) {
    var svg = d3.select("#radar_chart_vis")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")

    var coordinates = []

    // Draw arcs
    var draw_arc = (start_angle, end_angle, radius, color, subcategories, slice_angle, center, title) => {
        // Add the inside slices
        var i = start_angle;
        sub_angle = slice_angle / Object.entries(subcategories).length;


        var outer_arc = d3.arc()
            .innerRadius(radius - 10)
            .outerRadius(radius + 20)
            .startAngle(start_angle * (Math.PI / 180)) //converting from degs to radians
            .endAngle(end_angle * (Math.PI / 180)) //just radians

        hexStr = (parseInt(color, 16) + 70).toString(16);
        while (hexStr.length < 6) { hexStr = '0' + hexStr; }


        // MAIN CATEGORY
        svg.append("path")
            .attr("id", "s" + i)
            .attr("d", outer_arc)
            .style("fill", "#" + hexStr)
            .style("stroke", "rgb(46, 46, 46)")
            .style("stroke-width", "2px")
            .attr("transform", "translate(" + center[0] + ',' + center[1] + ")");

        svg.append("text")
            .attr("dy", 20)
            .attr("x", Math.abs(start_angle - end_angle) * 2)
            .append("textPath")
            .attr("xlink:href", "#s" + i)
            .text(title);

        // For each category subcategory
        for (const [key, value] of Object.entries(subcategories)) {
            // use random values
            //value[0] = Math.floor(Math.random() * (100 - 25 + 1) + 25) / 100
            // Append the calculated point to our coordinate array
            //angle_located = i + (sub_angle / 2)

            angle_located = (i + sub_angle / 2) + 36.5

            y = ((radius - 40) * value[0]) * Math.cos(angle_located * (Math.PI / 180));
            x = ((radius - 40) * value[0]) * Math.sin(angle_located * (Math.PI / 180));

            coordinates.push([x + center[0], y + center[1]])

            // Add an arc for the subtitle
            var subtitle_arc = d3.arc()
                .innerRadius(radius - 40)
                .outerRadius(radius - 10)
                .startAngle(i * (Math.PI / 180)) //converting from degs to radians
                .endAngle((i + sub_angle) * (Math.PI / 180)) //just radians

            hexStr = (parseInt(color, 16) + 25).toString(16);
            while (hexStr.length < 6) { hexStr = '0' + hexStr; }

            // SUBTITLES
            svg.append("path")
                .attr("d", subtitle_arc)
                .attr("id", "Path-" + key)
                .style("fill", "#" + hexStr)
                .style("stroke", "rgb(46, 46, 46)")
                .style("stroke-width", "2px")
                .attr("transform", "translate(" + center[0] + ',' + center[1] + ")");

            svg.append("text")
                .attr("dy", 20)
                .attr("x", sub_angle)
                .append("textPath")
                .attr("xlink:href", "#Path-" + key)
                .text(key.split(".")[1]);

            // INSIDE ARC WITH DATA
            var inner_arc = d3.arc()
                .innerRadius(1)
                .outerRadius(radius - 40)
                .startAngle(i * (Math.PI / 180)) //converting from degs to radians
                .endAngle((i + sub_angle) * (Math.PI / 180)) //just radians

            svg.append("path")
                .attr("d", inner_arc)
                //.style("fill", "#" + color)
                .style("fill", "#00000000")
                .style("stroke", "rgb(46, 46, 46)")
                .style("stroke-width", "1px")
                .attr("transform", "translate(" + center[0] + ',' + center[1] + ")");

            i += sub_angle;
        }

        // Wheel segment
        var wheel = d3.arc()
            .innerRadius(1)
            .outerRadius(radius + 20)
            .startAngle(start_angle * (Math.PI / 180)) //converting from degs to radians
            .endAngle(end_angle * (Math.PI / 180)) //just radians

        svg.append("path")
            .attr("class", "radar_wheel")
            .attr("id", title)
            .attr("d", wheel)
            .style("fill", "rgba(0, 0, 0, 0)")
            .style("stroke", "rgba(0, 0, 0, 0.65)")
            .style("stroke-width", "0px")
            .attr("transform", "translate(" + center[0] + ',' + center[1] + ")")
            .on("click", function (event, d) {
                var current_state = d3.select(this).style("stroke-width")
                d3.selectAll(".radar_wheel").style("stroke-width", "0px");
                console.log(d3.select(this).style("stroke-width"))
                d3.select(this).style("stroke-width", (current_state == "0px") ? "3px" : "0px");
                update_right_radar((d3.select(this).style("stroke-width") == "0px") ? null : d3.select(this).attr("id"), data);
            });


    }

    let i = 0;
    var slice_angle = 360 / Object.entries(data).length;
    var radius = 200;
    var center = [350, 240]

    // Slices
    for (const [key, value] of Object.entries(data)) {
        draw_arc(i, i + 72, radius, value.color, value.items, slice_angle, center, key)
        i += slice_angle
    }

    // Guides
    for (let i = 0; i < 10; i++) {
        var level_arcs = d3.arc()
            .innerRadius((radius - 40) * (i / 10))
            .outerRadius(((radius - 40) * (i / 10)) + 1)
            .startAngle(0 * (Math.PI / 180)) //converting from degs to radians
            .endAngle(360 * (Math.PI / 180)) //just radians

        svg.append("path")
            .attr("d", level_arcs)
            .style("fill", "#3333334f")
            .style("stroke-width", "0px")
            .attr("transform", "translate(" + center[0] + ',' + center[1] + ")");
    }

    d3.polygonHull(coordinates);

    svg.selectAll(".area")
        .data([coordinates])
        .enter()
        .append("polygon")
        .attr("points", function (d) {
            var str = "";
            for (var pti = 0; pti < d.length; pti++) {
                str = str + center[0] + "," + center[1] + " ";
            }
            return str;
        })
        .attr("class", "chart-fill")
        .transition()
        .duration(300)
        .attr("points", function (d) {
            var str = "";
            for (var pti = 0; pti < d.length; pti++) {
                str = str + d[pti][0] + "," + d[pti][1] + " ";
            }
            return str;
        })

    svg.selectAll("circle")
        .data(coordinates)
        .enter()
        .append("circle")
        .attr("cx", center[0])
        .attr("cy", center[1])
        .transition()
        .duration(300)
        .attr("cx", function (d) { return d[0] })
        .attr("cy", function (d) { return d[1] })
        .attr("r", 3);

    update_right_radar(null, data)

});


//
// UPDATES TO THE RADAR INFO
//
// Update the right radar element category overview data...
function update_right_radar(element_id = null, data) {
    relevant_data = (element_id != null) ? data[element_id] : data;
    console.log(relevant_data)
    document.getElementById("total_score_title").innerHTML = (element_id != null) ? element_id : "Overall";


    const create_score_card = (title, score) => {
        return ['<div>',
                    '<div class="score_card_title">', title, '</div>',
                    '<div class="score_card_subtitle">', score, '</div>',
                '</div>'].join("")
    }

    document.getElementById("score_elements").innerHTML = null;
    let overall_score = 0
    if(element_id == null){
        // Prepare Overall Data Panel
        Object.keys(relevant_data).forEach((function_key) => {
            // Score of this function
            let function_score = 0;
            Object.keys(relevant_data[function_key]["items"]).forEach((category_key) => { function_score += (relevant_data[function_key]["items"][category_key][0]) * 100})  
            overall_score += function_score;
            document.getElementById("score_elements").innerHTML += create_score_card(function_key, function_score)
        })

    } else {
        Object.keys(relevant_data["items"]).forEach((category_key) => {
            let category_score = Math.round(relevant_data["items"][category_key][0] * 100);
            overall_score += category_score
            // Prepare Specified Data Panel 
            document.getElementById("score_elements").innerHTML += create_score_card(category_key, category_score)
        })
    }
    document.getElementById("cyber_risk_score").innerHTML = overall_score;
}