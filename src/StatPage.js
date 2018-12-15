import React, { Component } from 'react';
import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {RevenuePage} from './RevenuePage';
import {ExpensePage} from './ExpensePage';
import {DefisurpPage} from './DefisurpPage';

export class StatePage extends Component {

    renderGraphSection(type){
      if(type === "revenue"){
        return <RevenuePage></RevenuePage>
      }
      else if(type === "expense"){
        return <ExpensePage></ExpensePage>
      }
      else if(type === "defisurp"){
        return <DefisurpPage></DefisurpPage>
      }
    }

    render(){
        let statsType = "revenue";
        let statsHeader = "Revenue";

        if(this.props.match.params.page !== undefined){
            statsType = this.props.match.params.page;
        }

        if(statsType === "expense"){
          statsHeader = "Expenses";
        }
        else if(statsType === "defisurp"){
          statsHeader = "Deficits/Surpluses";
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
              <DropdownButton className="pad-right" variant="danger" id="dropdown-basic-button" title={statsHeader}>
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

          

          <Container fluid={true}>
              {this.renderGraphSection(statsType)}
          </Container>
        </div>
        )
    }

}
