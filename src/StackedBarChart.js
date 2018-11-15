import React, { Component } from 'react';
import * as d3 from "d3";

export class StackedBarChart extends Component {

    constructor(props){
        super(props);
        this.chartRef = React.createRef();

        let colorProfile = d3.schemeGreens[props.data.revenue_streams.length + 1];

        this.state = {
            data: props.data,
            colorProfile: colorProfile
        }

    }

    componentDidMount(){
        let svg = d3.select(this.chartRef.current);
        let width = svg.style("width").replace("px", "");
        svg.attr("height", width);


        let stacker = d3.stack().keys(["prop_taxes", "grants", "user_fees", "other"]);

        let totals = this.state.data.year_data.map(function(d){
            return d.total;
        })
        let max = d3.max(totals);

        let stackedData = stacker(this.state.data.year_data);

        let xScale = d3.scaleBand()
            .domain(this.state.data.years)
            .rangeRound([0, width])
            .padding(0.08);

        
        let yScale = d3.scaleLinear()
            .domain([0, max])
            .rangeRound([0, width]);
        
        
        let years = this.state.data.years;
        let color = this.state.colorProfile;
        svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .enter().append("g")
              .attr("fill", function(d, i){
                  return color[i]
            })
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
              .attr("x", (d, i) => xScale(years[i]))
              .attr("y", d => {
                  return yScale(d[0]);
              })
              .attr("height", d => {
                  return yScale(d[1]) - yScale(d[0]);
              })
              .attr("width", xScale.bandwidth());
        
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

