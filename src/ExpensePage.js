import React, { Component } from 'react';
import { StatsBody } from './StatsBody';
import { getValueForVariable } from "./Utils";


export class ExpensePage extends Component {

    dataTableFields = {
        fields: [
            {
                id: "slc.40X.L0299.C01.11", desc: "Gen. Government",
                calc: (d, i, total, year) => {
                    return getValueForVariable(d, 'slc.40X.L0299.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                },
                drilldown: {
                    fields: [
                        {
                            id: "slc.40X.L0240.C01.11", desc: "Governance",
                            calc: (d, i, total, year) => {
                                return getValueForVariable(d, "slc.40X.L0240.C01.11", i, total, year, this.props.selectedCities, this.props.agg)
                            }
                        },
                        {
                            id: "slc.40X.L0250.C01.11", desc: "Corporate Management",
                            calc: (d, i, total, year) => {
                                return getValueForVariable(d, "slc.40X.L0250.C01.11", i, total, year, this.props.selectedCities, this.props.agg)
                            }
                        },
                        {
                            id: "slc.40X.L0260.C01.11", desc: "Program Support",
                            calc: (d, i, total, year) => {
                                return getValueForVariable(d, "slc.40X.L0260.C01.11", i, total, year, this.props.selectedCities, this.props.agg)
                            }
                        }
                    ],
                    totalID: "slc.40X.L0299.C01.11"
                }
            },
            {
                id: "slc.40X.L0499.C01.11", desc: "Protection to Persons/Property",
                calc: (d, i, total, year) => {
                    return (
                        getValueForVariable(d, 'slc.40X.L0499.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                    )
                }
            },
            {
                id: "slc.40X.L0699.C01.11", desc: "Transportation",
                calc: (d, i, total, year) => {
                    return (
                        getValueForVariable(d, 'slc.40X.L0699.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                    )
                }
            },
            {
                id: "slc.40X.L0899.C01.11", desc: "Environment",
                calc: (d, i, total, year) => {
                    return (
                        getValueForVariable(d, 'slc.40X.L0899.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                    )
                }
            },
            {
                id: "slc.40X.L1099.C01.11", desc: "Health and Emergency",
                calc: (d, i, total, year) => {
                    return (
                        getValueForVariable(d, 'slc.40X.L1099.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                    )
                }
            },
            {
                id: { "value": "See Calculation", "popover": "slc.40X.L1499.C01.1 + slc.40X.L1299.C01.11" }, desc: "Social, Family and Social Housing",
                calc: (d, i, total, year) => {
                    return (
                        getValueForVariable(d, 'slc.40X.L1299.C01.11', i, total, year, this.props.selectedCities, this.props.agg) +
                        getValueForVariable(d, 'slc.40X.L1499.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                    )
                }
            },
            {
                id: "slc.40X.L1699.C01.11", desc: "Recreation and Cultural",
                calc: (d, i, total, year) => {
                    return (
                        getValueForVariable(d, 'slc.40X.L1699.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                    )
                }
            },
            {
                id: { "value": "See Calculation", "popover": "slc.40X.L1899.C01.11 + slc.40X.L1910.C01.11" }, desc: "Planning, Devel. and Other",
                calc: (d, i, total, year) => {
                    return (
                        getValueForVariable(d, 'slc.40X.L1899.C01.11', i, total, year, this.props.selectedCities, this.props.agg) + getValueForVariable(d, 'slc.40X.L1910.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                    )
                }
            },
            {
                id: "slc.40X.L9910.C01.11", desc: "Total",
                calc: (d, i, total, year) => {
                    return (
                        getValueForVariable(d, 'slc.40X.L9910.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
                    )
                }
            }
        ],
        totalID: 'slc.40X.L9910.C01.11'
    };



    render() {

        if (this.props.cities.length === 0) {
            return <div></div>;
        }

        return (
            <div>
                <StatsBody title="Expenses" totalID={this.dataTableFields.totalID} dataTableFields={this.dataTableFields.fields} agg={this.props.agg} cities={this.props.cities} selectedCities={this.props.selectedCities}>
                </StatsBody>
            </div>
        )
    }
}

