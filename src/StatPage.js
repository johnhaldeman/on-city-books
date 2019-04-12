import React, { Component } from 'react';
import { Navbar, Container, DropdownButton, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { CityPills } from './CityPills';
import { RevenuePage } from './RevenuePage';
import { DefisurpPage } from './DefisurpPage';
import { ExpensePage } from './ExpensePage';



function DropDownItem(props) {
  let className = "dropdown-item";
  if (props.active) {
    className += " active";
  }

  let link = "/" + props.item + "/" + props.subitem;
  if(props.city1){
    link += "/" + props.city1;
  }
  if(props.city2){
    link += "/" + props.city2;
  }
  if(props.city3){
    link += "/" + props.city3;
  }


  return (
    <Link className={className} to={link}>{props.name}</Link>
  )
}

export class StatePage extends Component {

  constructor(props) {
    super(props);

    this.state = { munis: {} };

  }

  renderGraphSection(type, agg){
    if(type === "revenue"){
      return <RevenuePage agg={agg} cities={this.props.cities} selectedCities={this.props.selectedCities}></RevenuePage>
    }
    else if(type === "expense"){
      return <ExpensePage ></ExpensePage>
    }
    else if(type === "defisurp"){
      return <DefisurpPage ></DefisurpPage>
    }
  }

  findMuni(id) {
    for (let muni of this.props.muniData) {
      if (muni.id === id) {
        return muni;
      }
    }
    return {};
  }

  findMunis() {
    if (this.props.muniData === undefined) {
      return [];
    }

    let cities = [];

    if (this.props.match.params.city1) {
      cities.push(this.findMuni(this.props.match.params.city1));
    }
    if (this.props.match.params.city2) {
      cities.push(this.findMuni(this.props.match.params.city2));
    }
    if (this.props.match.params.city3) {
      cities.push(this.findMuni(this.props.match.params.city3));
    }

    return cities;
  }

  componentDidMount() {
    let munis = this.findMunis();

    this.props.selectCities(munis);
  }

  render() {
    let statsType = "revenue";
    let statsHeader = "Revenue";
    let munis = this.findMunis();

    if (this.props.match.params.page !== undefined) {
      statsType = this.props.match.params.page;
    }

    if (statsType === "expense") {
      statsHeader = "Expenses";
    }
    else if (statsType === "defisurp") {
      statsHeader = "Deficits/Surpluses";
    }

    let agg = "total";
    let aggHeader = "Total Value";

    if (this.props.match.params.aggregate !== undefined) {
      agg = this.props.match.params.aggregate;
    }

    if (agg === "capita") {
      aggHeader = "Per Capita";
    }
    else if (agg === "household") {
      aggHeader = "Per Household";
    }
    else if (agg === "percentage") {
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
              <DropDownItem item="revenue" subitem={agg} active={statsType === "revenue"} name="Revenues"
                    city1={this.props.match.params.city1}
                    city2={this.props.match.params.city2}
                    city3={this.props.match.params.city3}>
              </DropDownItem>
              <DropDownItem item="expense" subitem={agg} active={statsType === "expense"} name="Expenses"
                    city1={this.props.match.params.city1}
                    city2={this.props.match.params.city2}
                    city3={this.props.match.params.city3}>
              </DropDownItem>
              <DropDownItem item="defisurp" subitem={agg} active={statsType === "defisurp"} name="Deficits/Surpluses"
                    city1={this.props.match.params.city1}
                    city2={this.props.match.params.city2}
                    city3={this.props.match.params.city3}
              ></DropDownItem>
            </DropdownButton>
            <DropdownButton className="pad-right" variant="success" id="dropdown-basic-button" title={aggHeader}>
              <DropDownItem item={statsType} subitem="total" active={agg === "total"} name="Total Value"
                    city1={this.props.match.params.city1}
                    city2={this.props.match.params.city2}
                    city3={this.props.match.params.city3}>
              </DropDownItem>
              <DropDownItem item={statsType} subitem="capita" active={agg === "capita"} name="Per Capita"
                    city1={this.props.match.params.city1}
                    city2={this.props.match.params.city2}
                    city3={this.props.match.params.city3}
              ></DropDownItem>
              <DropDownItem item={statsType} subitem="household" active={agg === "household"} name="Per Household"
                    city1={this.props.match.params.city1}
                    city2={this.props.match.params.city2}
                    city3={this.props.match.params.city3}>
              </DropDownItem>
              <DropDownItem item={statsType} subitem="percentage" active={agg === "percentage"} name="As Percentage"
                    city1={this.props.match.params.city1}
                    city2={this.props.match.params.city2}
                    city3={this.props.match.params.city3}
              ></DropDownItem>
            </DropdownButton>
          </Navbar.Collapse>
        </Navbar>



        <Container fluid={true}>
          <Row>
            <Col>
              <CityPills type={statsType}
                agg={agg}
                citySelected={this.props.citySelected}
                muniData={this.props.muniData}
                cities={munis}>
              </CityPills>
            </Col>
          </Row>
            {this.renderGraphSection(statsType, agg)}
        </Container>
      </div>
    )
  }

}
