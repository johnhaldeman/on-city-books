import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col } from 'react-bootstrap';

class App extends Component {
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
              <Dropdown.Item href="#/Revenues">Revenues</Dropdown.Item>
              <Dropdown.Item href="#/Expenses">Expenses</Dropdown.Item>
              <Dropdown.Item href="#/Deficits">Deficits/Surpluses</Dropdown.Item>
            </DropdownButton>;
          </Navbar.Collapse>
        </Navbar>

        <Container fluid="true">
          <Row>
            <Col>
              <div>
                <Badge variant="primary">Windsor</Badge>
                <Badge variant="success">Toronto</Badge>
                <Badge variant="danger">Ottawa</Badge>
                <Badge variant="warning">London</Badge>
                <Badge variant="info">Kingston</Badge>
                <Badge variant="dark">Thunder Bay</Badge>
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default App;
