import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Container, DropdownButton, Dropdown, Row, Badge, Col } from 'react-bootstrap';
import { LinearBubbleChart } from './LinearBubbleChart';
import { StackedBarChart } from './StackedBarChart';

class App extends Component {

  
  years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];

  cityData = [
    {
      city: "Windsor",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu of Taxes", calculation: "slc.10X.L9940.C01.01", value: 307577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees and service charges (SLC 12 9910 04)", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ],
      year_data: [
        { year: 2009,  prop_taxes: 194905955.42706, grants: 197191494.556275, user_fees: 99235976.4256422, other: 129991325.343884, total: 621324751.752861},
        { year: 2010,  prop_taxes: 393217804.075982, grants: 298498196.753965, user_fees: 181240249.60951, other: 183205924.291454, total: 1056162174.73091},
        { year: 2011,  prop_taxes: 270043741.875023, grants: 232143710.932929, user_fees: 97203021.2779386, other: 132772118.902633, total: 732162592.988523},
        { year: 2012,  prop_taxes: 179704966.254443, grants: 237851907.684686, user_fees: 63471052.3008117, other: 165738899.779111, total: 646766826.019051},
        { year: 2013,  prop_taxes: 198107754.932328, grants: 215006919.638603, user_fees: 140314794.222512, other: 183593100.613887, total: 737022569.40733},
        { year: 2014,  prop_taxes: 184398824.448975, grants: 244710028.554601, user_fees: 120102938.680724, other: 85380474.3957532, total: 634592266.080054},
        { year: 2015,  prop_taxes: 199372490.148397, grants: 138958190.740235, user_fees: 108357090.922171, other: 145550690.28299, total: 592238462.093793},
        { year: 2016,  prop_taxes: 395130757.98699, grants: 253856615.836687, user_fees: 76672579.9703716, other: 118322811.300584, total: 843982765.094633}

      ]
    },
    {
      city: "London",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 215492558},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 307577881},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ],
      year_data: [
        { year: 2009, prop_taxes: 246781231.40392, grants: 250717859.082196, user_fees: 84022372.1169149, other: 123196483.115626, total: 704717945.718657},
        { year: 2010, prop_taxes: 337378912.878514, grants: 179827406.885892, user_fees: 150972248.348879, other: 158329506.839765, total: 826508074.95305},
        { year: 2011, prop_taxes: 235607572.225583, grants: 267362230.782504, user_fees: 110533416.711777, other: 109355670.172794, total: 722858889.892659},
        { year: 2012, prop_taxes: 289379862.207876, grants: 242543598.95452, user_fees: 157926925.636544, other: 99489534.4582651, total: 789339921.257206},
        { year: 2013, prop_taxes: 442880644.813725, grants: 272639038.710534, user_fees: 89919366.8477934, other: 154406083.082713, total: 959845133.454766},
        { year: 2014, prop_taxes: 308948515.508727, grants: 251712181.067756, user_fees: 130864861.305018, other: 88203910.6290533, total: 779729468.510555},
        { year: 2015, prop_taxes: 261891597.260469, grants: 215762193.837151, user_fees: 158171798.444655, other: 150977078.426298, total: 786802667.968573},
        { year: 2016, prop_taxes: 204316255.183416, grants: 156872407.55885, user_fees: 101381657.702847, other: 122926590.702981, total: 585496911.148094}

      ]
    }/*,
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
    }*/
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
            <Col>
              <StackedBarChart data={this.cityData} years={this.years}></StackedBarChart>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default App;
