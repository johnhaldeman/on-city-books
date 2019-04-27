import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { LinearBubbleChart } from './LinearBubbleChart';
import { StackedBarChart } from './StackedBarChart';
import { DataTable } from './DataTable';

const currYear = '2017';

export class StatsBody extends Component {
    colours = [
        "blues",
        "yellows",
        "greens",
        "reds",
        "purples",
        "greys"
    ];

    getTotal(d, year) {
        return d[year][this.props.totalID].amount;
    }

    
    getRevStreams(year) {
        return this.props.cities.map((d, i) => {
            if (d[year] === undefined) {
                return { revenue_streams: [] }
            }

            let total = this.getTotal(d, year);

            let streams = this.props.dataTableFields.slice(0, -1).map(field => {
                let val = Object.assign({}, field);
                val.value = field.calc(d, i, total, year);
                return val;
            })

            return {
                city: d.desc,
                revenue_streams: streams
            }

        });
    }

    renderBubbleGraphs() {
        let cityData = this.getRevStreams(currYear);

        let maxValue = 0;
        if (cityData.length > 0) {
            maxValue = cityData.reduce((acc, curr) => {
                if (curr.revenue_streams.length > 0) {
                    let currMax = curr.revenue_streams.reduce((currAcc, currCurr) => {
                        if (currCurr.value > currAcc) {
                            return currCurr.value;
                        }
                        else {
                            return currAcc;
                        }
                    }, 0);
                    if (currMax > acc) {
                        return currMax;
                    }
                    else {
                        return acc;
                    }
                }
                else {
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

            let desc = "Totals";

            if (this.props.agg === "percentage") {
                desc = "Proportions"
            }
            else if (this.props.agg === "capita") {
                desc = "Per Capita"
            }
            else if (this.props.agg === "household") {
                desc = "Per Household"
            }

            return (
                
            <Col key={i} xs={12} md={{ span: 6, offset: offset }}>
                <h6 className="text-center" >{currYear} {this.props.title} - {desc} - {data.city}</h6>
                <LinearBubbleChart maxValue={maxValue} type={this.props.agg} colours={this.colours[i]} data={data.revenue_streams}></LinearBubbleChart>
                <br /><br /><br />
            </Col>)
        })
    }

    renderDataTable() {
        let year = currYear;

        let dataArr = this.props.cities.map((d, i) => {
            if (d[year] === undefined) {
                return []
            }

            let total = this.getTotal(d, year);

            return this.props.dataTableFields.map(field => {
                return field.calc(d, i, total, year);
            })

        });

        if(dataArr.length === 0){
            return;
        }

        return (
            <Col>
                <DataTable agg={this.props.agg} data={dataArr} fields={this.props.dataTableFields} cities={this.props.cities}></DataTable>
                <br />
            </Col>
        )

    }

    getCityBarData() {

        const years = ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
        let cityBarData = this.props.cities.map((d, i) => {
            let cityObject = { city: d.desc };
            cityObject.year_data = years.map((year) => {

                let retObject = {
                    year: year,
                }
                if (d[year] === undefined) {
                    for(let field of this.props.dataTableFields){
                        retObject[field.desc] = 0;
                    }
                    return retObject;
                }

                let totalUp = 0;
                let total = this.getTotal(d, year);

                for(let field of this.props.dataTableFields.slice(0,-1)){
                    retObject[field.desc] = field.calc(d, i, total, year);
                    totalUp += retObject[field.desc];
                }
                retObject.total = totalUp;

                return retObject;
            })

            return cityObject;
        })

        return cityBarData;        
    }


    renderStackedBarChart() {
        const years = ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];


        let desc = "Totals";

        if (this.props.agg === "percentage") {
            desc = "Proportions"
        }
        else if (this.props.agg === "capita") {
            desc = "Per Capita"
        }
        else if (this.props.agg === "household") {
            desc = "Per Household"
        }
        
        let barData = this.getCityBarData();
        if(barData === undefined){
            return;
        }

        
        let fieldNames = this.props.dataTableFields.slice(0,-1).map(d => d.desc);

        return (
            <Col>
                <h6 className="text-center" >Yearly {this.props.title} - {desc}</h6>
                <StackedBarChart group="city" keys={fieldNames} data={barData} years={years} type={this.props.agg}></StackedBarChart>
                
                <br />
                <br />
                <br />
                <br />
            </Col>
        )
    }

    render() {
        return (
            <div>

                <Row>
                    {this.renderBubbleGraphs()}
                </Row>

                <Row>
                    {this.renderDataTable()}
                </Row>

                <Row>
                    {this.renderStackedBarChart()}
                </Row>
            </div>
        )
    }


}