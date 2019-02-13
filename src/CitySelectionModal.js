import React from 'react';
import { Modal } from 'react-bootstrap';

function getHeaders(muniData) {
    let retData = [<th key="id">id</th>];
    if(muniData !== undefined){
        for(let header in muniData[1000]){
            retData.push(<th key={header}>{header}</th>);
        }
    }
    return retData;
}

function getData(muniData) {
    let retData = [];
    if(muniData !== undefined){
        for(let muniID in muniData){
            let row = [<td key="id">{muniID}</td>];
            for(let item in muniData[muniID]){
                row.push(<td key={muniID + item}>{muniData[muniID][item]}</td>);
            }
            retData.push(<tr key={muniID}>{row}</tr>)
        }
    }
    return retData;
}

export function CitySelectionModal(props){
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            dialogClassName="modal-90w"
            >
            <Modal.Header closeButton>
                <Modal.Title>
                    Custom Modal Styling
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-striped table-sm table-hover table-100pc">
                    <thead>
                        <tr>
                            {getHeaders(props.muniData)}
                        </tr>
                    </thead>
                    <tbody>
                        {getData(props.muniData)}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    )
}