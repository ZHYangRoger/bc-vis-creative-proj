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

    const line = d3
    .line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.PctBeef/100));

    console.log(line);
    
  const path = svg.append('path')
    .datum(ori_data)
    .attr('fill','transparent')
    .attr('stroke','navy')
    .attr('stroke-width',3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr('opacity',.62)
    .attr('d',line);
  
  const pathLength = path.node().getTotalLength();
// D3 provides lots of transition options, have a play around here:
// https://github.com/d3/d3-transition
const transitionPath = d3
  .transition()
  .ease(d3.easeSin)
  .duration(2500);

  path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)
  .transition(transitionPath)
  .attr("stroke-dashoffset", 0);
}

main();