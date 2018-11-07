import React, { Component } from 'react';
import * as d3 from "d3";

export class LinearBubbleChart extends Component {

    constructor(props){
        super(props);
    
        this.chartRef = React.createRef();

        let colourProfile = d3.schemeGreens[props.data.length + 2];
        if(props.colours === "greens")
            colourProfile = d3.schemeGreens[props.data.length + 2];
        else if(props.colours === "blues")
            colourProfile = d3.schemeBlues[props.data.length + 2];
        else if(props.colours === "yellows")
            colourProfile = d3.schemeOranges[props.data.length + 2];
        else if(props.colours === "purples")
            colourProfile = d3.schemePurples[props.data.length + 2];
        else if(props.colours === "reds")
            colourProfile = d3.schemeReds[props.data.length + 2];
        else if(props.colours === "greys")
            colourProfile = d3.schemeGreys[props.data.length + 2];
    
        this.state = {
          data: props.data,
          colourProfile: colourProfile,
          numFormat: d3.format(".3s")
        }
    }

    componentDidMount(){
        let color = this.state.colourProfile;
        
        let svg = d3.select(this.chartRef.current);
        let width = svg.style("width").replace("px", "");
    
        let textWidth = 10;
        if(width > 700){
          textWidth = 14
        }
    
        let rMax = width / (this.state.data.length * 2);
        let rMin = 0;
        
        let scaleMax = d3.max(this.state.data, function(d) { return d.value; });
    
        let scale = d3.scaleSqrt()
          .domain([0, scaleMax])
          .range([rMin,rMax]);

        let graphHeight =  scale(scaleMax) * 2 + 50;
        svg.attr("height", graphHeight);
    
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
        
        let dataLength = this.state.data.length;
        let numFormat = this.state.numFormat;
        nodes.append("text")
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("fill", function(d, i){
              if(i < (dataLength / 2))
                return "gainsboro"
              else
                return "darkslategrey";
          })
          .attr("x", 0)
          .attr("y", function(d) { return (rMax * 2) - scale(d.value)})
          .text(function(d) { return numFormat(d.value)})
          

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
        return <svg width="100%" ref={this.chartRef}></svg>
    }

}
