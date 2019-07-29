import React, { Component } from 'react';
import { Badge, Button, Alert } from 'react-bootstrap';
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
        "dark",
        "info",
        "danger"
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

    getMessage(){
        if(this.props.type !== "rankings" && (this.props.cities === undefined || this.props.cities.length === 0)){
            return (
                <Alert variant="primary">
                    Select a city using the "Add New City" button above to get started
                </Alert>
            )
        }
    }
  

    render() {
        if (this.state.citySelected !== undefined && !this.redirected) {
            this.redirected = true;

            if(this.props.type === "rankings"){
                return <Redirect to={"/" + this.props.type + "/" + this.props.agg +  "/rankitem-" + this.props.rankitem + "/year-" + this.props.year + "/tier-"  + this.props.tier + this.getCityNamesSlashDelimited(this.props.cities) + "/" + this.state.citySelected }  />;
            }
            else if(this.props.type === "alldata"){
                return <Redirect to={"/" + this.props.type + "/" + this.props.agg +  "/schedule-" + this.props.schedule + "/selected-" + this.state.citySelected + "/year-"  + this.props.year + this.getCityNamesSlashDelimited(this.props.cities) + "/" + this.state.citySelected }  />;
            }
            else{
                return <Redirect to={"/" + this.props.type + "/" + this.props.agg + this.getCityNamesSlashDelimited(this.props.cities) + "/" + this.state.citySelected }  />;
            }
        }

        if (this.state.cityRemoved !== undefined && !this.redirected) {
            this.redirected = true;
            let newCityList = this.props.cities.slice(0);
            newCityList.splice(this.state.cityRemoved, 1);

            if(this.props.type === "rankings"){
                return <Redirect to={"/" + this.props.type + "/" + this.props.agg +  "/rankitem-" + this.props.rankitem + "/year-" + this.props.year + "/tier-"  + this.props.tier + this.getCityNamesSlashDelimited(newCityList)}  />;
            }
            else if(this.props.type === "alldata"){
                return <Redirect to={"/" + this.props.type + "/" + this.props.agg +  "/schedule-" + this.props.schedule + "/selected-" + this.props.cities[0].id + "/year-"  + this.props.year + this.getCityNamesSlashDelimited(newCityList)}  />;
            }
            else{
                return <Redirect to={"/" + this.props.type + "/" + this.props.agg + this.getCityNamesSlashDelimited(newCityList)}  />;
            }
        }

        return(
            <div>
                <br/>
                {this.getPills()}
                &nbsp; &nbsp;&nbsp;&nbsp;
                <Button size="sm" disabled={this.props.cities.length >= 3} onClick={this.handleShow} className={this.props.cities.length <= 2 ? "full-size-text pointer-cursor" : "full-size-text pointer-no"} variant="dark" >+ Add New City &nbsp;</Button>
                <br/><br/>

                <CitySelectionModal citySelected={this.citySelected} currentURL={this.props.currentURL} muniData={this.props.muniData} show={this.state.show} onHide={this.handleHide}></CitySelectionModal>

                {this.getMessage()}
            </div>
        );
    }

}