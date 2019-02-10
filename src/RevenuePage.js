import React, { Component } from 'react';
import {CityPills} from './CityPills';
import { Row, Col } from 'react-bootstrap';

export class RevenuePage extends Component {
    
    render(){
        return (
            <div>
                <Row>
                    <Col>
                        <h1>Revenue Sources for Selected Municipalities</h1>
                        <CityPills muniData={this.props.muniData} cities={["test1", "test2", "test3", "test4", "test5"]}></CityPills>
                    </Col>
                </Row>
            </div>
        )
    }
}

