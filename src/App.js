import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col } from 'react-bootstrap';
import { LinearBubbleChart } from './LinearBubbleChart';
import { StackedBarChart } from './StackedBarChart';

class App extends Component {

  cityData = [
    {
      city: "Windsor",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 607577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ]
    },
    {
      city: "London",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 215492558},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 307577881},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ]
    },
    {
      city: "Sarnia",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 124920913},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 307577881},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124692455}
      ]
    },
    {
      city: "Kingston",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 307577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 124692455},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 215492558},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ]
    },
    {
      city: "Thunder Bay",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 307577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ]
    },
    {
      city: "Ottawa",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 215492558},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 307577881},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ]
    }
  ];

  colours = [
    "blues",
    "yellows",
    "greens",
    "reds",
    "purples",
    "greys"
  ];

  variants = [
    "primary",
    "warning",
    "success",
    "danger",
    "info",
    "dark"
  ];

  renderBubbleGraphs(){
    let colours = this.colours;
    return this.cityData.map(function(data, i){
      return (<Col key={i} xs={12} md={6}>
          <h4 className="text-center" >{data.city}</h4>
          <LinearBubbleChart colours={colours[i]} data={data.revenue_streams}></LinearBubbleChart>
          <br/><br/>
        </Col>)
    })
  }

  renderCityPills(){
    let variants = this.variants;
    return this.cityData.map(function(data, i){
      if(variants[i] !== "info")
        return (<Badge variant={variants[i]} key={i} pill >&times; {data.city} &nbsp;</Badge>)
      else
        return (<Badge className="purple" variant={variants[i]} key={i} pill >&times; {data.city} &nbsp;</Badge>)
    })
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
             <h2>Municipality Revenues - Total Value</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              {this.renderCityPills()}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Badge style={{"borderStyle": "solid", "borderColor": "LightSlateGrey"}} variant="light" pill >+ Add New City &nbsp;</Badge>
              <br/><br/><br/>
            </Col>
          </Row>
          <Row>
            {this.renderBubbleGraphs()}
          </Row>

          <Row>
            <StackedBarChart></StackedBarChart>
          </Row>

        </Container>
      </div>
    );
  }
}

export default App;
