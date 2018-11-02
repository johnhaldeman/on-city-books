import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as d3 from "d3";


import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col } from 'react-bootstrap';

class App extends Component {
  cityData = [
    {
      city: "Windsor",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 307577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
        
        //{ description: "Total Revenues", calculation: "slc.10X.L9910.C01.01", value: 772683807},
      ]
    }
  ];

  dummy = [1, 2, 3];

  constructor(props){
    super(props);

    this.chartRef = React.createRef();

    let graphWidth = window.innerWidth - 20;
    if(graphWidth > 1400)
      graphWidth = 1400;
    let data = this.cityData[0].revenue_streams;
    let rMax = graphWidth / 8;
    let rMin = 0;
    let scaleMax = d3.max(data, function(d) { return d.value; });
    let scaleRadius = d3.scaleSqrt()
      .domain([0, scaleMax])
      .range([rMin,rMax]);

    this.state = {
      data: this.cityData[0].revenue_streams,
      scaleRadius: scaleRadius,
      graphWidth: graphWidth,
      rMax: rMax,
      rMain: rMin,
      graphHeight: scaleRadius(scaleMax) * 2 + 200
    }
  }

  componentDidMount(){

    let color = d3.schemeGreens[this.state.data.length + 2];
    
    let svg = d3.select(this.chartRef.current);

    let textWidth = 10;
    if(this.state.graphWidth > 700){
      textWidth = 14
    }

    let scale = this.state.scaleRadius;
    let rMax = this.state.rMax;

    let nodes = svg.selectAll(".graph")
      .data(this.state.data)
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        let x = i * rMax * 2 + rMax;
        let y = 0;
        return "translate(" + x + "," + y + ")"; 
      });

    nodes.append("circle")
      .attr('r', function(d) { return scale(d.value)})
      .attr('cx', function(d,i){ return 0 })//return i * rMax * 2 + rMax })
      .attr('cy', function(d,i){ return (rMax * 2) - scale(d.value)})
      .style("fill", function(d, i) { return color[color.length - (i + 1)]})
      ;
    
      nodes.append("text")
      .attr("text-anchor", "middle")
      .selectAll("tspan")
      .data(function(d) {
        let retArr = [];
        let wordArr = d.description.split(/\s/);
        let currentString = "";
        for(let i in wordArr){
          let word = wordArr[i];
          currentString = currentString + " " + word;
          if(currentString.length > 10){
            retArr.push({text: currentString, offset: scale(d.value)});
            currentString = "";
          }
        }
        retArr.push({text: currentString, offset: scale(d.value)})
        return retArr;
      })
      .enter().append("tspan")
        .text(function(d) {return d.text})
        .attr("font-size", textWidth)
        .attr("font-family", "sans-serif")
        .attr("x", 0)
        .attr("y", function(d, i, nodes){ return (i - (nodes.length/2 - 1)) * 14 + (rMax * 2) + nodes.length * 7 } )
      ;
    
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
              <Badge variant="info" className="purple" pill >&times; Kingston</Badge>
              <Badge variant="dark" pill >&times; Thunder Bay</Badge>
              &nbsp;&nbsp;&nbsp;&nbsp;<Badge variant="primary" pill >+ Add New City</Badge>
            </Col>
          </Row>

          <Row>
            <Col>
              <h1>Windsor</h1>
              <svg width="100%" height={this.state.graphHeight + 20} ref={this.chartRef}></svg>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default App;
