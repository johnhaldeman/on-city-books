import React, { Component } from 'react';
import { Tabs, Tab, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';
import { ItemDropDown } from './ItemDropDown';
import * as d3 from "d3";
import * as utils from "./Utils";
import { Redirect } from 'react-router';


class DetailsBody extends Component {

    getHeader(columns){
        let headers = [];
        for(let col in columns){
            headers.push(<th>{col} - {columns[col].desc}</th>)
        }
        return headers;
    }

    getData(columns, data){
        let headers = [];
        
        if(data !== undefined){
            for(let col in columns){
                if(data[col] !== undefined){
                    if(columns[col].type === "text"){
                        headers.push(
                        <tr key={col}>
                            <th className="width80pc">{col} - {columns[col].desc}</th>
                            <td>{data[col].value_text}</td>
                        </tr>
                        )
                    }
                    else{
                        let val = utils.getAggregateValue(this.props.muniData, this.props.muni_id, data[col].amount, this.props.agg);
                        headers.push(
                            <tr key={col}>
                                <th className="width80pc">{col} - {columns[col].desc}</th>
                                <td className={this.getClass(this.getFormat(columns[col].type))}>
                                    {this.getFormat(columns[col].type)(val)}
                                </td>
                            </tr>
                        )
                    }
                }
                else{
                    headers.push(
                        <tr key={col}>
                            <th className="width80pc">{col} - {columns[col].desc}</th>
                            <td>--- No Data Provided ---</td>
                        </tr>
                    )
                }
            }
        }
        
        return headers;
    }

    getFormat(type){
        if(type === "text"){
            return d => d;
        }
        else if(type === "currency"){
            return d3.format('$,.0f');
        }
        else if(type === "percentage"){
            return d3.format('.0%');
        }
        else{
            return d => {
                if(d < 10 && d > -10){
                    return d3.format(',.2')(d);
                }
                else {
                    return d3.format(',.0f')(d);
                }
            }
        }
    }

    getClass(type){
        let className = "";

        if(type === "text"){
            return className += "";
        }
        else{
            return className += " number-text";
        }
    }

    render(){
        return(
            <div>
                {
                this.props.items.map((item, i) => {
                    return (
                    <div key={item.sub_schedule + "-" + item.line_desc + "-" + i}>
                        <table className="table table-bordered table-sm table-hover">
                            <thead className="thead-light">
                                <tr><th colSpan="2">{item.sub_schedule} - {item.line_desc}</th></tr>
                            </thead>
                            <tbody>
                                {this.getData(item.column_descs, this.props.data)}
                            </tbody>
                        </table>
                    </div>
                    )
                })
                }
            </div>
        )
    }
}

export class DetailsPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            //currYear: "2017",
            //schedule: "FINANCIAL INFORMATION RETURN"
        }

        this.redirected = false;

    }

    yearSelected(year){
        return () => {
            this.redirected = false;
            this.setState({currYear: year});
        }
    }

    setSchedule() {
        return (schedule) => {
            this.redirected = false;
            this.setState({schedule: schedule})
        }
    }

    setSelected() {
        return (selected) => {
            this.redirected = false;
            this.setState({selectedCity: selected})
        }
    }
    

    render() {
        if(!(this.props.cities !== undefined && this.props.cities[0] !== undefined) ){
            return <div></div>;
        }

        let year = "2017";
        let schedule = "FINANCIAL INFORMATION RETURN";
        let selected = this.props.cities[0].id;

        if(this.state.schedule !== undefined){
            schedule = this.state.schedule;
        }
        else if(this.props.schedule === "undefined"){
            schedule = "FINANCIAL INFORMATION RETURN"
        }
        else if(this.props.schedule !== undefined){
            schedule = this.props.schedule;
        }

        if(this.state.currYear !== undefined){
            year = this.state.currYear;
        }
        else if(this.props.year === "undefined"){
            year = "2017";
        }
        else if(this.props.year !== undefined){
            year = this.props.year;
        }

        if(this.state.selectedCity !== undefined){
            selected = this.state.selectedCity;
        }
        else if(this.props.selectedCity !== undefined){
            selected = this.props.selectedCity;
        }

        if((this.state.currYear !== undefined || this.state.schedule !== undefined || this.state.selectedCity) && !this.redirected) {
            this.redirected = true;
            return <Redirect to={"/alldata/" + this.props.agg + "/schedule-" + schedule + "/selected-" + selected + "/year-" + year + utils.getCityNamesSlashDelimited(this.props.selectedCities)}  />;
        }

        
        let selectedItems = [];
        for(let item in this.props.items){
            if(this.props.items[item].schedule === schedule){
                selectedItems.push(this.props.items[item]);
            }
        }

        let TabList = this.props.cities.map((city) => {
            return (
            <Tab key={city.id} eventKey={city.id} title={city.desc}>
                <br/>
                <Row>
                    <Col md="auto">
                         <DetailsBody agg={this.props.agg} muni_id={city.id} muniData={this.props.muniData} items={selectedItems} data={city[year]}></DetailsBody>
                    </Col>
                </Row>
            </Tab>
            )
        });


        return (
            <div>
                <Row>
                    <Col>
                        <div role="toolbar" className="btn-toolbar">
                            <ItemDropDown schedule={schedule} setSchedule={this.setSchedule()}></ItemDropDown>
                            &nbsp;&nbsp;&nbsp;
                            <DropdownButton className="pad-right" id="dropdown-item-button" variant="dark" title={year}>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2009')}>2009</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2010')}>2010</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2011')}>2011</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2012')}>2012</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2013')}>2013</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2014')}>2014</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2015')}>2015</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2016')}>2016</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2017')}>2017</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={this.yearSelected('2018')}>2018</Dropdown.Item>
                            </DropdownButton>
                            <br/><br/>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Tabs id="citydetailtab" activeKey={selected} onSelect={this.setSelected()}>
                            {TabList}
                        </Tabs>
                    </Col>
                    
                    <Col></Col>
                </Row>
            </div>
        )
    }

}

