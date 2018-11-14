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

    stackedMax(stackedData){
        let maxPerSeries = stackedData.map(function(arr){
            return arr.map(function(subarr){
                return subarr[1];
            });
        }).reduce((accumulator, currentValue, currentIndex, array) => {
            return accumulator.concat(currentValue);
        }, []);

        return Math.max(...maxPerSeries);
    }

    componentDidMount(){
        let svg = d3.select(this.chartRef.current);
        let width = svg.style("width").replace("px", "");
        svg.attr("height", width);

        let keys = this.state.data.years.map(d => "y_" + d);
        let stacker = d3.stack().keys( keys );
        let stackedData = stacker(this.state.data.revenue_streams);

        let max = this.stackedMax(stackedData);

        let xScale = d3.scaleBand()
            .domain(this.state.data.years)
            .rangeRound([0, width])
            .padding(0.08);

        
        let yScale = d3.scaleLinear()
            .domain([0, max])
            .rangeRound([0, width]);
        
        
        let years = this.state.data.years;
        let color = this.state.colorProfile;
        this.state.data.stackedData = stackedData;
        svg.append("g")
            .selectAll("g")
            .data(this.state.data.revenue_streams)
            .enter().append("g")
              .attr("fill", function(d, i){
                  return color[i]
            })
            .selectAll("rect")
            .data((d, i) => stackedData[i])
            .enter().append("rect")
              .attr("x", (d, i) => xScale(years[i]))
              .attr("y", d => {
                  console.log(d[1]);
                  console.log(yScale(d[1]));
                  yScale(d[1]);
              })
              .attr("height", d => yScale(d[0]) - yScale(d[1]))
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

