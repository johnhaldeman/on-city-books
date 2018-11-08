import React, { Component } from 'react';
import * as d3 from "d3";

export class StackedBarChart extends Component {

    constructor(props){
        super(props);

        this.chartRef = React.createRef();

    }

    componentDidMount(){

    }

    render(){        
        return <svg width="100%" ref={this.chartRef}></svg>
    }

}

