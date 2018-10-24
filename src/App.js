import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col, Button } from 'react-bootstrap';

class App extends Component {
  cityData = [
    {
      city: "Windsor",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu of Taxes", calculation: "slc.10X.L9940.C01.01", value: 307577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees and service charges (SLC 12 9910 04)", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913},
        { description: "Total Revenues", calculation: "slc.10X.L9910.C01.01", value: 772683807},
      ]
    }
  ];

  constructor(props) {
    super(props);


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
            <DropdownButton variant="danger" id="dropdown-basic-button" title="Choose a Financial Item">
              <Dropdown.Item active href="#/Revenues">Revenues</Dropdown.Item>
              <Dropdown.Item href="#/Expenses">Expenses</Dropdown.Item>
              <Dropdown.Item href="#/Deficits">Deficits/Surpluses</Dropdown.Item>
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

        </Container>
      </div>
    );
  }
}

export default App;
