import React, { Component } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { CitySelectionModal } from "./CitySelectionModal";
import {Redirect} from 'react-router';

export class CityPills extends Component {

    constructor(props) {
        super(props);

        this.redirected = false;

        this.state = {show: false, citySelected: undefined, cityRemoved: undefined};

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
        return cities.map((data, i) => {
            if (variants[i] !== "info")
                return (<Badge onClick={this.cityRemoved(i)} className="full-size-text" variant={variants[i]} key={i} pill >&times; {data.name} &nbsp;</Badge>)
            else
                return (<Badge onClick={this.cityRemoved(i)} className="purple full-size-text" variant={variants[i]} key={i} pill >&times; {data.name} &nbsp;</Badge>)
        })
    }

    handleShow = () => {
        this.setState({ show: true });
    };
  
    handleHide = () => {
        this.setState({ show: false });
    };


    citySelected = (muni) =>{
        this.setState({citySelected: muni.id});
        this.handleHide();

        this.redirected = false;
    }

    cityRemoved = (index) => {
        return () => {
            this.setState({cityRemoved : index});
        }
    }

    getCityNamesSlashDelimited(cityList){
        let retStr = "";
        for(let city of cityList){
            retStr += "/" + city.id;
        }
        return retStr;
    }
  

    render() {
        if (this.state.citySelected !== undefined && !this.redirected) {
            this.redirected = true;
            return <Redirect to={"/" + this.props.type + "/" + this.props.agg + this.getCityNamesSlashDelimited(this.props.cities) + "/" + this.state.citySelected }  />;
        }

        if (this.state.cityRemoved !== undefined && !this.redirected) {
            this.redirected = true;
            let newCityList = this.props.cities.slice(0);
            newCityList.splice(this.state.cityRemoved, 1);
            return <Redirect to={"/" + this.props.type + "/" + this.props.agg + this.getCityNamesSlashDelimited(newCityList)}  />;
        }

        return(
            <div>
                <br/>
                {this.getPills()}
                &nbsp; &nbsp;&nbsp;&nbsp;
                <Button size="sm" disabled={this.props.cities.length >= 5} onClick={this.handleShow} className={this.props.cities.length <= 4 ? "full-size-text pointer-cursor" : "full-size-text pointer-no"} variant="dark" >+ Add New City &nbsp;</Button>
                <br/><br/>

                <CitySelectionModal citySelected={this.citySelected} currentURL={this.props.currentURL} muniData={this.props.muniData} show={this.state.show} onHide={this.handleHide}></CitySelectionModal>
            </div>
        );
    }

}