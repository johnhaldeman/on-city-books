import React from 'react';
import { Modal } from 'react-bootstrap';

function getHeaders(muniData) {
    let retData = [<th>id</th>];
    if(muniData !== undefined){
        for(let header in muniData[1000]){
            retData.push(<th>{header}</th>);
        }
    }
    return retData;
}

function getData(muniData) {
    let retData = [];
    if(muniData !== undefined){
        for(let muniID in muniData){
            let row = [<td>{muniID}</td>];
            for(let item in muniData[muniID]){
                row.push(<td>{muniData[muniID][item]}</td>);
            }
            retData.push(<tr>{row}</tr>)
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

                <table>
                    <tr>
                        {getHeaders(props.muniData)}
                    </tr>
                    {getData(props.muniData)}
                </table>
            </Modal.Body>
        </Modal>
    )
}