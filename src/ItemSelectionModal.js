import React,  { Component } from 'react';
import { Modal } from 'react-bootstrap';
import {SelectionTable} from './SelectionTable';
import {ItemDropDown} from './ItemDropDown';


export class ItemSelectionModal extends Component{

    constructor(props){
        super();
        let origSched = "FINANCIAL INFORMATION RETURN";
        if(props.category !== undefined){
            origSched = props.category;
        }

        this.state = {
            sortOrder: true, 
            schedule: origSched
        };
    }

    headerData = [
            {key: "key", name: "ID", rightalign: false, largecell: false},
            {key: "schedule", name: "Schedule", rightalign: false, largecell: true},
            {key: "sub_schedule", name: "Subschedule", rightalign: false, largecell: true},
            {key: "line_desc", name: "Line", rightalign: false, largecell: true}
    ];

    selectItem(){
        return (item) => {
            this.props.itemSelected(item);
        }
    }

    // Don't filter anything for now
    rowFilter(){
        return d => {
            return d.schedule === this.state.schedule;
        }
    }

    setSchedule(){
        return (sched) =>{
            this.setState({schedule: sched});
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
                        List of Financial Items for Selected Schedule
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="d-inline-block font-weight-bold">Change Schedule:&nbsp;</label>
                        <div className="d-inline-block">
                            <ItemDropDown schedule={this.state.schedule} setSchedule={this.setSchedule()}></ItemDropDown>
                        </div>
                    <br/><br/>
                    <h4>Select a item:</h4>
                    <SelectionTable showID={true} selectItem={this.selectItem()} filter={this.rowFilter()} sortKey={"key"} data={this.props.itemData} headerData={this.headerData}></SelectionTable>
                </Modal.Body>
            </Modal>
        )
    }
}