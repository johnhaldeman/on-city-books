import React, { Component } from 'react';
import { getValueForVariable } from "./Utils";
import { Col } from 'react-bootstrap';
import { StackedBarChart } from './StackedBarChart';


export class DefisurpPage extends Component {

    dataTableFields = [
        { id: "slc.10X.L2099.C01.01", desc: "Anual Surplus/Deficit", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.10X.L2099.C01.01', i, total, year, this.props.selectedCities, this.props.agg)}
        }
    ]

    totalID = 'slc.10X.L2099.C01.01';

    getTotal(d, year) {
        return d[year][this.totalID].amount;
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
                    for(let field of this.dataTableFields){
                        retObject[field.desc] = 0;
                    }
                    return retObject;
                }

                let totalUp = 0;
                let total = this.getTotal(d, year);

                for(let field of this.dataTableFields){
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

        
        let fieldNames = this.dataTableFields.map(d => d.desc);

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
        
        if (this.props.cities.length === 0) {
            return <div></div>;
        }

        return (
            <div>
                {this.renderStackedBarChart()}
            </div>
        )
    }
}

