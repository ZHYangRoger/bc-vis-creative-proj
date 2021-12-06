let ori_data;

async function loadData(url) {
    let data = await d3.csv(url, d3.autoType);
    return data;
}

async function main() {
    //init
    const url = "projdata.csv";
    ori_data = await loadData(url);

    console.log(ori_data);

    var margin = { top: 20, right: 10, bottom: 20, left: 45 };
    const width = 660 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;


    var marginr = { top: 20, right: 0, bottom: 20, left: 0 };
    const widthr = 710 - margin.left - margin.right;
    const heightr = 400 - margin.top - margin.bottom;

    const svg = d3.select(".closerChart")
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const svgrect = d3.select(".rects").append("svg").attr('width', widthr + marginr.left + marginr.right)
        .attr('height', heightr + marginr.top + marginr.bottom)
        .append("g")
        .attr("transform", "translate(" + marginr.left + "," + marginr.top + ")");

    // let g = svgrect.selectAll(".rect")
    //     .data([10, 60, 120])
    //     .enter()
    //     .append("g")
    //     .classed('rect', true)

    let rr;

    svgrect.append("text")
        // .attr("width", 900)
        // .attr("height", 80)
        .attr("x", 0)
        .attr("y", 20)
        // .attr("dx","50")
        // .attr("dy", "50")
        // .attr("fill",  "lightgrey")
        // .attr("opacity", "0.8")
        .on("mouseover", function () { placeRect("gas", 1) })
        .on("mouseout", function () {
            rr.remove().exit()
        })
        .text(d => getText1("g", 1))
        .attr("font-size", "13px");

    svgrect.append("text")
        // .attr("width", 900)
        // .attr("height", 80)
        .attr("x", 0)
        .attr("y", 40)
        // .attr("dx","50")
        // .attr("dy", "50")
        // .attr("fill",  "lightgrey")
        // .attr("opacity", "0.8")
        .on("mouseover", function () { placeRect("gas", 1) })
        .on("mouseout", function () {
            rr.remove().exit()
        })
        .text(d => getText2("g", 1))
        .attr("font-size", "13px");

    svgrect.append("text")
        // .attr("width", 900)
        // .attr("height", 80)
        .attr("x", 0)
        .attr("y", 90)
        // .attr("dx","50")
        // .attr("dy", "50")
        // .attr("fill",  "lightgrey")
        // .attr("opacity", "0.8")
        .on("mouseover", function () { placeRect("gas", 2) })
        .on("mouseout", function () {
            rr.remove().exit()
        })
        .text(d => getText1("g", 2))
        .attr("font-size", "13px");

    svgrect.append("text")
        // .attr("width", 900)
        // .attr("height", 80)
        .attr("x", 0)
        .attr("y", 110)
        // .attr("dx","50")
        // .attr("dy", "50")
        // .attr("fill",  "lightgrey")
        // .attr("opacity", "0.8")
        .on("mouseover", function () { placeRect("gas", 2) })
        .on("mouseout", function () {
            rr.remove().exit()
        })
        .text(d => getText2("g", 2))
        .attr("font-size", "13px");

    svgrect.append("text")
        // .attr("width", 900)
        // .attr("height", 80)
        .attr("x", 0)
        .attr("y", 160)
        // .attr("dx","50")
        // .attr("dy", "50")
        // .attr("fill",  "lightgrey")
        // .attr("opacity", "0.8")
        .on("mouseover", function () { placeRect("gas", 3) })
        .on("mouseout", function () {
            rr.remove().exit()
        })
        .text(d => getText1("g", 3))
        .attr("font-size", "13px");

    svgrect.append("text")
        // .attr("width", 900)
        // .attr("height", 80)
        .attr("x", 0)
        .attr("y", 180)
        // .attr("dx","50")
        // .attr("dy", "50")
        // .attr("fill",  "lightgrey")
        // .attr("opacity", "0.8")
        .on("mouseover", function () { placeRect("gas", 3) })
        .on("mouseout", function () {
            rr.remove().exit()
        })
        .text(d => getText2("g", 3))
        .attr("font-size", "13px");

    svgrect.append("text")
        // .attr("width", 900)
        // .attr("height", 80)
        .attr("x", 0)
        .attr("y", 220)
        // .attr("dx","50")
        // .attr("dy", "50")
        // .attr("fill",  "lightgrey")
        // .attr("opacity", "0.8")
        .on("mouseover", function () { placeRect("gas", 4) })
        .on("mouseout", function () {
            rr.remove().exit()
        })
        .text(d => getText1("g", 4))
        .attr("font-size", "13px");

    svgrect.append("text")
        // .attr("width", 900)
        // .attr("height", 80)
        .attr("x", 0)
        .attr("y", 240)
        // .attr("dx","50")
        // .attr("dy", "50")
        // .attr("fill",  "lightgrey")
        // .attr("opacity", "0.8")
        .on("mouseover", function () { placeRect("gas", 4) })
        .on("mouseout", function () {
            rr.remove().exit()
        })
        .text(d => getText2("g", 4))
        .attr("font-size", "13px");


    const beef = [];
    const pork = [];
    const gas = [];
    const home = [];

    ori_data.forEach(a => beef.push(a.Beef / 100));
    ori_data.forEach(a => pork.push(a.Pork / 100));
    ori_data.forEach(a => gas.push(a.Gas / 100));
    ori_data.forEach(a => home.push(a.Home / 100));

    console.log(beef);

    const m = ori_data.map(d => { return d.Date; });
    const xScale = d3.scaleTime()
        .domain(d3.extent(m))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([-0.02, .14])
        .range([height, 0]);

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
        .y(d => yScale(d.PctGas / 100));

    //console.log(line);

    let path = svg.append('path')
        .datum(ori_data)
        .attr('fill', 'transparent')
        .attr('stroke', 'rgb(27, 114, 212)')
        .attr('stroke-width', 3)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr('opacity', .62)
        .attr('d', line);

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
    document.getElementById('group-by').onchange = function () {
        type = document.querySelector("option:checked").value;
        console.log(type);
        update(ori_data, type, transitionPath, pathLength, path);
    };




    function update(ori_data, type, transitionPath, pathLength, path) {

        d3.selectAll("text").remove().exit();

        switch (type) {
            case "beef":
                line = d3.line()
                    .x(d => xScale(d.Date))
                    .y(d => yScale(d.PctBeef / 100));
                renderTextPart("beef");
                break;
            case "pork":
                line = d3.line()
                    .x(d => xScale(d.Date))
                    .y(d => yScale(d.PctPork / 100));
                renderTextPart("pork");
                break;
            case "gas":
                line = d3.line()
                    .x(d => xScale(d.Date))
                    .y(d => yScale(d.PctGas / 100));
                renderTextPart("gas");
                break;
            case "home":
                line = d3.line()
                    .x(d => xScale(d.Date))
                    .y(d => yScale(d.PctHome / 100));
                renderTextPart("home");
                break;
        }

        //console.log(line);

        d3.selectAll("path").remove();


        let xxAxis = d3.axisBottom().ticks(17)
            .scale(xScale);

        let yyAxis = d3.axisLeft().ticks(17).scale(yScale).tickFormat(d3.format(".0%"));

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
            .attr('fill', 'transparent')
            .attr('stroke', 'rgb(27, 114, 212)')
            .attr('stroke-width', 3)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr('opacity', .62)
            .attr('d', line)
            .attr("stroke-dashoffset", pLength)
            .attr("stroke-dasharray", pLength)
            .transition(getTransition())
            .attr("stroke-dashoffset", 0);


        //TEXT UPDATE




    }

    function getTransition() {
        return d3.transition()
            .duration(2500)
            .ease(d3.easeSin)
    }

    function placeRect(itsType, num) {

        let ww;
        const hh = height - 20;
        let lx;
        const ly = 20;
        //let textt;

        switch (itsType) {
            case "gas":
                switch (num) {
                    case 1:
                        ww = 48;
                        lx = 400;
                        break;
                    case 2:
                        ww = 15;
                        lx = 440;
                        break;
                    case 3:
                        ww = 27;
                        lx = 510;
                        break;
                    case 4:
                        ww = 18;
                        lx = 590;
                }
                break;
            case "beef":
                switch (num) {
                    case 1:
                        ww = 24;
                        lx = 370;
                        break;
                    case 2:
                        ww = 7;
                        lx = 589;
                        break;
                    case 3:
                        ww = 18;
                        lx = 590;
                }
                break;
            case "pork":
                switch (num) {
                    case 1:
                        ww = 60;
                        lx = 460;
                        break;
                    case 2:
                        ww = 18;
                        lx = 590;
                }
                break;
            case "home":
                switch (num) {
                    case 1:
                        ww = 71;
                        lx = 420;
                        break;
                    case 2:
                        ww = 140;
                        lx = 485;
                }
        }


        //console.log("here");

        placeIt(ww, hh, lx, ly);

    }

    function placeIt(ww, hh, lx, ly) {

        //console.log("here,it");

        rr = svg.append('rect')
            .attr("width", ww)
            .attr("height", hh)
            .attr("x", lx)
            .attr("y", ly)
            .attr("fill", "grey")
            .attr("opacity", "0.45");

    }

    function getText1(PType, numm) {

        let returnText1;


        switch (PType) {
            case "g":
                if (numm == 1) {
                    returnText1 = "2002 - 2008: 2000s energy crisis. Transportation consumes the largest proportion of energy."
                }
                else if (numm == 2) {
                    returnText1 = "2008 - 2009: gas price drop. The Great Recession caused demand for energy to shrink in late 2008, "
                }
                else if (numm == 3) {
                    returnText1 = "2014 - 2016: oil gas plunge. The fundamental reason for the decline in world petroleum prices in "
                }
                else if (numm == 4) {
                    returnText1 = "2020 - present: oil gas rising back up due to COVID. Lockdowns -> companies shifted to remote work, demand for "
                }
                break;
            case "p":
                if (numm == 1) {
                    returnText1 = "2010 - 2015 increase: There was a reduction in pig herds during the recession paired with the combination of "
                }
                else if (numm == 2) {
                    returnText1 = "2020 - present increase: A current “meatflation” that is a result of labor shortages, a disruption in the "
                }
                break;
            case "b":
                if (numm == 1) {
                    returnText1 = "2002 - 2004 increase: One case of “mad cow disease” in Canada resulted in 35 countries,"
                }
                else if (numm == 2) {
                    returnText1 = "2019 - 2020 decrease: Worsening drought conditions in the western U.S. have resulted in cattle "
                }
                else if (numm == 3) {
                    returnText1 = "2020 - present increase: The emergence of COVID-19 caused a reduction in production of meat, which resulted in "
                }
                break;
            case "h":
                if (numm == 1) {
                    returnText1 = "2006 - 2012 decrease: marks the popping of the U.S. housing bubble. This was immediately followed by the"
                }
                else if (numm == 2) {
                    returnText1 = "2012 - present increase: A decrease in housing inventory and foreclosures and mortgage interest rates resulted"
                }
        }

        return returnText1;
    }

    function getText2(PType, numm) {
        let returnText2;
        switch (PType) {
            case "g":
                if (numm == 1) {
                    returnText2 = "This growth has largely come from new demand for cars powered by internal combustion engines. "
                }
                else if (numm == 2) {
                    returnText2 = "with oil prices collapsing from the July 2008 high of $147 to a December 2008 low of $32."
                }
                else if (numm == 3) {
                    returnText2 = "2014 was an oversupply of petroleum compared to demand."
                }
                else if (numm == 4) {
                    returnText2 = "gas decreased. Oil refiners cut their gas production. The drop in supply resulted in an increase in gas price."
                }
                break;
            case "p":
                if (numm == 1) {
                    returnText2 = "high feed prices and the swine flu that led to a general increase in pork prices."
                }
                else if (numm == 2) {
                    returnText2 = "supply chain, and a strong domestic and international demand. Alongside these is also the high feed cost."
                }
                break;
            case "b":
                if (numm == 1) {
                    returnText2 = "including the U.S., to close their imports of Canadian beef products and live cattle. "
                }
                else if (numm == 2) {
                    returnText2 = "and cows being put into the market earlier."
                }
                else if (numm == 3) {
                    returnText2 = "farmers having to cull their cattle. These reasons were paired with an imbalance in supply and demand."
                }
                break;
            case "h":
                if (numm == 1) {
                    returnText2 = "subprime mortgage crisis where there was an excess inventory of homes near the end of this period."
                }
                else if (numm == 2) {
                    returnText2 = "in an increase in demand from investors. This imbalance in supply and demand for homes continues today."
                }
        }
        return returnText2;
    }

    function renderTextPart(theType) {
        switch (theType) {
            case "gas":
                //console.log("heregas")
                renderGas();
                break;
            case "beef":
                renderBeef();
                break;
            case "pork":
                renderPork();
                break;
            case "home":
                renderHome();
                break;
        }
    }

    function renderGas() {
        //console.log(svgrect);

        console.log("fasadasfas")

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 20)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("gas", 1) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("g", 1))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 40)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("gas", 1) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("g", 1))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 90)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("gas", 2) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("g", 2))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 110)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("gas", 2) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("g", 2))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 160)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("gas", 3) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("g", 3))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 180)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("gas", 3) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("g", 3))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 220)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("gas", 4) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("g", 4))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 240)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("gas", 4) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("g", 4))
            .attr("font-size", "13px");

        console.log("bbbbbbb")

    }

    function renderPork() {
        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 20)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("pork", 1) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("p", 1))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 40)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("pork", 1) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("p", 1))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 90)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("pork", 2) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("p", 2))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 110)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("pork", 2) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("p", 2))
            .attr("font-size", "13px");
    }

    function renderBeef() {
        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 20)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("beef", 1) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("b", 1))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 40)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("beef", 1) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("b", 1))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 90)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("beef", 2) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("b", 2))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 110)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("beef", 2) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("b", 2))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 160)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("beef", 3) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("b", 3))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 180)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("beef", 3) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("b", 3))
            .attr("font-size", "13px");

    }

    function renderHome(){
        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 20)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("home", 1) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("h", 1))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 40)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("home", 1) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("h", 1))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 90)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("home", 2) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText1("h", 2))
            .attr("font-size", "13px");

        svgrect.append("text")
            // .attr("width", 900)
            // .attr("height", 80)
            .attr("x", 0)
            .attr("y", 110)
            // .attr("dx","50")
            // .attr("dy", "50")
            // .attr("fill",  "lightgrey")
            // .attr("opacity", "0.8")
            .on("mouseover", function () { placeRect("home", 2) })
            .on("mouseout", function () {
                rr.remove().exit()
            })
            .text(d => getText2("h", 2))
            .attr("font-size", "13px");

    }

}

main();