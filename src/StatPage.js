import React, { Component } from 'react';
import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class StatePage extends Component {

    render(){
        let statsType = "revenue";

        if(this.props.match !== undefined){
            statsType = this.props.match.params.page;
        }

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
                <Link className="dropdown-item" to="/revenue/total">Revenues </Link>
                <Link className="dropdown-item" to="/expense/total">Expenses </Link>
                <Link className="dropdown-item" to="/defisurp/total">Deficits/Surpluses </Link>
              </DropdownButton>
              <DropdownButton className="pad-right" variant="success" id="dropdown-basic-button" title="Total Value">
                <Link className="dropdown-item" to={"/" + statsType + "/total"}>Total Value</Link>
                <Link className="dropdown-item" to={"/" + statsType + "/capita"}>Per Capita</Link>
                <Link className="dropdown-item" to={"/" + statsType + "/household"}>Per Household</Link>
                <Link className="dropdown-item" to={"/" + statsType + "/percentage"}>As Percentage</Link>
              </DropdownButton>
            </Navbar.Collapse>
          </Navbar>
        </div>
        )
    }

}
