import React, { Component } from 'react';
import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {RevenuePage} from './RevenuePage';
import {ExpensePage} from './ExpensePage';
import {DefisurpPage} from './DefisurpPage';


function DropDownItem(props){
  let className = "dropdown-item";
  if(props.active){
    className += " active";
  }

  return(
    <Link className={className} to={"/" + props.item + "/" + props.subitem}>{props.name}</Link>
  )
}

export class StatePage extends Component {

    constructor(props){
      super(props);

    }

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

        let agg = "total";
        let aggHeader = "Total Value";

        if(this.props.match.params.aggregate !== undefined){
            agg = this.props.match.params.aggregate;
        }

        if(agg === "capita"){
          aggHeader = "Per Capita";
        }
        else if(agg === "household"){
          aggHeader = "Per Household";
        }
        else if(agg === "percentage"){
          aggHeader = "As Percentage";
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
                <DropDownItem  item="revenue" subitem={agg} active={statsType === "revenue"} name="Revenues"></DropDownItem>
                <DropDownItem  item="expense" subitem={agg} active={statsType === "expense"} name="Expenses"></DropDownItem>
                <DropDownItem  item="defisurp" subitem={agg} active={statsType === "defisurp"} name="Deficits/Surpluses"></DropDownItem>
              </DropdownButton>
              <DropdownButton className="pad-right" variant="success" id="dropdown-basic-button" title={aggHeader}>
                <DropDownItem  item={statsType} subitem="total" active={agg === "total"} name="Total Value"></DropDownItem>
                <DropDownItem  item={statsType} subitem="capita" active={agg === "capita"} name="Per Capita"></DropDownItem>
                <DropDownItem  item={statsType} subitem="household" active={agg === "household"} name="Per Household"></DropDownItem>
                <DropDownItem  item={statsType} subitem="percentage" active={agg === "percentage"} name="As Percentage"></DropDownItem>
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
