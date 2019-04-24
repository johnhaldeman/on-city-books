import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { LinearBubbleChart } from './LinearBubbleChart';
import { StackedBarChart } from './StackedBarChart';
import { DataTable } from './DataTable';

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

    dataTableFields = [
        { id: "slc.10X.L9940.C01.01", desc: "Property Taxes & Payments-In-Lieu of Taxes", 
            calc: (d, i, total, year) => {
                return this.getValueForVariable(d, 'slc.10X.L9940.C01.01', i, total, year)}
        },
        { id: { value: "See Calculation", popover: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01" }, desc: "Grants from Other Levels of Government", 
            calc: (d, i, total, year) => {return (
                this.getValueForVariable(d, 'slc.10X.L0899.C01.01', i, total, year) +
                this.getValueForVariable(d, 'slc.10X.L0699.C01.01', i, total, year)
            )}
        },
        { id: "slc.10X.L1299.C01.01", desc: "Total user fees / service charges" , 
            calc: (d, i, total, year) => {return (
                this.getValueForVariable(d, 'slc.10X.L1299.C01.01', i, total, year)
            )}
        },
        { id: { value: "See Calculation", popover: "slc.10X.L9910.C01.01 - ( slc.10X.L9940.C01.01 + slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01 + slc.10X.L1299.C01.01 )" }, desc: "Other", 
            calc: (d, i, total, year) => {return (
                this.getValueForVariable(d, 'slc.10X.L9910.C01.01', i, total, year) - (
                    this.getValueForVariable(d, 'slc.10X.L9940.C01.01', i, total, year) +
                    this.getValueForVariable(d, 'slc.10X.L0899.C01.01', i, total, year) +
                    this.getValueForVariable(d, 'slc.10X.L0699.C01.01', i, total, year) +
                    this.getValueForVariable(d, 'slc.10X.L1299.C01.01', i, total, year) 
                )
            )}
        },
        { id: "slc.10X.L9910.C01.01", desc: "Total" , 
            calc: (d, i, total, year) => {return (
                this.getValueForVariable(d, 'slc.10X.L9910.C01.01', i, total, year)
            )}
        }
    ]

    getTotal(d, year) {
        return d[year]['slc.10X.L9910.C01.01'].amount;
    }


    getValueForVariable(d, id, i, total, year) {
        if (this.props.selectedCities === undefined) {
            return 1;
        }
        let population = this.props.selectedCities[i].population;
        let households = this.props.selectedCities[i].households;

        if (d[year][id] === undefined) {
            d[year][id] = { amount: 0 }
        }

        if (this.props.agg === "percentage") {
            return d[year][id].amount / total;
        }
        else if (this.props.agg === "capita") {
            return d[year][id].amount / population;
        }
        else if (this.props.agg === "household") {
            return d[year][id].amount / households;
        }
        else {
            return d[year][id].amount;
        }

    }


    getRevStreams(year) {
        return this.props.cities.map((d, i) => {
            if (d[year] === undefined) {
                return { revenue_streams: [] }
            }

            let total = this.getTotal(d, year);

            let streams = this.dataTableFields.slice(0, -1).map(field => {
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
                <h6 className="text-center" >{currYear} Revenue - {desc} - {data.city}</h6>
                <LinearBubbleChart maxValue={maxValue} type={this.props.agg} colours={this.colours[i]} data={data.revenue_streams}></LinearBubbleChart>
                <br /><br /><br />
            </Col>)
        })
    }

    renderStackedBarChart() {

        if (this.props.cities.length === 0) {
            return;
        }

        const years = ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
        let cityBarData = this.props.cities.map((d, i) => {
            let cityObject = { city: d.desc };
            cityObject.year_data = years.map((year) => {
                if (d[year] === undefined) {
                    return {
                        year: 0,
                        prop_taxes: 0,
                        grants: 0,
                        user_fees: 0,
                        other: 0,
                        total: 0
                    };
                }

                let total = this.getTotal(d, year);

                let prop_taxes = this.dataTableFields[0].calc(d, i, total, year);
                let grants = this.dataTableFields[1].calc(d, i, total, year);
                let user_fees = this.dataTableFields[2].calc(d, i, total, year);
                let other = this.dataTableFields[3].calc(d, i, total, year);;

                return {
                    year: year,
                    prop_taxes: prop_taxes,
                    grants: grants,
                    user_fees: user_fees,
                    other: other,
                    total: prop_taxes + grants + user_fees + other
                }
            })

            return cityObject;
        })

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
            <Col>
                <h6 className="text-center" >{currYear} Revenue - {desc}</h6>
                <StackedBarChart group="city" keys={["prop_taxes", "grants", "user_fees", "other"]} data={cityBarData} years={years} type={this.props.agg}></StackedBarChart>
                
                <br />
                <br />
                <br />
                <br />
            </Col>
        )
    }

    renderDataTable() {
        let year = currYear;

        let dataArr = this.props.cities.map((d, i) => {
            if (d[year] === undefined) {
                return []
            }

            let total = this.getTotal(d, year);

            return this.dataTableFields.map(field => {
                return field.calc(d, i, total, year);
            })

        });


        return (
            <Col>
                <DataTable agg={this.props.agg} data={dataArr} fields={this.dataTableFields} cities={this.props.cities}></DataTable>
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

