import React, { Component } from 'react';
import { getValueForVariable } from "./Utils";
import { Col, Row } from 'react-bootstrap';
import { StackedBarChart } from './StackedBarChart';
import { DataTable } from './DataTable';


export class DefisurpPage extends Component {

    dataTableFields = [
        { id: 'slc.10X.L2010.C01.01', desc: "Total Revenues", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.10X.L2010.C01.01', i, total, year, this.props.selectedCities, this.props.agg)}
        },
        { id: 'slc.10X.L2020.C01.01', desc: "Total Expenses", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.10X.L2020.C01.01', i, total, year, this.props.selectedCities, this.props.agg)}
        },
        { id: 'slc.10X.L2099.C01.01', desc: "Annual Surplus/Deficit", 
            calc: (d, i, total, year) => {
                return getValueForVariable(d, 'slc.10X.L2099.C01.01', i, total, year, this.props.selectedCities, this.props.agg)}
        }
    ]

    totalID = 'slc.10X.L2099.C01.01';

    getTotal(d, year) {
        return d[year][this.totalID].amount;
    }



    getCityBarData() {

        const years = ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
        let cityBarData = this.props.cities.map((d, i) => {
            let cityObject = { city: d.desc };
            cityObject.year_data = years.map((year) => {

                let retObject = {
                    year: year,
                }
                if (d[year] === undefined) {
                    for(let field of this.dataTableFields.slice(-1)){
                        retObject[field.desc] = 0;
                    }
                    return retObject;
                }

                let totalUp = 0;
                let total = this.getTotal(d, year);

                for(let field of this.dataTableFields.slice(-1)){
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
        const years = ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];


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
                <h6 className="text-center" >Yearly Deficit/Surplus - {desc}</h6>
                <StackedBarChart group="city" keys={fieldNames.slice(-1)} data={barData} years={years} type={this.props.agg}></StackedBarChart>
                
                <br />
                <br />
                <br />
                <br />
            </Col>
        )
    }

    renderDataTable() {
        let year = "2017";

        let dataArr = this.props.cities.map((d, i) => {
            if (d[year] === undefined) {
                return []
            }

            let total = this.getTotal(d, year);

            return this.dataTableFields.map(field => {
                return field.calc(d, i, total, year);
            })

        });

        if(dataArr.length === 0){
            return;
        }

        return (
            <Col>
                <h6 className="text-center" >{year} Revenues and Expenses</h6>
                <DataTable agg={this.props.agg} data={dataArr} fields={this.dataTableFields} cities={this.props.cities}></DataTable>
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
                <Row>
                {this.renderStackedBarChart()}
                </Row>
      

                <Row>
                    {this.renderDataTable()}
                </Row>
            </div>
        )
    }
}

