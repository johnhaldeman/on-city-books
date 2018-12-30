import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';

export class CityPills extends Component {

    constructor(props) {
        super(props);

    }

    variants = [
        "primary",
        "warning",
        "success",
        "danger",
        "info",
        "dark"
      ];

    getPills(){
        let cities = [];
        if(this.props.cities !== undefined){
            cities = this.props.cities;
        }
        let variants = this.variants;
        return cities.map(function (data, i) {
            if (variants[i] !== "info")
                return (<Badge variant={variants[i]} key={i} pill >&times; {data} &nbsp;</Badge>)
            else
                return (<Badge className="purple" variant={variants[i]} key={i} pill >&times; {data} &nbsp;</Badge>)
        })
    }

    render() {
        return(
            <div>
                {this.getPills()}
                &nbsp; &nbsp;&nbsp;&nbsp;
                <Badge style={{"borderStyle": "solid", "borderColor": "LightSlateGrey"}} variant="light" pill >+ Add New City &nbsp;</Badge>
                <br/><br/><br/>
            </div>
        );
    }

}