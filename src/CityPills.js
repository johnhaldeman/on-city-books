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

    getMessage(){
        let messages = [];
        if(this.props.type !== "rankings" && (this.props.cities === undefined || this.props.cities.length === 0)){
            messages.push (
                <Alert key="empty" variant="primary">
                    Select a city using the "Add New City" button above to get started.
                </Alert>
            )
        }
        if(this.props.agg === "total" && this.props.cities.length >= 2){
            messages.push (
                <Alert key="totals" variant="danger">
                    <strong>Warning: </strong>You are currently comparing municipalities but using raw totals. 
                    Consider switching to per capita or per household measures using the green "Total Value" drop down in the toolbar above.
                </Alert>
            )
        }

        let tiers = {};
        for(let city of this.props.cities){
            tiers[city.tier] = true;
        }
        if(Object.keys(tiers).length > 1){
            messages.push (
                <Alert key="tiers" variant="danger">
                    <strong>Warning: </strong>You are currently comparing municipalities in separate tiers. 
                    Single, Upper, and Lower tier municipalities have different responsibilities and as such this comparison may be of limited use.
                </Alert>
            )
        }

        if(window.innerWidth < 700 || window.innerHeight < 700){
            messages.push (
                <Alert key="tiers" variant="warning">
                    <strong>Warning: </strong>You appear to be using a device with a low screen resolution (mobile?). 
                    While we have attempted to make the application work with these devices, because of this application's
                    information density, it may be easier to see the data on a tablet, laptop, or desktop.
                </Alert>
            )
        }

        return messages;
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
                <Button size="sm" disabled={this.props.cities.length >= 5} onClick={this.handleShow} className={this.props.cities.length <= 2 ? "full-size-text pointer-cursor" : "full-size-text pointer-no"} variant="dark" >+ Add New City &nbsp;</Button>
                <br/><br/>

                <CitySelectionModal citySelected={this.citySelected} currentURL={this.props.currentURL} muniData={this.props.muniData} show={this.state.show} onHide={this.handleHide}></CitySelectionModal>

                {this.getMessage()}
            </div>
        );
    }

}