import React, { Component } from 'react';
import * as d3 from "d3";

export class StackedBarChart extends Component {

    constructor(props){
        super(props);
        this.chartRef = React.createRef();
        this.chartDiv = React.createRef();


    }

    getNumSeries(grouping){
        return this.props.keys.length;
    }

    getMaxData(){
        let alltotals = [];
        for(let i in this.props.data){
            let totals = this.props.data[i].year_data.map(function(d){
                return d.total;
            })
            alltotals = alltotals.concat(totals);
        }
        let max = d3.max(alltotals);
        return max;
    }

    getMinData(){
        let alltotals = [];
        for(let i in this.props.data){
            let totals = this.props.data[i].year_data.map(function(d){
                return d.total;
            })
            alltotals = alltotals.concat(totals);
        }
        let min = d3.min(alltotals);
        if(min < 0){
            return min;
        }
        else{
            return 0;
        }
    }

    getColourSchemes(numSeries){
        return [
            d3.schemeBlues[numSeries],
            d3.schemeOranges[numSeries],
            d3.schemeGreens[numSeries],
            d3.schemeReds[numSeries],
            d3.schemePurples[numSeries],
            d3.schemeGreys[numSeries]
        ];
    }

    getStacks(grouping){

        let keys = this.props.keys;
        let stacker = d3.stack().keys(keys);

        let stacks = [];
        if(grouping === "year"){
            for(let i in this.props.data){
                let stackArr = stacker(this.props.data[i].year_data);
                stackArr.name = this.props.data[i].city;
                stacks.push(stackArr);
            }
        }
        else{
            let yearGroupedData = [];
            
            for(let i in this.props.years){
                let cityDataForYear = [];
                for(let j in this.props.data){
                    let doc = {};
                    for(let k in keys){
                        doc[keys[k]] = this.props.data[j].year_data[i][keys[k]];
                    }
                    doc.city = this.props.data[j].city;
                    cityDataForYear.push(doc);
                }
                yearGroupedData.push({
                    year: this.props.years[i],
                    city_data: cityDataForYear
                })
            }

            for(let i in yearGroupedData){
                let stackArr = stacker(yearGroupedData[i].city_data);
                stackArr.name = yearGroupedData[i].year;
                stacks.push(stackArr);
            }
        }
        
        return stacks;
    }

    getxScaleDomain(grouping){
        if(grouping === "year"){
            return this.props.years;
        }
        else{
            return this.props.data.map(
                d => d.city
            )
        }
    }

    componentDidMount(){
        this.d3Render();
    }
  
    componentDidUpdate(){
        let svg = d3.select(this.chartRef.current);
        svg.selectAll("g").remove();
        this.d3Render();
    }
  

