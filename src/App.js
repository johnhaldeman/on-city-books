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
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
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
    },
    {
      city: "Sarnia",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 124920913},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 307577881},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124692455}
      ],
      year_data:[
        { year: 2009, prop_taxes: 324705754.708326, grants: 239559515.054586, user_fees: 97217234.7085082, other: 62518434.4146244, total: 724000938.886044},
        { year: 2010, prop_taxes: 194187242.624533, grants: 232035956.421061, user_fees: 113592366.88639, other: 145552389.802935, total: 685367955.734919},
        { year: 2011, prop_taxes: 419697966.830345, grants: 166716300.570562, user_fees: 139417259.380724, other: 94763633.3846904, total: 820595160.166321},
        { year: 2012, prop_taxes: 376195779.472612, grants: 268970330.87555, user_fees: 160802904.413812, other: 112730279.213231, total: 918699293.975206},
        { year: 2013, prop_taxes: 412736893.202107, grants: 133457199.83943, user_fees: 130705677.126025, other: 161447210.600013, total: 838346980.767576},
        { year: 2014, prop_taxes: 388512447.725527, grants: 134566919.000971, user_fees: 116217294.940834, other: 168257061.01932, total: 807553722.686652},
        { year: 2015, prop_taxes: 186852713.50285, grants: 133361057.658993, user_fees: 158952308.227735, other: 87691565.2153195, total: 566857644.604897},
        { year: 2016, prop_taxes: 298624329.955796, grants: 136438352.032525, user_fees: 90195828.3472289, other: 145399486.069118, total: 670657996.404668}

      ]
    },
    {
      city: "Kingston",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 307577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 124692455},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 215492558},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ],
      year_data:[
        { year: 2009, prop_taxes: 390585389.561972, grants: 140165672.897242, user_fees: 65871006.1653452, other: 179933702.225415, total: 776555770.849973},
        { year: 2010, prop_taxes: 190047780.124435, grants: 171561678.211849, user_fees: 150506682.997711, other: 163669949.920301, total: 675786091.254297},
        { year: 2011, prop_taxes: 353695005.122571, grants: 156067303.224674, user_fees: 120494329.487825, other: 130256132.939717, total: 760512770.774787},
        { year: 2012, prop_taxes: 168555920.86194, grants: 286306292.65405, user_fees: 102767919.489509, other: 176835297.734381, total: 734465430.73988},
        { year: 2013, prop_taxes: 199749949.192574, grants: 207424914.705419, user_fees: 71389777.2792197, other: 164185459.137235, total: 642750100.314448},
        { year: 2014, prop_taxes: 171827803.414363, grants: 224272877.086695, user_fees: 119351230.335959, other: 128681939.90373, total: 644133850.740746},
        { year: 2015, prop_taxes: 170243740.698288, grants: 227519483.353549, user_fees: 135766301.901928, other: 184546176.849881, total: 718075702.803646},
        { year: 2016, prop_taxes: 417936536.832018, grants: 266238821.437914, user_fees: 139543350.427068, other: 89155495.5998091, total: 912874204.29681}
      ]
    },
    {
      city: "Thunder Bay",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 307577881},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 215492558},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ],
      year_data:[
        { year: 2009, prop_taxes: 221953578.681196, grants: 295992523.153312, user_fees: 105596617.99798, other: 131298453.637836, total: 754841173.470325},
        { year: 2010, prop_taxes: 190100555.377052, grants: 110457873.207211, user_fees: 120001232.692436, other: 86189545.9968743, total: 506749207.273573},
        { year: 2011, prop_taxes: 231292878.595426, grants: 198313803.23741, user_fees: 184500370.085029, other: 181431224.319679, total: 795538276.237545},
        { year: 2012, prop_taxes: 379472454.750869, grants: 197180864.720818, user_fees: 130710349.607662, other: 128550544.976869, total: 835914214.056218},
        { year: 2013, prop_taxes: 221619050.133726, grants: 238574435.595319, user_fees: 67732852.0440416, other: 137856916.852492, total: 665783254.625579},
        { year: 2014, prop_taxes: 365232223.955054, grants: 169468498.801724, user_fees: 125673764.138261, other: 77191520.6897171, total: 737566007.584756},
        { year: 2015, prop_taxes: 221734969.676156, grants: 153415016.509133, user_fees: 77443916.1083286, other: 65067654.2549858, total: 517661556.548604},
        { year: 2016, prop_taxes: 281215818.896721, grants: 148593857.094646, user_fees: 100479322.009454, other: 175509997.162829, total: 705798995.163651}
      ]
    },
    {
      city: "Ottawa",
      revenue_streams: [
        { description: "Property Taxes & Payments-In-Lieu", calculation: "slc.10X.L9940.C01.01", value: 215492558},
        { description: "Grants from Other Levels of Government", calculation: "slc.10X.L0899.C01.01 + slc.10X.L0699.C01.01", value: 307577881},
        { description: "Total user fees / service charges", calculation: "slc.10X.L1299.C01.01", value: 124692455},
        { description: "Other Revenues", calculation: "slc.10X.L9910.C01.01 - slc.10X.L9940.C01.01 - slc.10X.L0899.C01.01 - slc.10X.L0699.C01.01 - slc.10X.L1299.C01.01", value: 124920913}
      ],
      year_data:[
        { year: 2009, prop_taxes: 361084574.434201, grants: 181455561.319481, user_fees: 82821195.7186831, other: 81546182.9736186, total: 706907514.445983},
        { year: 2010, prop_taxes: 440079590.610595, grants: 204374394.650104, user_fees: 70764497.1173255, other: 161022573.986662, total: 876241056.364686},
        { year: 2011, prop_taxes: 373188391.721683, grants: 122086074.684901, user_fees: 178070463.155026, other: 103513700.167638, total: 776858629.729248},
        { year: 2012, prop_taxes: 223721140.593521, grants: 197796893.432135, user_fees: 151253651.970168, other: 127187838.695765, total: 699959524.691589},
        { year: 2013, prop_taxes: 343083590.716924, grants: 241149710.716976, user_fees: 101219003.369168, other: 151133118.245347, total: 836585423.048414},
        { year: 2014, prop_taxes: 220095939.612556, grants: 280169853.935274, user_fees: 149114533.221509, other: 186977898.092226, total: 836358224.861565},
        { year: 2015, prop_taxes: 350072771.09169, grants: 285385062.720618, user_fees: 98106332.3811053, other: 106171761.559527, total: 839735927.752941},
        { year: 2016, prop_taxes: 362278155.584148, grants: 261485529.020079, user_fees: 132558106.290402, other: 80849044.1135473, total: 837170835.008176}
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
            <Col>
              <StackedBarChart group="year" data={this.cityData} years={this.years}></StackedBarChart>
              <br/>
              <br/>
              <br/>
              <br/>
              
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default App;
