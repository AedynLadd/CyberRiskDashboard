var d3 = require("d3")

url = "../../Data/trainingsDone.csv"

d3.csv(url).then(function (data) {

    var svg = d3.select("#Bar1Detect")
        .attr("id", "bar1_svg")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(30,20)")

    var element = document.getElementById("bar1_svg").getBoundingClientRect();
    console.log(element.width)
    console.log(element.height)
    element.width = element.width * 0.95
    element.height = element.height * 0.85

    // Reformat our data to be better suited for a line graph
    restructured_data = restructure(data, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

    // BUILDING THE AXIS
    // Build X scales and axis:
    const x = d3.scaleBand()
        .range([0, element.width])
        .domain(["1", "2", "3", "4", "5", "6", "7", "8", "9"])
        .padding(0.2);
    svg.append("g")
        .attr("transform", `translate(0, 200)`)
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end")

    // Build Y scales and axis:
    const y = d3.scaleLinear()
        .range([element.height, 0])
        .domain([0, 30])
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(restructured_data)
        .join("rect")
        .attr("x", d => x(d.NumTrainings))
        .attr("y", d => y(d.NumPeople))
        .attr("width", x.bandwidth())
        .attr("height", d => element.height - y(d.NumPeople))
        .attr("fill", "#69b3a2")
    
})

function restructure(data, numTrainings) {
    var list = [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [8, 0],
        [9, 0],
    ];

    (data).forEach(element => {
        if(parseInt(element.NumberofTrainings) == 1) {
            list[0][1]+= 1;
        } else if (parseInt(element.NumberofTrainings) == 2){
            list[1][1]+= 1;
        } else if (parseInt(element.NumberofTrainings) == 3){
            list[2][1]+= 1;
        } else if (parseInt(element.NumberofTrainings) == 4){
            list[3][1]+= 1;
        } else if (parseInt(element.NumberofTrainings) == 5){
            list[4][1]+= 1;
        } else if (parseInt(element.NumberofTrainings) == 6){
            list[5][1]+= 1;
        } else if (parseInt(element.NumberofTrainings) == 7){
            list[6][1]+= 1;
        } else if (parseInt(element.NumberofTrainings) == 8){
            list[7][1]+= 1;
        } else if (parseInt(element.NumberofTrainings) == 9){
            list[8][1]+= 1;
        }
    });

    var restructured_data = new Object();

    (numTrainings).forEach(group => {
        if (restructured_data[group] == undefined) {
            restructured_data[group] = 
                {
                    "NumTrainings": list[group-1][0],
                    "NumPeople": list[group-1][1]
                }
            ;
        }
    })

    return restructured_data;
}