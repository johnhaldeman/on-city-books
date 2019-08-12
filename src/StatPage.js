import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CityPills } from './CityPills';
import { RevenuePage } from './RevenuePage';
import { DefisurpPage } from './DefisurpPage';
import { ExpensePage } from './ExpensePage';
import { RankingPage } from './RankingPage';
import { DetailsPage } from './DetailsPage';
import { CapitalAssetsPage } from './CapitalAssetsPage';
import { Header } from './Header';





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
      return <ExpensePage agg={agg} cities={this.props.cities} selectedCities={this.props.selectedCities}></ExpensePage>
    }
    else if(type === "defisurp"){
      return <DefisurpPage agg={agg} cities={this.props.cities} selectedCities={this.props.selectedCities}></DefisurpPage>
    }
    else if(type === "capitalassets"){
      return <CapitalAssetsPage agg={agg} cities={this.props.cities} selectedCities={this.props.selectedCities}></CapitalAssetsPage>
    }
    else if(type === "rankings"){
      return <RankingPage agg={agg} cities={this.props.cities} muniData={this.props.muniData} items={this.props.rankDescData} selectedCities={this.props.selectedCities} 
                item={this.props.match.params.rankitem} year={this.props.match.params.year} tier={this.props.match.params.tier}></RankingPage>
    }
    else if(type === "alldata"){
      return <DetailsPage agg={agg} cities={this.props.cities} muniData={this.props.muniData} items={this.props.rankDescData} selectedCities={this.props.selectedCities} 
                {...this.props.match.params}></DetailsPage>
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
    if (this.props.match.params.city4) {
      cities.push(this.findMuni(this.props.match.params.city4));
    }
    if (this.props.match.params.city5) {
      cities.push(this.findMuni(this.props.match.params.city5));
    }

    return cities;
  }

  componentDidMount() {
    let munis = this.findMunis();

    this.props.selectCities(munis);
  }

  render() {    
    let munis = this.findMunis();

    let statsType = "revenue";
    let statsHeader = "Revenue";

    if (this.props.match.params.page !== undefined) {
      statsType = this.props.match.params.page;
    }

    if (statsType === "expense") {
      statsHeader = "Expenses";
    }
    else if (statsType === "defisurp") {
      statsHeader = "Deficits/Surpluses";
    }
    else if(statsType === "rankings"){
      statsHeader = "Rankings";
    }
    else if(statsType === "alldata"){
      statsHeader = "All Data for Cities";
    }
    else if(statsType === "capitalassets"){
      statsHeader = "Tangible Capital Assets";
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
        <Header params={this.props.match.params}
                statsType={statsType}
                statsHeader={statsHeader}
                agg={agg}
                aggHeader={aggHeader}>
        </Header>

        <Container fluid={true}>
          <Row>
            <Col>
              <CityPills type={statsType}
                agg={agg}
                citySelected={this.props.citySelected}
                muniData={this.props.muniData}
                cities={munis}
                {...this.props.match.params}
                >
              </CityPills>
            </Col>
          </Row>
            {this.renderGraphSection(statsType, agg)}
        </Container>
      </div>
    )
  }

}
