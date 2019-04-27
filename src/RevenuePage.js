import React, { Component } from 'react';
import { StatsBody } from './StatsBody';
import { getValueForVariable } from "./Utils";



export class RevenuePage extends Component {

    dataTableFields = [
        { id: "slc.10X.L9940.C01.01", desc: "Property Taxes & Payments-In-Lieu of Taxes", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.10X.L9940.C01.01', i, total, year, this.props.selectedCities, this.props.agg)}
        },
        { id: { value: "See Calculation", popover: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01" }, desc: "Grants from Other Levels of Government", 
            calc: (d, i, total, year) => {return (
                getValueForVariable(d, 'slc.10X.L0899.C01.01', i, total, year, this.props.selectedCities, this.props.agg) +
                getValueForVariable(d, 'slc.10X.L0699.C01.01', i, total, year, this.props.selectedCities, this.props.agg)
            )}
        },
        { id: "slc.10X.L1299.C01.01", desc: "Total user fees / service charges" , 
            calc: (d, i, total, year) => {return (
                getValueForVariable(d, 'slc.10X.L1299.C01.01', i, total, year, this.props.selectedCities, this.props.agg)
            )}
        },
        { id: { value: "See Calculation", popover: "slc.10X.L9910.C01.01 - ( slc.10X.L9940.C01.01 + slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01 + slc.10X.L1299.C01.01 )" }, desc: "Other", 
            calc: (d, i, total, year) => {return (
                getValueForVariable(d, 'slc.10X.L9910.C01.01', i, total, year, this.props.selectedCities, this.props.agg) - (
                    getValueForVariable(d, 'slc.10X.L9940.C01.01', i, total, year, this.props.selectedCities, this.props.agg) +
                    getValueForVariable(d, 'slc.10X.L0899.C01.01', i, total, year, this.props.selectedCities, this.props.agg) +
                    getValueForVariable(d, 'slc.10X.L0699.C01.01', i, total, year, this.props.selectedCities, this.props.agg) +
                    getValueForVariable(d, 'slc.10X.L1299.C01.01', i, total, year, this.props.selectedCities, this.props.agg) 
                )
            )}
        },
        { id: "slc.10X.L9910.C01.01", desc: "Total" , 
            calc: (d, i, total, year) => {return (
                getValueForVariable(d, 'slc.10X.L9910.C01.01', i, total, year, this.props.selectedCities, this.props.agg)
            )}
        }
    ]

    totalID = 'slc.10X.L9910.C01.01';

    render() {
        
        if (this.props.cities.length === 0) {
            return <div></div>;
        }

        return (
            <div>
                <StatsBody title="Revenue" totalID={this.totalID} dataTableFields={this.dataTableFields} agg={this.props.agg} cities={this.props.cities} selectedCities={this.props.selectedCities}>
                </StatsBody>
            </div>
        )
    }
}

