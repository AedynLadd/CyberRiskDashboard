var d3 = require("d3")

url = "../../Data/trainingsDone.csv"

d3.csv(url).then(function (data) {

    var svg = d3.select("#Bar2Detect")
        .attr("id", "bar2_svg")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(30,5)")

    var element = document.getElementById("bar2_svg").getBoundingClientRect();
    element.width = element.width * 0.85
    element.height = element.height * 0.73

    // Reformat our data to be better suited for a line graph
    var restructured_data2 = restructure2(data, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

    // BUILDING THE AXIS
    // Build X scales and axis:
    const x = d3.scaleBand()
        .range([0, element.width])
        .domain(["ES", "NI", "Kn", "Co", "Cy", "Mi", "Pr", "In", "Lu"])
        .padding(0.2);
    svg.append("g")
        .attr("transform", `translate(0, 222)`)
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end")
    
    svg.append("text")      // text label for the x axis
        .attr("x", element.width/2 - 35)
        .attr("y",  element.height + 25 )
        .style("text-anchor", "middle")
        .style("font-size","11px")
        .text("Trainings")
        .style('fill', '#CCCCCC');

    // Build Y scales and axis:
    const y = d3.scaleLinear()
        .range([element.height, 0])
        .domain([0, 70])
    svg.append("g")
        .call(d3.axisLeft(y));
    
    svg.append("text")
        .attr("x", (element.width/2))             
        .attr("y", 5)
        .attr("text-anchor", "middle")  
        .style("font-size", "11px") 
        .style("text-decoration", "underline")  
        .text("Trainings Taken vs Number of People Who Took")
        .style('fill', '#CCCCCC');

    // Bars
    svg.selectAll("mybar")
        .data(Object.values(restructured_data2))
        .join("rect")
        .attr("x", d => x(d.TrainingTypes))
        .attr("y", d => y(d.NumPeople))
        .attr("width", x.bandwidth())
        .attr("height", d => element.height - y(d.NumPeople))
        .attr("fill", "#3e08496e")
    
})

function restructure2(data, numTrainings) {
    var list = [
        ["ES", 0],
        ["NI", 0],
        ["Kn", 0],
        ["Co", 0],
        ["Cy", 0],
        ["Mi", 0],
        ["Pr", 0],
        ["In", 0],
        ["Lu", 0],
    ];

    (data).forEach(element => {
        if(element.Trainings.indexOf("ESET") !== -1) {
            list[0][1]+= 1;
        } 
        if (element.Trainings.indexOf("NINJIO") !== -1) {
            list[1][1]+= 1;
        }
        if (element.Trainings.indexOf("KnowBe4") !== -1){
            list[2][1]+= 1;
        }
        if (element.Trainings.indexOf("Cofense") !== -1){
            list[3][1]+= 1;
        }
        if (element.Trainings.indexOf("Cybsafe") !== -1){
            list[4][1]+= 1;
        }
        if (element.Trainings.indexOf("Mimecast") !== -1){
            list[5][1]+= 1;
        }
        if (element.Trainings.indexOf("Proofpoint") !== -1){
            list[6][1]+= 1;
        }
        if (element.Trainings.indexOf("Infosec IQ") !== -1){
            list[7][1]+= 1;
        }
        if (element.Trainings.indexOf("Lucy") !== -1){
            list[8][1]+= 1;
        }
    });

    var restructured_data2 = new Object();

    (numTrainings).forEach(group => {
        if (restructured_data2[group] == undefined) {
            restructured_data2[group] = 
                {
                    "TrainingTypes": list[group-1][0],
                    "NumPeople": list[group-1][1]
                }
            ;
        }
    })

    return restructured_data2;
}