import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { LinearBubbleChart } from './LinearBubbleChart';

const currYear = '2017';

export class RevenuePage extends Component {

    colours = [
        "blues",
        "yellows",
        "greens",
        "reds",
        "purples",
        "greys"
    ];

    getTotal(d){
        return d[currYear]['slc.10X.L9910.C01.01'].amount;
    }


    getValueForVariable(d, id, i, total) {
        if(this.props.selectedCities === undefined){
            return 1;
        }
        let population = this.props.selectedCities[i].population;
        let households = this.props.selectedCities[i].households;

        if (d[currYear][id] === undefined) {
            d[currYear][id] = { amount: 0 }
        }

        if(this.props.agg === "percentage"){
            return d[currYear][id].amount / total;
        }
        else if(this.props.agg === "capita"){
            return d[currYear][id].amount / population;
        }
        else if(this.props.agg === "household"){
            return d[currYear][id].amount / households;
        }
        else{
            return d[currYear][id].amount;
        }

    }

    
    getRevStreams() {
        return this.props.cities.map((d, i) => {
            if (d[currYear] === undefined) {
                return { revenue_streams: [] }
            }

            let total = this.getTotal(d);

            return {
                city: d.desc,
                revenue_streams: [
                    {
                        description: "Property Taxes & Payments-In-Lieu of Taxes",
                        calculation: "slc.10X.L9940.C01.01",
                        value: this.getValueForVariable(d, 'slc.10X.L9940.C01.01', i, total)
                    },
                    {
                        description: "Grants from Other Levels of Government",
                        calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01",
                        value: this.getValueForVariable(d, 'slc.10X.L0899.C01.01', i, total) + this.getValueForVariable(d, 'slc.10X.L0699.C01.01', i, total)
                    },
                    {
                        description: "Total user fees / service charges",
                        calculation: "slc.10X.L1299.C01.01",
                        value: this.getValueForVariable(d, 'slc.10X.L1299.C01.01', i, total)
                    },
                    {
                        description: "Other Revenues",
                        calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01",
                        value: this.getValueForVariable(d, 'slc.10X.L9910.C01.01', i, total) - this.getValueForVariable(d, 'slc.10X.L9940.C01.01', i, total) - this.getValueForVariable(d, 'slc.10X.L0899.C01.01', i, total) - this.getValueForVariable(d, 'slc.10X.L0699.C01.01', i, total) - this.getValueForVariable(d, 'slc.10X.L1299.C01.01', i, total)
                    }
                ]
            }

        });
    }

    renderBubbleGraphs() {
        let cityData = this.getRevStreams();

        let maxValue = 0;
        if(cityData.length > 0){
            maxValue = cityData.reduce((acc, curr) => {
                if(curr.revenue_streams.length > 0){
                    let currMax = curr.revenue_streams.reduce((currAcc, currCurr) => {
                        if(currCurr.value > currAcc){
                            return currCurr.value;
                        }
                        else{
                            return currAcc;
                        }
                    }, 0);
                    if(currMax > acc){
                        return currMax;
                    }
                    else{
                        return acc;
                    }
                }
                else{
                    return 0;
                }
            }, 0)
        }

        return cityData.map((data, i) => {
            let offset = 0;
            if (i === 2) {
                offset = 3;
            }
            if (cityData.length === 1) {
                offset = 3;
            }

            return (<Col key={i} xs={12} md={{ span: 6, offset: offset }}>
                <h4 className="text-center" >{data.city}</h4>
                <LinearBubbleChart maxValue={maxValue} type={this.props.agg} colours={this.colours[i]} data={data.revenue_streams}></LinearBubbleChart>
                <br /><br />
            </Col>)
        })
    }

    render() {
        return (
            <div>
                <Row>
                    {this.renderBubbleGraphs()}
                </Row>
            </div>
        )
    }
}

