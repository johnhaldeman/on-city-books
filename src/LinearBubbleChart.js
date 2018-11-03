import React, { Component } from 'react';
import * as d3 from "d3";

export class LinearBubbleChart extends Component {

    constructor(props){
        super(props);
    
        this.chartRef = React.createRef();
    
        let graphWidth = window.innerWidth - 20;
        if(graphWidth > 1400)
          graphWidth = 1400;
        let data = props.data;
        let rMax = graphWidth / 8;
        let rMin = 0;
        let scaleMax = d3.max(data, function(d) { return d.value; });
        let scaleRadius = d3.scaleSqrt()
          .domain([0, scaleMax])
          .range([rMin,rMax]);
    
        this.state = {
          data: props.data,
          scaleRadius: scaleRadius,
          graphWidth: graphWidth,
          rMax: rMax,
          rMain: rMin,
          graphHeight: scaleRadius(scaleMax) * 2 + 50
        }
    }

    componentDidMount(){

        let color = d3.schemeGreens[this.state.data.length + 2];
        
        let svg = d3.select(this.chartRef.current);
    
        let textWidth = 10;
        if(this.state.graphWidth > 700){
          textWidth = 14
        }
    
        let scale = this.state.scaleRadius;
        let rMax = this.state.rMax;
    
        let nodes = svg.selectAll(".graph")
          .data(this.state.data)
          .enter()
          .append("g")
          .attr("transform", function(d, i) {
            let x = i * rMax * 2 + rMax;
            let y = 0;
            return "translate(" + x + "," + y + ")"; 
          });
    
        nodes.append("circle")
          .attr('r', function(d) { return scale(d.value)})
          .attr('cx', function(d,i){ return 0 })//return i * rMax * 2 + rMax })
          .attr('cy', function(d,i){ return (rMax * 2) - scale(d.value)})
          .style("fill", function(d, i) { return color[color.length - (i + 1)]})
          ;
        
          nodes.append("text")
          .attr("text-anchor", "middle")
          .selectAll("tspan")
          .data(function(d) {
            let retArr = [];
            let wordArr = d.description.split(/\s/);
            let currentString = "";
            for(let i in wordArr){
              let word = wordArr[i];
              currentString = currentString + " " + word;
              if(currentString.length > 10){
                retArr.push({text: currentString, offset: scale(d.value)});
                currentString = "";
              }
            }
            retArr.push({text: currentString, offset: scale(d.value)})
            return retArr;
          })
          .enter().append("tspan")
            .text(function(d) {return d.text})
            .attr("font-size", textWidth)
            .attr("font-family", "sans-serif")
            .attr("x", 0)
            .attr("y", function(d, i, nodes){ return (i - (nodes.length/2 - 1)) * 14 + (rMax * 2) + nodes.length * 7 } )
          ;
        
    }    

    render(){        
        return <svg width="100%" height={this.state.graphHeight + 20} ref={this.chartRef}></svg>
    }

}
