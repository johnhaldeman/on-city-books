import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StatePage } from './StatPage.js';

class App extends Component {

  render() {
    console.log(this.props.match);

    return (
      <div>
        <Router>
          <div>
            <Route path="/:page(revenue|expense|defisurp)/:aggregate(total|capita|household|percentage)" exact component={StatePage} />
          </div>
        </Router>
      </div>
    );
  }


}

export default App;
