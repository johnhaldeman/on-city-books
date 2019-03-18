import React,  { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function IconBox(props){
    return <svg width="12" height="20" viewBox="0 0 16 28">
        {props.children}
    </svg>
}

function AscSortIcon(){
    return <IconBox>
                <path d="M16 11c0 0.547-0.453 1-1 1h-14c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l7-7c0.187-0.187 0.438-0.297 0.703-0.297s0.516 0.109 0.703 0.297l7 7c0.187 0.187 0.297 0.438 0.297 0.703z"></path>
            </IconBox>
}

function DescSortIcon(){
    return <IconBox>
                <path d="M16 17c0 0.266-0.109 0.516-0.297 0.703l-7 7c-0.187 0.187-0.438 0.297-0.703 0.297s-0.516-0.109-0.703-0.297l-7-7c-0.187-0.187-0.297-0.438-0.297-0.703 0-0.547 0.453-1 1-1h14c0.547 0 1 0.453 1 1z"></path>
            </IconBox>
}

function SortIcon(){
    return <IconBox>
                <path d="M16 17c0 0.266-0.109 0.516-0.297 0.703l-7 7c-0.187 0.187-0.438 0.297-0.703 0.297s-0.516-0.109-0.703-0.297l-7-7c-0.187-0.187-0.297-0.438-0.297-0.703 0-0.547 0.453-1 1-1h14c0.547 0 1 0.453 1 1zM16 11c0 0.547-0.453 1-1 1h-14c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l7-7c0.187-0.187 0.438-0.297 0.703-0.297s0.516 0.109 0.703 0.297l7 7c0.187 0.187 0.297 0.438 0.297 0.703z"></path>
           </IconBox>
}

export class CitySelectionModal extends Component{

    constructor(){
        super();
        this.state = {tier: "ST", sortKey: "name", sortOrder: true};
    }
    
    setTier(tier){
        this.setState({tier: tier});
    }

    headerData = [
            {key: "name", name: "Municipality Name", rightalign: false},
            {key: "households", name: "# Households", rightalign: true},
            {key: "population", name: "# Residents", rightalign: true}
    ];

    sortBy(key){
        return d => {
            if(this.state.sortKey === key){
                this.setState({sortOrder: !this.state.sortOrder});
            }
            else{
                this.setState({sortKey: key});
            }
        }
    }
    
    getHeaders() {
        let retData = this.headerData.map(d => {
            let classes = "";
            if(d.rightalign){
                classes += "rightalign "
            }

            let icon = <SortIcon></SortIcon>;
            if(this.state.sortKey === d.key){
                if(this.state.sortOrder){
                    icon = <AscSortIcon></AscSortIcon>;
                }
                else {
                    icon = <DescSortIcon></DescSortIcon>;
                }
            }

            return <th className={classes} key={d.key} onClick={this.sortBy(d.key)}>{d.name} {icon}</th>
        })
        return retData;
    }

    getRow(headerData){
        return function(muniData, id){
            let row = headerData.map(d => {
                let classes = "";
                if(d.rightalign){
                    classes += "rightalign "
                }
                return <td className={classes} key={id + "-" + d.key}>{muniData[d.key]}</td>
            })
            return <tr key={id}>{row}</tr>;
        }
    }
    
    getData(muniData) {
        let retData = [];
        if(muniData !== undefined){
            for(let muniID in muniData){
                if(muniData[muniID].tier === this.state.tier){                    
                    retData.push(muniData[muniID])
                }
            }
        }

        const sortBy = this.state.sortKey;
        retData.sort((a, b) => {
            let retVal = 0;

            if(a[sortBy] < b[sortBy]){
                retVal = -1;
            }
            else if(a[sortBy] > b[sortBy]){
                retVal = 1;
            }

            if(!this.state.sortOrder){
                retVal = retVal * -1;
            }

            return retVal;
        });
        
        return retData.map(this.getRow(this.headerData));
    }

    getHeader(tier){
        const headers = {
            "ST" : "Single Tier",
            "LT" : "Lower Tier",
            "UT" : "Upper Tier"
        }

        return headers[tier];
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
                        <DropdownButton size="sm" className="btn-sm" id="tier-dropdown" title={this.getHeader(this.state.tier) + " "}>
                            <Dropdown.Item onSelect={() => {this.setTier("UT")}}>Upper Tier</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {this.setTier("LT")}}>Lower Tier</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {this.setTier("ST")}}>Single Tier</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <br/><br/>
                    <table className="table table-bordered table-striped table-sm table-hover table-100pc">
                        <thead>
                            <tr>
                                {this.getHeaders()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.getData(this.props.muniData)}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        )
    }
}