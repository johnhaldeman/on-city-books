import React, { Component } from 'react';
import { Button, DropdownButton, Dropdown, ButtonToolbar, Alert } from 'react-bootstrap';
import { ItemSelectionModal } from './ItemSelectionModal';
import { Redirect } from 'react-router';
import { XHRClient } from './XHRClient';
import * as SortIcons from './SortIcons';
import * as d3 from "d3";
import * as utils from "./Utils"

export class RankingPage extends Component {
    
    dataTableFields = [
        { id: "muni_id", desc: "ID"},
        { id: "muni_name", desc: "Name"}
    ]

    unmounting = false;

    constructor(props){
        super(props);

        this.xhrClient = new XHRClient();

        this.state = {
            show: false
        }

        this.keyedMuniData = {};
        if(props.muniData !== undefined){
            for(let muni of props.muniData){
                this.keyedMuniData[muni.id] = muni;
            }
        }
        
        this.redirected = false;
    }

    componentWillUnmount(){
        this.unmounting = true;
    }

    componentWillMount(){
        this.unmounting = false;
    }

    componentDidMount(){
        this.loadRankData(this.props.item, this.props.year);
    }

    loadRankData(item, year){
        if(item !== undefined){
            this.xhrClient.get("rankings/"+ year + "/" + item + ".json")
            .then((response) => {
                if(!this.unmounting){
                    let sortKey = "";

                    if(this.props.items !== undefined) {
                        let keys = Object.keys(this.props.items[this.props.item].column_descs);
                        sortKey = keys[0];
                    }

                    this.setState({
                        rankData: response.data,
                        error: undefined,
                        sortColumn: sortKey,
                        ascDescModifier: -1
                    })
                }
            })
            .catch((err) => {
                if (err.response) {
                    if(err.response.status === 404){
                        this.setState({
                            rankData: [],
                            error: "It doesn't look like there is data for this item for this year - it may be new. Please try a different item or year."
                        })
                    }
                }
                else{
                    console.log(err);
                }
            });
        }
    }
    
    itemSelected() {
        return (item) => {
            this.redirected = false;
            this.loadRankData(item.key, this.props.year);
            this.handleHide();
            this.setState({itemSelected: item.key});
        }
    }

    yearSelected(year) {
        return () => {
            this.redirected = false;
            this.loadRankData(this.props.item, year);
            this.setState({yearSelected: year});
        }
    }

    tierSelected(tier){
        return () => {
            this.redirected = false;
            this.setState({tierSelected: tier})
        };
    }


    handleShow = () => {
        this.setState({ show: true });
    };
  
    handleHide = () => {
        this.setState({ show: false });
    };

    getCityNamesSlashDelimited(cityList){
        if(cityList === undefined){
            return "";
        }
        let retStr = "";
        for(let city of cityList){
            retStr += "/" + city.id;
        }
        return retStr;
    }

    changeSortColumn(column){
        return () =>{
            if(column !== this.state.sortColumn){
                this.setState({sortColumn: column, ascDescModifier: -1});
            }
            else{
                this.setState({ascDescModifier: this.state.ascDescModifier * -1})
            }
        }
    }

    getHeaders(item){
        let headers = this.dataTableFields.map( (field) => <th key={field.id}>{field.desc}</th>);
        

        if(item !== undefined){
            for(let column in item.column_descs){

                let icon = <SortIcons.SortIcon></SortIcons.SortIcon>;
                
                if(column === this.state.sortColumn){
                    if(this.state.ascDescModifier === 1){
                        icon = <SortIcons.AscSortIcon></SortIcons.AscSortIcon>;
                    }
                    else {
                        icon = <SortIcons.DescSortIcon></SortIcons.DescSortIcon>;
                    }
                }


                headers.push(<th onClick={this.changeSortColumn(column)} key={column}>{column + "-" + item.column_descs[column].desc} {icon}</th>)
            }
        }

        return headers;
    }

    getFormat(type){
        if(type === "text"){
            return d => d;
        }
        else if(type === "currency"){
            return d3.format('$,.0f');
        }
        else if(type === "percentage"){
            return d3.format('.0%');
        }
        else{
            return d3.format(',.0f');
        }
    }

    getClass(type, muni_id){
        let className = "";

        if(type === "text"){
            return className += "";
        }
        else{
            return className += " number-text";
        }
    }
    
    getRowClass(muni_id){
        let className = "";
        if(this.props.cities === undefined){
            className = "";
        }
        else if(this.props.cities[0] !== undefined && muni_id === this.props.cities[0].id){
            className = "table-primary";
        }
        else if(this.props.cities[1] !== undefined && muni_id === this.props.cities[1].id){
            className = "table-warning";
        }
        else if(this.props.cities[2] !== undefined && muni_id === this.props.cities[2].id){
            className = "table-success";
        }
        else if(this.props.cities[3] !== undefined && muni_id === this.props.cities[3].id){
            className = "table-danger";
        }
        else if(this.props.cities[4] !== undefined && muni_id === this.props.cities[4].id){
            className = "table-purple";
        }
        
        return className;
    }

    getRow(row){
        let retData = [];
        retData = this.dataTableFields.map( (field) => {
            return <td key={field.id + "-" + row.id}>{ row[field.id] } </td>
        })
        if(this.props.items === undefined){
            return;
        }
        for(let column in this.props.items[this.props.item].column_descs){
            let td = <td key={column + "-" + row.muni_id}></td>;
            if(row.columns[column] !== undefined){
                let type = this.props.items[this.props.item].column_descs[column].type;

                let elem = row.columns[column].dispAmount;
                if(type === "text"){
                    elem = row.columns[column].value_text;
                }

                let fmt = this.getFormat(type);

                td = <td className={this.getClass(type)} key={column + "-" + row.muni_id}>{fmt(elem)}</td>;
            }
            retData.push(td)
        }
        return retData;
    }

