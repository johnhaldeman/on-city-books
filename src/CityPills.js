import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { CitySelectionModal } from "./CitySelectionModal";

export class CityPills extends Component {

    constructor(props) {
        super(props);

        this.state = {show: false};

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
                return (<Badge className="full-size-text" variant={variants[i]} key={i} pill >&times; {data} &nbsp;</Badge>)
            else
                return (<Badge className="purple full-size-text" variant={variants[i]} key={i} pill >&times; {data} &nbsp;</Badge>)
        })
    }

    handleShow = () => {
        this.setState({ show: true });
    };
  
    handleHide = () => {
        this.setState({ show: false });
    };

    render() {
        return(
            <div>
                {this.getPills()}
                &nbsp; &nbsp;&nbsp;&nbsp;
                <Badge className="full-size-text" onClick={this.handleShow} style={{"borderStyle": "solid", "borderColor": "LightSlateGrey"}} variant="light" pill >+ Add New City &nbsp;</Badge>
                <br/><br/><br/>

                <CitySelectionModal muniData={this.props.muniData} show={this.state.show} onHide={this.handleHide}></CitySelectionModal>
            </div>
        );
    }

}