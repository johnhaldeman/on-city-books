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

    getNumSeries(grouping){
        return this.state.data[0].revenue_streams.length;
    }

    getMaxData(){
        let alltotals = [];
        for(let i in this.state.data){
            let totals = this.state.data[i].year_data.map(function(d){
                return d.total;
            })
            alltotals = alltotals.concat(totals);
        }
        return d3.max(alltotals);
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

        let keys = ["prop_taxes", "grants", "user_fees", "other"];
        let stacker = d3.stack().keys(keys);

        let stacks = [];
        if(grouping === "year"){
            for(let i in this.state.data){
                let stackArr = stacker(this.state.data[i].year_data);
                stackArr.name = this.state.data[i].city;
                stacks.push(stackArr);
            }
        }
        else{
            let yearGroupedData = [];
            
            for(let i in this.state.years){
                let cityDataForYear = [];
                for(let j in this.state.data){
                    let doc = {};
                    for(let k in keys){
                        doc[keys[k]] = this.state.data[j].year_data[i][keys[k]];
                    }
                    doc.city = this.state.data[j].city;
                    cityDataForYear.push(doc);
                }
                yearGroupedData.push({
                    year: this.state.years[i],
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
            return this.state.years;
        }
        else{
            return this.state.data.map(
                d => d.city
            )
        }
    }

    componentDidMount(){
        let svg = d3.select(this.chartRef.current);
        let width = svg.style("width").replace("px", "");
        svg.attr("height", width / 2);

        let numSeries = this.getNumSeries(this.props.group);
        let max = this.getMaxData();

        let stacks = this.getStacks(this.props.group);

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
            .domain([0, max])
            .range([width / 2 - 80, 0]);
        

        d3.scaleBand()
            .domain(xScale)
            .rangeRound([0, width])
            .padding(0.08);

        let xGroup = svg.append("g")
               .selectAll("g")
               .data(stacks)
               .enter()
               .append("g")
                .attr("class", "group")
                .attr("transform", function(d, i) {
                    return "translate(" + xGroupScale(d.name) + ",0)"; 
                });

        let numCities = this.state.data.length;
        let colorProfiles = this.getColourSchemes(numSeries + 1);
        let currentSeries = 0;
        let currParentIndex = 0;
        let seriesGroup = xGroup.selectAll("g")
                .data(d => d)
                .enter().append("g")
                .attr("class", "series")
                .attr("fill", function(d, i){
                    console.log("Series" + i);
                    currParentIndex = Math.floor(currentSeries / numSeries) % numCities ;
                    let colour = colorProfiles[currParentIndex][colorProfiles[0].length  - (i + 1)]
                    currentSeries++;      
                                
                    return colour;
                });
        
        let bandNum = 0;
        let valueGroup = seriesGroup.selectAll("rect")
               .data(d => d).enter()
               .append("rect")
               .attr("class", "value")
               .attr("x", (d, i) => {
                   return xScale(xScaleDomain[i])
               })
               .attr("y", d => {
                   return yScale(d[1]);
               })
               .attr("height", d => {
                   return yScale(d[0]) - yScale(d[1]);
               })
               .attr("width", xScale.bandwidth());

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
            .attr("transform", `translate(0,${width / 2 - 80})`);
        
        xAxisLabels.call(d3.axisBottom(xScale).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove());

        xAxisLabels.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        if(width < 700){
            let ticks = xAxisLabels.selectAll(".tick text");
            ticks.attr("class", function(d,i){
                if(i % 3 !== 0) d3.select(this).remove();
            });
        }
        
        svg.append("g")
            .attr("transform", `translate(0, ${width / 2 - 20})`)
            .call(d3.axisBottom(xGroupScale).tickSizeInner(0))
            .call(g => g.selectAll(".domain").remove());

        let tickNum = 10;
        if(width < 600){
            tickNum = 5;
        }
        let billionDollarFormat = function(d) { return '$' + d3.format('.1s')(d).replace(/G/, "B"); };
        svg.append("g")
            .attr("transform", `translate(40,0)`)
            .call(d3.axisLeft(yScale).ticks(tickNum).tickFormat(billionDollarFormat))
            .call(g => g.selectAll(".domain").remove())

    }

    render(){        
        return <svg width="100%" ref={this.chartRef}></svg>
    }

}

