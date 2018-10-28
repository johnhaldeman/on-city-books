import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as d3 from "d3";

import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col, Pagination } from 'react-bootstrap';

class App extends Component {
  cityData = [
    {
      city: "Windsor",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu of Taxes", calculation: "slc.10X.L9940.C01.01", value: 307577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees and service charges (SLC 12 9910 04)", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
        
        //{ description: "Total Revenues", calculation: "slc.10X.L9910.C01.01", value: 772683807},
      ]
    }
  ];

  dummy = [1, 2, 3];

  constructor(props){
    super(props);

    this.chartRef = React.createRef();

    this.state = {
      graphWidth: window.innerWidth - 20
    }
  }

  componentDidMount(){
    let data = this.cityData[0].revenue_streams;
    let rMax = this.state.graphWidth / 8;
    let rMin = 10;

    let scaleRadius = d3.scaleSqrt()
      .domain([d3.min(data, function(d) { return d.value; }), 
               d3.max(data, function(d) { return d.value; })])
      .range([rMin,rMax]);
    
    let svg = d3.select(this.chartRef.current);
    
    let node = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr('r', function(d) { return scaleRadius(d.value)})
      .attr('cx', function(d,i){ return i * rMax * 2 + rMax })
      .attr('cy', function(d,i){
        return (rMax * 2) - scaleRadius(d.value)}); 
    
  }


  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" collapseOnSelect expand="md">
          <Navbar.Brand href="#home">
            ON City Books
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Text>
              Visualizations for Ontario Municipal Financial Data
            </Navbar.Text>
          </Navbar.Collapse>          
          <Navbar.Collapse className="justify-content-end">
            <DropdownButton className="pad-right" variant="danger" id="dropdown-basic-button" title="Revenues">
              <Dropdown.Item active href="#/Revenues">Revenues</Dropdown.Item>
              <Dropdown.Item href="#/Expenses">Expenses</Dropdown.Item>
              <Dropdown.Item href="#/Deficits">Deficits/Surpluses</Dropdown.Item>
            </DropdownButton>
            <DropdownButton className="pad-right" variant="success" id="dropdown-basic-button" title="Total Value">
              <Dropdown.Item active href="#/Revenues">Total Value</Dropdown.Item>
              <Dropdown.Item href="#/Expenses">Per Capita</Dropdown.Item>
              <Dropdown.Item href="#/Expenses">Per Household</Dropdown.Item>
              <Dropdown.Item href="#/Expenses">As Percentage</Dropdown.Item>
            </DropdownButton>
          </Navbar.Collapse>
        </Navbar>

        <Container fluid={true}>
          <Row>
            <Col>
              <Badge variant="primary" pill >&times; Windsor</Badge>
              <Badge variant="success" pill >&times; Toronto</Badge>
              <Badge variant="danger" pill >&times; Ottawa</Badge>
              <Badge variant="warning" pill >&times; London</Badge>
              <Badge variant="info" pill >&times; Kingston</Badge>
              <Badge variant="dark" pill >&times; Thunder Bay</Badge>
              &nbsp;&nbsp;&nbsp;&nbsp;<Badge variant="primary" pill >+ Add New City</Badge>
            </Col>
          </Row>

          <Row>
            <Col>
              <h1>Windsor</h1>
              <svg width={this.state.graphWidth} height="400" ref={this.chartRef}></svg>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default App;
