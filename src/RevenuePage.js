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
                        <CityPills type={this.props.type} 
                            agg={this.props.agg} 
                            citySelected={this.props.citySelected} 
                            muniData={this.props.muniData} 
                            cities={this.props.munis}>
                        </CityPills>
                    </Col>
                </Row>
            </div>
        )
    }
}

