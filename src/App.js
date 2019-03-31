import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StatePage } from './StatPage.js';
import axios from 'axios';
import { CityPills } from './CityPills';

class App extends Component {

  constructor(props){
    super(props);
    this.muniCache = {};
    this.currentCities = [];

    this.state ={muniData: undefined, munis: [], test: "hello"};

    this.httpClient = axios.create({
      baseURL: '/munis/v1',
      timeout: 10000
    });

    console.log("constructor");

    this.httpClient.get('muniList.json')
      .then((response) => {
        this.setState({muniData: response.data});
      })
      .catch((err) => {
        console.log(err);
      });


  }

  loadMuniData(muni_id, index){
    this.muniCache[muni_id] = "loading";

    this.httpClient.get(muni_id + '.json')
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
    return (props) => <StatePage cities={this.state.munis} muniData={this.state.muniData} selectCities={this.selectCities()} {...props} />
  }

  selectCities(){
    //let that = this;
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

        this.setState({munis: newmunis}); 
      }
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/:page(revenue|expense|defisurp)/:aggregate(total|capita|household|percentage)/:city1/:city2/:city3" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp)/:aggregate(total|capita|household|percentage)/:city1/:city2" exact component={this.getStatePage()}/>
            <Route path="/:page(revenue|expense|defisurp)/:aggregate(total|capita|household|percentage)/:city1" exact component={this.getStatePage()} />
            <Route path="/:page(revenue|expense|defisurp)/:aggregate(total|capita|household|percentage)" exact component={this.getStatePage()} />
            <Route path="/" exact component={this.getStatePage()} />
          </Switch>
        </Router>
      </div>
    );
  }


}

export default App;
