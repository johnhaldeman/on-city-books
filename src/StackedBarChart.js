import React, { Component } from 'react';
import * as d3 from "d3";

export class StackedBarChart extends Component {

    constructor(props){
        super(props);
        this.chartRef = React.createRef();


        this.state = {
            data: props.data,
            years: props.years
        }

    }

    componentDidMount(){

        let numSeries = this.state.data[0].revenue_streams.length + 1;
        let colorProfiles = [
            d3.schemeBlues[numSeries + 1],
            d3.schemeOranges[numSeries + 1],
            d3.schemeGreens[numSeries + 1],
            d3.schemeReds[numSeries + 1],
            d3.schemePurples[numSeries + 1],
            d3.schemeGreys[numSeries + 1]
        ];

        let svg = d3.select(this.chartRef.current);
        let width = svg.style("width").replace("px", "");
        svg.attr("height", width / 2);


        let stacker = d3.stack().keys(["prop_taxes", "grants", "user_fees", "other"]);

        let alltotals = [];
        
        for(let i in this.state.data){
            let totals = this.state.data[i].year_data.map(function(d){
                return d.total;
            })
            alltotals = alltotals.concat(totals);
        }
        let max = d3.max(alltotals);

        let stacks = [];
        for(let i in this.state.data){
            let stackArr = stacker(this.state.data[i].year_data);
            stacks.push(stackArr);
        }

        let xDomain = [];
        for (let i in this.state.years){
            for(let j in this.state.data){
                xDomain.push(this.state.years[i] + "_" + j);
            }
        }

        let xScale = d3.scaleBand()
            .domain(xDomain)
            .rangeRound([0, width])
            .padding(0.08);

        
        let yScale = d3.scaleLinear()
            .domain([0, max])
            .range([width / 2, 0]);
        
        
        let years = this.state.years;
        let colors = colorProfiles;

        for(let stacknum in stacks){
            svg.append("g")
               .selectAll("g")
               .data(stacks[stacknum])
               .enter().append("g")
               .attr("fill", function(d, i){
                   return colors[stacknum][colors[0].length  - (i + 1)]
               })
               .selectAll("rect")
               .data(d => d)
               .enter().append("rect")
               .attr("x", (d, i) => {
                   return xScale(years[i] + "_" + stacknum)
               })
               .attr("y", d => {
                   return yScale(d[1]);
               })
               .attr("height", d => {
                   return yScale(d[0]) - yScale(d[1]);
               })
               .attr("width", xScale.bandwidth());
        }
        
        
        // svg.append("g")
        //      .call(xAxis);
        
        //svg.append("g")
        //      .call(yAxis);
        
        //svg.append("g")
        //    .attr("transform", `translate(${width - margin.right},${margin.top})`)
        //    .call(legend);

        
    }

    render(){        
        return <svg width="100%" ref={this.chartRef}></svg>
    }

}

