import React,  { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import {SelectionTable} from './SelectionTable';


export class CitySelectionModal extends Component{

    constructor(){
        super();
        this.state = {tier: "ST"};
    }
    
    setTier(tier){
        this.setState({tier: tier});
    }

    headerData = [
            {key: "name", name: "Municipality Name", rightalign: false, largecell: true},
            {key: "households", name: "# Households", rightalign: true, largecell: false},
            {key: "population", name: "# Residents", rightalign: true, largecell: false}
    ];

    selectCity(){
        return (muni) => {
            this.props.citySelected(muni);
        }
    }

    getHeader(tier){
        const headers = {
            "ST" : "Single Tier",
            "LT" : "Lower Tier",
            "UT" : "Upper Tier"
        }

        return headers[tier];
    }

    rowFilter(){
        return d => {
            return d.tier === this.state.tier;
        }
    }

    render(){
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                dialogClassName="modal-50w"
                >
                <Modal.Header closeButton>
                    <Modal.Title>
                        List of Municipalities: {this.getHeader(this.state.tier)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="d-inline-block font-weight-bold">Change Tier:&nbsp;</label>
                    <div className="d-inline-block">
                        <DropdownButton size="sm" className="btn-sm" variant="dark" id="tier-dropdown" title={this.getHeader(this.state.tier) + " "}>
                            <Dropdown.Item onSelect={() => {this.setTier("UT")}}>Upper Tier</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {this.setTier("LT")}}>Lower Tier</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {this.setTier("ST")}}>Single Tier</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <br/><br/>
                    <h4>Select a municipality to add:</h4>
                    <SelectionTable selectItem={this.selectCity()} filter={this.rowFilter()} sortKey={this.state.sortKey} data={this.props.muniData} headerData={this.headerData}></SelectionTable>
                </Modal.Body>
            </Modal>
        )
    }
}