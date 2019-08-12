import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StatePage } from './StatPage.js';
import { XHRClient } from './XHRClient';
import { About } from "./About"

class App extends Component {


  constructor(props){
    super(props);
    this.muniCache = {};
    this.currentCities = [];
    this.currentRanking = "";

    this.state ={muniData: undefined, descData: undefined, munis: [], test: "hello"};

    this.xhrClient = new XHRClient();

  }

  componentWillMount(){
    this.xhrClient.get('muniList.json')
      .then((response) => {
        this.setState({muniData: response.data,});
      })
      .catch((err) => {
        console.log(err);
      });

    this.xhrClient.get('descs.json')
      .then((response) => {
        this.setState({descData: response.data,});
      })
      .catch((err) => {
        console.log(err);
      });

    
    this.xhrClient.get('rankDescs.json')
      .then((response) => {
        this.setState({rankDescData: response.data,});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadMuniData(muni_id, index){
    this.muniCache[muni_id] = "loading";

    this.xhrClient.get(muni_id + '.json')
    .then((response) => {
      let newmunis = [...this.state.munis];
      newmunis[index] = response.data;
      this.setState({munis: newmunis});

      this.muniCache[muni_id] = response.data;
    })
    .catch((err) => {
      console.log(err);
    });    
  }

  getStatePage(){
    return (props) => <StatePage descData={this.state.descData} cities={this.state.munis} 
        selectedCities={this.state.selectedCities} 
        muniData={this.state.muniData} rankDescData={this.state.rankDescData} selectCities={this.selectCities()}
        {...props} />
  }

  selectCities(){
    return (munis) => {
      let same = true;
      for(let i = 0; i < munis.length; i++){
        if(munis[i].id !== this.currentCities[i]){
          same = false;
        }
      }

      if(!same || this.currentCities.length !== munis.length){
        this.currentCities = [];
        let newmunis = [...munis];
        for(let i = 0; i < munis.length; i++){
          if(this.muniCache[munis[i].id] !== undefined){
            newmunis[i] = this.muniCache[munis[i].id];
          }
          else{
            newmunis[i] = {id: munis[i].id, desc: munis[i].name};
            this.loadMuniData(munis[i].id, i);
          }
          this.currentCities.push(munis[i].id);
        }

        this.setState({munis: newmunis, selectedCities: munis}); 
      }
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/rankitem-:rankitem/year-:year/tier-:tier/:city1/:city2/:city3/:city4/:city5" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/rankitem-:rankitem/year-:year/tier-:tier/:city1/:city2/:city3/:city4" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/rankitem-:rankitem/year-:year/tier-:tier/:city1/:city2/:city3" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/rankitem-:rankitem/year-:year/tier-:tier/:city1/:city2" exact component={this.getStatePage()}/>
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/rankitem-:rankitem/year-:year/tier-:tier/:city1" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/rankitem-:rankitem/year-:year/tier-:tier/" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/schedule-:schedule/selected-:selectedCity/year-:year/:city1/:city2/:city3/:city4/:city5" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/schedule-:schedule/selected-:selectedCity/year-:year/:city1/:city2/:city3/:city4" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/schedule-:schedule/selected-:selectedCity/year-:year/:city1/:city2/:city3" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/schedule-:schedule/selected-:selectedCity/year-:year/:city1/:city2" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/schedule-:schedule/selected-:selectedCity/year-:year/:city1" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/schedule-:schedule/selected-:selectedCity/year-:year" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/:city1/:city2/:city3/:city4/:city5" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/:city1/:city2/:city3/:city4" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/:city1/:city2/:city3" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/:city1/:city2" exact component={this.getStatePage()}/>
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)/:city1" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp|rankings|alldata|capitalassets)/:aggregate(total|capita|household|percentage)" exact component={this.getStatePage()} />
            <Route path="/about" exact component={About} />
            <Route path="/" exact component={this.getStatePage()} />
          </Switch>
        </Router>
      </div>
    );
  }


}

export default App;