    getData(){
        if(this.state.rankData === undefined){
            return;
        }

        if(this.props.muniData === undefined){
            return;
        }
        

        let filteredData = this.state.rankData.filter(
            (row) => {
                return row.tier === this.props.tier
            }
        )

        let modifiedData = filteredData.map(d => {
            for(let key in d.columns){
                d.columns[key].dispAmount = utils.getAggregateValue(this.props.muniData, d.muni_id, d.columns[key].amount, this.props.agg);
            }
            return d;
        })

        modifiedData.sort((a , b) => {
            let aVal = Number.MIN_SAFE_INTEGER;
            let bVal = Number.MIN_SAFE_INTEGER;
            
            if( this.props.items !== undefined
                && this.props.items[this.props.item] !== undefined
                && this.props.items[this.props.item].column_descs[this.state.sortColumn] !== undefined
                ){

                let type = this.props.items[this.props.item].column_descs[this.state.sortColumn].type;

                if(type === "text"){
                    aVal = "";
                    bVal = "";
                }

                if(a.columns[this.state.sortColumn] !== undefined ){
                    if(type === "text"){
                        aVal = a.columns[this.state.sortColumn].value_text;
                    }
                    else{
                        aVal = a.columns[this.state.sortColumn].dispAmount;
                    }
                }
                
                if(b.columns[this.state.sortColumn] !== undefined ){
                    if(type === "text"){
                        bVal = b.columns[this.state.sortColumn].value_text;
                    }
                    else{
                        bVal = b.columns[this.state.sortColumn].dispAmount;
                    }
                }
            }

            if(aVal < bVal){
                return -1 * this.state.ascDescModifier;
            }
            else if(aVal > bVal){
                return 1 * this.state.ascDescModifier;
            }
            else{
                return 0;
            }
        })

        return modifiedData.map( (row) => {
            return <tr className={this.getRowClass(row.muni_id)} key={row.muni_id}>{this.getRow(row)}</tr>
        })
    }

    getMessages(){
        if(this.state.error !== undefined){
            return(
                <Alert variant="danger">
                    {this.state.error}
                </Alert>
            )
        }
    }

    render(){
        
        let year = "2017";
        if(this.state.yearSelected !== undefined){
            year = this.state.yearSelected;
        }
        else if(this.props.year === "undefined"){
            year = "2017";
        }
        else if(this.props.year !== undefined){
            year = this.props.year;
        }

        let tier = "ST";
        if(this.state.tierSelected !== undefined){
            tier = this.state.tierSelected;
        }
        else if(this.props.tier === "undefined"){
            tier = "ST";
        }
        else if(this.props.tier !== undefined){
            tier = this.props.tier;
        }

        let item = "";
        if(this.state.itemSelected !== undefined){
            item = this.state.itemSelected;
        }
        else if(this.props.item === "undefined"){
            item = "";
        }
        else if(this.props.item !== undefined){
            item = this.props.item;
        }

        if((this.state.tierSelected !== undefined || this.state.itemSelected !== undefined || this.state.yearSelected !== undefined) && !this.redirected) {
            this.redirected = true;
            return <Redirect to={"/rankings/" + this.props.agg + "/rankitem-" + item + "/year-" + year + "/tier-" + tier + this.getCityNamesSlashDelimited(this.props.selectedCities)}  />;
        }



        let header = <h2>Select an item using the button below to see a ranking</h2>;
        if(this.props.items !== undefined && this.props.item !== undefined && this.props.items[this.props.item] !== undefined) {
            header = <h2> {this.props.item + " - " + 
                this.props.items[this.props.item].schedule + " - " + 
                this.props.items[this.props.item].sub_schedule + " - " + 
                this.props.items[this.props.item].line_desc
            } </h2>
        };

        let selectedCategory = "FINANCIAL INFORMATION RETURN";
        if(this.props.items !== undefined && this.props.items[this.props.item] !== undefined && this.props.items[this.props.item].schedule !== undefined){
            selectedCategory = this.props.items[this.props.item].schedule;
        }
        
        let headers = [];
        if(this.props.items !== undefined){
            headers = this.getHeaders(this.props.items[this.props.item]);
        }

        return (
            <div>
                {header}
                <ButtonToolbar>
                    <Button onClick={this.handleShow} className="pad-right dropdown-toggle" variant="dark" id="dropdown-basic-button">
                        Select Item to Rank
                    </Button> &nbsp;
                    <DropdownButton className="pad-right" id="dropdown-item-button" variant="dark" title={year}>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2009')}>2009</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2010')}>2010</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2011')}>2011</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2012')}>2012</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2013')}>2013</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2014')}>2014</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2015')}>2015</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2016')}>2016</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2017')}>2017</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.yearSelected('2018')}>2018</Dropdown.Item>
                    </DropdownButton>
                    &nbsp;
                    <DropdownButton className="pad-right" id="dropdown-item-button" variant="dark" title={tier}>
                        <Dropdown.Item as="button" onClick={this.tierSelected('UT')}>Upper Tier</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.tierSelected('LT')}>Lower Tier</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={this.tierSelected('ST')}>Single Tier</Dropdown.Item>
                    </DropdownButton>
                </ButtonToolbar>
                <ItemSelectionModal category={selectedCategory} itemSelected={this.itemSelected()} itemData={this.props.items} show={this.state.show} onHide={this.handleHide}></ItemSelectionModal>
                
                <br/><br/>
                <table className="table table-bordered table-sm table-hover table-100pc">
                    <thead className="thead-dark">
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.getData()
                        }
                    </tbody>
                </table>
                
                <br/><br/>
                {this.getMessages()}
                
            </div>
        )
    }

}

