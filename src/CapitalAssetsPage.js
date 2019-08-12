import React, { Component } from 'react';
import { getValueForVariable } from "./Utils";
import { StatsBody } from "./StatsBody";


export class CapitalAssetsPage extends Component {

    dataTableFields = [
        { id: 'slc.51A.L0699.C01.11', desc: "Transportation services", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.51A.L0699.C01.11', i, total, year, this.props.selectedCities, this.props.agg)}
        },
        { id: 'slc.51A.L1699.C01.11', desc: "Recreation and cultural services", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.51A.L1699.C01.11', i, total, year, this.props.selectedCities, this.props.agg)}
        },
        { id: 'slc.51A.L0899.C01.11', desc: "Environmental services (waste, water, etc.)", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.51A.L0899.C01.11', i, total, year, this.props.selectedCities, this.props.agg)}
        },
        { id: {"value": "See Calculation", "popover": "slc.51A.L1899.C01.11 + slc.51A.L1299.C01.11 + slc.51A.L0299.C01.11 + slc.51A.L0499.C01.11 + slc.51A.L1499.C01.11 + slc.51A.L1299.C01.11 + slc.51A.L1010.C01.11"}, desc: "Gen. Gov./Protection/Env./Social Services", 
            calc: (d, i, total, year) => {return (
                getValueForVariable(d, 'slc.51A.L1899.C01.11', i, total, year, this.props.selectedCities, this.props.agg) + 
                getValueForVariable(d, 'slc.51A.L1499.C01.11', i, total, year, this.props.selectedCities, this.props.agg) + 
                getValueForVariable(d, 'slc.51A.L1010.C01.11', i, total, year, this.props.selectedCities, this.props.agg) + 
                getValueForVariable(d, 'slc.51A.L0499.C01.11', i, total, year, this.props.selectedCities, this.props.agg) + 
                getValueForVariable(d, 'slc.51A.L0299.C01.11', i, total, year, this.props.selectedCities, this.props.agg) + 
                getValueForVariable(d, 'slc.51A.L0299.C01.11', i, total, year, this.props.selectedCities, this.props.agg) + 
                getValueForVariable(d, 'slc.51A.L1299.C01.11', i, total, year, this.props.selectedCities, this.props.agg)
            )}
        },
        { id: 'slc.51A.L1910.C01.11', desc: "Other", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.51A.L1910.C01.11', i, total, year, this.props.selectedCities, this.props.agg)}
        },
        { id: 'slc.51A.L9910.C01.11', desc: "Total", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.51A.L9910.C01.11', i, total, year, this.props.selectedCities, this.props.agg)}
        }
    ]

    
    totalID = 'slc.51A.L9910.C01.11';

    render() {
        
        if (this.props.cities.length === 0) {
            return <div></div>;
        }

        return (
            <div>
                <StatsBody title="Net Book Value of Tangible Capital Assets" totalID={this.totalID} dataTableFields={this.dataTableFields} agg={this.props.agg} cities={this.props.cities} selectedCities={this.props.selectedCities}>
                </StatsBody>
            </div>
        )
    }
}

