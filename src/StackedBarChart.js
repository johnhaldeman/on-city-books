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
            stackArr.city = this.state.data[i].city;
            stacks.push(stackArr);
        }

        let xGroups = [];
        for(let i in this.state.data){
            xGroups.push(this.state.data[i].city);
        }
        
        let xGroupScale = d3.scaleBand()
            .domain(xGroups)
            .rangeRound([0, width])
            .padding(0.08);

        let xScale = d3.scaleBand()
            .domain(this.state.years).rangeRound([0, xGroupScale.bandwidth()]);

        
        let yScale = d3.scaleLinear()
            .domain([0, max])
            .range([width / 2 - 20, 0]);
        
        
        let years = this.state.years;
        let colors = colorProfiles;
        let currParentIndex = 0;

        //for(let stacknum in stacks){
            svg.append("g")
               .selectAll("g")
               .data(stacks)
               .enter().append("g")
                  .attr("transform", function(d, i) {
                      return "translate(" + xGroupScale(d.city) + ",0)"; 
                   })
                .selectAll("g")
                .data(d => d)
                .enter().append("g")
                .attr("fill", function(d, i){
                    let colour = colors[currParentIndex][colors[0].length  - (i + 1)]
                    
                    if( i === colors[0].length - 3){
                        currParentIndex++;
                    }
                    
                    return colour;
                })
               .selectAll("rect")
               .data(d => d).enter()
               .append("rect")
               .attr("x", (d, i) => {
                   return xScale(years[i])
               })
               .attr("y", d => {
                   return yScale(d[1]);
               })
               .attr("height", d => {
                   return yScale(d[0]) - yScale(d[1]);
               })
               .attr("width", xScale.bandwidth());
        //}
        
        let xAxisScale = d3.scaleBand()
            .domain(xGroups)
            .rangeRound([0, width])
            .padding(0.08);
        
        svg.append("g")
            .attr("transform", `translate(0,${width / 2 - 20})`)
            .call(d3.axisBottom(xAxisScale).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove());
        
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