    d3Render(){
        if(this.props.data.length === 0){
            return;
        }

        let svg = d3.select(this.chartRef.current);
        let width = svg.style("width").replace("px", "");
        let height = width / 3 - 40;
        if(height < 600){
            height = 400;
        }
        svg.attr("height", height);

        let numSeries = this.getNumSeries(this.props.group);
        let max = this.getMaxData();
        let min = this.getMinData();

        let stacks = this.getStacks(this.props.group);
        for(let year of stacks){
            for(let field of year){
                for(let child of field){
                    child.field = field.key;
                    child.year = year.name;
                }
            }
        }

        let xGroups = [];
        for(let i in stacks){
            xGroups.push(stacks[i].name);
        }
        
        let xGroupScale = d3.scaleBand()
            .domain(xGroups)
            .rangeRound([35, width])
            .padding(0.04);

        let xScaleDomain = this.getxScaleDomain(this.props.group);
        let xScale = d3.scaleBand()
            .domain(xScaleDomain)
            .rangeRound([0, xGroupScale.bandwidth()])
            .padding(0.08);
        
        let yScale = d3.scaleLinear()
            .domain([min, max])
            .range([height - 80, 0]);
        if(isNaN(yScale(0))){
            return;
        }

        d3.scaleBand()
            .domain(xScale)
            .rangeRound([0, width])
            .padding(0.08);

        let xGroup = svg.append("g")
                .attr("transform", "translate(0,10)")
               .selectAll("g")
               .data(stacks)
               .enter()
               .append("g")
                .attr("class", "group")
                .attr("transform", function(d, i) {
                    return "translate(" + xGroupScale(d.name) + ",0)"; 
                });

        let numCities = this.props.data.length;
        
        let numSchemes = 3;
        if(numSeries > 2){
            numSchemes = numSeries + 1;
        }
        let colorProfiles = this.getColourSchemes(numSchemes);
        let currentSeries = 0;
        let currParentIndex = 0;
        let seriesGroup = xGroup.selectAll("g")
                .data(d => d)
                .enter().append("g")
                .attr("class", "series")
                .attr("fill", function(d, i){
                    currParentIndex = Math.floor(currentSeries / numSeries) % numCities ;
                    let colour = colorProfiles[currParentIndex][colorProfiles[0].length  - (i + 1)]
                    currentSeries++;      
                                
                    return colour;
                });

                        // create a tooltip
        let Tooltip = d3.select(this.chartDiv.current)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

        let numFormat = (d) => {                 
            if(this.props.type === "percentage"){
                return d3.format(".0%")(d);
            }
            return '$' + d3.format(',')(d); 
        };

        // Three function that change the tooltip when user hover / move / leave a cell
        let mouseover = function (d) {
            Tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }
        let mousemove = function (d, i, j, k) {
            let value = numFormat(d[1] - d[0]);
            Tooltip
                    .html(d.year + ": " + d.data.city + "<br/>" + d.field + "<br/>" + value)
                    .style("left", (d3.mouse(svg.node())[0] + 30) + "px")
                    .style("top", (d3.mouse(svg.node())[1]) + "px")
        }
        let mouseleave = function (d) {
            Tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.9)
        }


        let bandNum = 0;
        let valueGroup = seriesGroup.selectAll("rect")
               .data(d => d).enter()
               .append("rect")
               .attr("class", "value")
               .attr("x", (d, i) => {
                   return xScale(xScaleDomain[i])
               })
               .attr("y", d => {
                   if(d[1] < 0){
                    return yScale(0)
                   }
                   else{
                    return yScale(d[1]);
                   }
               })
               .attr("height", d => {
                   return Math.abs(yScale(d[0]) - yScale(d[1]));
               })
               .attr("width", xScale.bandwidth())
               .on("mouseover", mouseover)
               .on("mousemove", mousemove)
               .on("mouseleave", mouseleave);

        if(this.props.group === "city"){
            valueGroup.attr("fill", function(d, i){
                let currentBand = Math.floor(bandNum / numCities) % numSeries;
                let colorIndex = colorProfiles[0].length  - currentBand - 1;
                let color = colorProfiles[i][colorIndex];
                bandNum++;
                return color;
           })
        }
        
        let xAxisLabels = seriesGroup
            .append("g")
            .attr("transform", `translate(0,${height - 80})`);
        
        xAxisLabels.call(d3.axisBottom(xScale).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove());

        xAxisLabels.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        xGroup.append("g")
            .attr("class", "xaxis")
            .append("line")
            .attr("y1", yScale(0))
            .attr("y2", yScale(0))
            .attr("x2", width);

        if(width < 700){
            let ticks = xAxisLabels.selectAll(".tick text");
            ticks.attr("class", function(d,i){
                if(i % 3 !== 0) d3.select(this).remove();
            });
        }
        
        svg.append("g")
            .attr("transform", `translate(0, ${height - 10})`)
            .call(d3.axisBottom(xGroupScale).tickSizeInner(0))
            .call(g => g.selectAll(".domain").remove());

        let tickNum = 10;
        if(width < 600){
            tickNum = 5;
        }
        let billionDollarFormat = (d) => {                 
            if(this.props.type === "percentage"){
                return d3.format(".0%")(d);
            }
            return '$' + d3.format('.2s')(d).replace(/G/, "B"); };
        svg.append("g")
            .attr("transform", `translate(40,10)`)
            .call(d3.axisLeft(yScale).ticks(tickNum).tickFormat(billionDollarFormat))
            .call(g => g.selectAll(".domain").remove())


    }

    render(){        
        return (
        <div ref={this.chartDiv}>
            <svg width="100%" ref={this.chartRef}></svg>
        </div>)
    }

}

