import React, { Component } from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import * as d3 from "d3";

export class DataTable extends Component {

    renderTableData(){
        return this.props.fields.map( (field, fieldNum) => {
            let values = this.props.cities.map( (city, cityNum) => {
                let format = d3.format('$,.0f');
                if(this.props.agg === "percentage"){
                    format = d3.format(".0%")
                }
                return <td key={cityNum + fieldNum} className="number-text">{format(this.props.data[cityNum][fieldNum])}</td>
            })
            let idVal = field.id;
            if(field.id.value !== undefined){
                const popover = (
                    <Popover id="popover-basic" title="Calculation">
                        {field.id.popover}
                    </Popover>);
                idVal = (
                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                        <Button variant="link" style={{padding: 0}}>{field.id.value}</Button>
                    </OverlayTrigger>
                )
            }

            return (
                <tr key={fieldNum}>
                    <td>{field.desc}</td>
                    <td>{idVal}</td>
                    {values}
                </tr>
            )
        });
    };
    

    render() {
        return (
            <table className="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>ID</th>
                        {
                            this.props.cities.map((d, i) => {
                                return <th key={i}>{d.desc}</th>;
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </table>
        )
    }

}