const { groups } = require("d3");
var d3 = require("d3");

d3.json(__dirname + "/Data/NIST_criteria.json").then(function (data) {
    const new_data = reformat_data(data);

    var dimensions = document.getElementById("stackedAreaChart").getBoundingClientRect();

    const stacked_svg = d3.select("#stackedAreaChart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")

    // Stack the data: each group will be represented on top of each other
    const stack = d3.stack()
        .keys(new_data.groups)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    const series = stack(new_data.data);

    //
    const xScale = d3.scaleLinear()
        .domain([new_data.data[0].index_val, new_data.data[2].index_val])
        .range([5, 90]);

    // stacked_svg.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x).ticks(5));

    const yScale = d3.scaleLinear()
        .domain([0, 2300]) // Scores can range from 0 (lowest) to 23*100 (max of all categories)
        .range([dimensions.height, 0]);

    const colorScale = d3.scaleOrdinal()
        .domain(new_data.groups)
        .range(new_data.colors);

    const areaGen = d3.area()
        .x((d) => xScale(d.data.index_val))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));


    stacked_svg.selectAll(".StackedAreas")
        .data(series)
        .join("path")
        .attr("class", "stackedAreas")
        .attr("fill", (d) => colorScale(d.key))
        .attr("d", areaGen)
        .on("mouseout", function(event,d) { d3.select(this).attr("fill", d => colorScale(d.key))})
        .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", d => {
                hexStr = (parseInt(colorScale(d.key).slice(1), 16) + 50).toString(16);
                while (hexStr.length < 6) { hexStr = '0' + hexStr; }
                return "#" + hexStr
            });
        })
});


function reformat_data(data) {
    formatted_data = []
    NISTgroups = []
    NISTcolors = []
    Object.keys(data).forEach((function_key) => {
        NISTgroups.push(function_key);
        NISTcolors.push("#" + data[function_key]["color"]);
        // for each function key
        Object.keys(data[function_key]["items"]).forEach((category_key) => {
            // for each category
            for (index_value in data[function_key]["items"][category_key]) {
                // for each subcategory we have indices that represent 
                if (formatted_data[index_value] == undefined) formatted_data[index_value] = { "index_val": index_value };
                if (formatted_data[index_value][function_key] == undefined) formatted_data[index_value][function_key] = data[function_key]["items"][category_key][index_value] * 100;
                else formatted_data[index_value][function_key] += data[function_key]["items"][category_key][index_value] * 100;
            }
        })
    })

    return { "data": formatted_data, "groups": NISTgroups, "colors": NISTcolors };
}