let ori_data;

async function loadData(url){
    let data = await d3.csv(url, d3.autoType);
    return data;
}

async function main(){
    //init
    const url = "projdata.csv";
    ori_data = await loadData(url);

    console.log(ori_data);

    var margin = {top: 20, right: 10, bottom: 20, left: 45};
    const width = 850 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const svg = d3.select(".closerChart")
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const svgrect = d3.select(".rects").append("svg");

    var g = svgrect.selectAll(".rect")
    .data([10,60,120])
    .enter()
    .append("g")
    .classed('rect', true)

    let rr;

    g.append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", 20)
    .attr("y", 20)
    .attr("fill",  "red")
    .on("mouseover", function(){
        rr = svg.append('rect')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 20)
            .attr("y", 20)
    })
    .on("mouseout", function(){
        rr.remove().exit()
    })

    g.append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", 120)
    .attr("y", 120)
    .attr("fill",  "blue")

    const beef = [];
    const pork = [];
    const gas = [];
    const home = [];

    ori_data.forEach(a => beef.push(a.Beef / 100));
        ori_data.forEach(a => pork.push(a.Pork / 100));
        ori_data.forEach(a => gas.push(a.Gas / 100));
        ori_data.forEach(a => home.push(a.Home / 100));

        console.log(beef);

        const m = ori_data.map(d => {return d.Date;});
        const xScale = d3.scaleTime()
                        .domain(d3.extent(m))
                        .range([0,width]);

        const yScale = d3.scaleLinear()
                        .domain([-0.02,.14])
                        .range([height,0]);

    let xAxis = d3.axisBottom().ticks(17)
	.scale(xScale);

    let yAxis = d3.axisLeft().ticks(17).scale(yScale).tickFormat(d3.format(".0%"));

            svg.append("g")
                    .attr("class", "axis x-axis")
                    .attr("transform", `translate(0, ${height})`)
                    .call(xAxis);
    
            svg.append("g")
                    .attr("class", "axis y-axis")
                    .attr("transform", `translate(0, ${width}`)
                    .call(yAxis);

    let line = d3
    .line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.PctGas/100));

    //console.log(line);
    
  let path = svg.append('path')
    .datum(ori_data)
    .attr('fill','transparent')
    .attr('stroke','rgb(27, 114, 212)')
    .attr('stroke-width',3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr('opacity',.62)
    .attr('d',line);
  
  const pathLength = path.node().getTotalLength();

const transitionPath = d3
  .transition()
  .ease(d3.easeSin)
  .duration(2500);


  path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)
  .transition(transitionPath)
  .attr("stroke-dashoffset", 0);

  let type = "beef";

  //update
  document.getElementById('group-by').onchange = function(){
    type = document.querySelector("option:checked").value;
    console.log(type);
    update(ori_data, type, transitionPath, pathLength,path);
    };

    function update(ori_data, type, transitionPath, pathLength, path){

        


    switch(type){
        case "beef":
            line = d3.line()
                .x(d => xScale(d.Date))
                .y(d => yScale(d.PctBeef/100));
            break;
        case "pork":
            line = d3.line()
                .x(d => xScale(d.Date))
                .y(d => yScale(d.PctPork/100));
            break;
        case "gas":
            line = d3.line()
                .x(d => xScale(d.Date))
                .y(d => yScale(d.PctGas/100));
            break;
        case "home":
            line = d3.line()
                .x(d => xScale(d.Date))
                .y(d => yScale(d.PctHome/100));
            break;
    }

    //console.log(line);

    d3.selectAll("path").remove();

    
    let xxAxis = d3.axisBottom().ticks(0)
	.scale(xScale);

    let yyAxis = d3.axisLeft().ticks(0).scale(yScale).tickFormat(d3.format(".0%"));

    svg.append("g")
                    .attr("class", "axis x-axis")
                    .attr("transform", `translate(0, ${height})`)
                    .call(xxAxis);
    
            svg.append("g")
                    .attr("class", "axis y-axis")
                    .attr("transform", `translate(0, ${width}`)
                    .call(yyAxis);


    
    // if (typeof ppath !== 'undefined'){
    //     ppath.remove().exit()
    // }
        
     let pLength = path.node().getTotalLength();

                path = svg.append('path')
                .datum(ori_data)
                .attr('fill','transparent')
                .attr('stroke','rgb(27, 114, 212)')
                .attr('stroke-width',3)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr('opacity',.62)
                .attr('d',line)
                 .attr("stroke-dashoffset", pLength)
         .attr("stroke-dasharray", pLength)
        .transition(getTransition())
        .attr("stroke-dashoffset", 0);
        

        //path.remove().exit();

            // let pLength = path.node().getTotalLength();

            // let tPath = d3
            // .transition()
            // .ease(d3.easeSin)
            // .duration(2500);

            // console.log(tPath);

        // path
        // .attr("stroke-dashoffset", pLength)
        // .attr("stroke-dasharray", pLength)
        // .transition(getTransition())
        // .attr("stroke-dashoffset", 0);

    }

    function getTransition() {
        return d3.transition()
          .duration(2500)
          .ease(d3.easeSin)
    }

}

main();