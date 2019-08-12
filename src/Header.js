import React, { Component } from 'react';
import { Navbar, DropdownButton } from 'react-bootstrap';
import { Link } from "react-router-dom";


function DropDownItem(props) {
    let className = "dropdown-item";
    if (props.active) {
        className += " active";
    }

    let link = "/" + props.item + "/" + props.subitem;
    if (props.rankitem) {
        link += "/rankitem-" + props.rankitem;
    }
    if (props.schedule) {
        link += "/schedule-" + props.schedule;
    }
    if (props.selectedCity) {
        link += "/selected-" + props.selectedCity;
    }
    if (props.year) {
        link += "/year-" + props.year;
    }
    if (props.tier) {
        link += "/tier-" + props.tier;
    }
    if (props.city1) {
        link += "/" + props.city1;
    }
    if (props.city2) {
        link += "/" + props.city2;
    }
    if (props.city3) {
        link += "/" + props.city3;
    }
    if (props.city4) {
        link += "/" + props.city4;
    }
    if (props.city5) {
        link += "/" + props.city5;
    }


    return (
        <Link className={className} to={link}>{props.name}</Link>
    )
}


export class Header extends Component {


    render() {

        let getPrecentageButton = () => {
            if (this.props.statsType !== "rankings" && this.props.statsType !== "alldata") {
                return (
                    <DropDownItem item={this.props.statsType} subitem="percentage" active={this.props.agg === "percentage"} name="As Percentage"
                        city1={this.props.params.city1}
                        city2={this.props.params.city2}
                        city3={this.props.params.city3}
                        city4={this.props.params.city4}
                        city5={this.props.params.city5}
                    ></DropDownItem>
                )
            }
        }

        let getDropDowns = () => {
            if (!this.props.hideDropDowns) {
                return (
                    [
                        <DropdownButton className="pad-right" variant="danger" id="dropdown-basic-button" title={this.props.statsHeader}>
                            <DropDownItem item="revenue" subitem={this.props.agg} active={this.props.statsType === "revenue"} name="Revenues"
                                {...this.props.params}
                            ></DropDownItem>
                            <DropDownItem item="expense" subitem={this.props.agg} active={this.props.statsType === "expense"} name="Expenses"
                                {...this.props.params}
                            ></DropDownItem>
                            <DropDownItem item="defisurp" subitem={this.props.agg} active={this.props.statsType === "defisurp"} name="Deficits/Surpluses"
                                {...this.props.params}
                            ></DropDownItem>
                            <DropDownItem item="capitalassets" subitem={this.props.agg} active={this.props.statsType === "capitalassets"} name="Tangible Capital Assets"
                                {...this.props.params}
                            ></DropDownItem>
                            <DropDownItem item="rankings" subitem={this.props.agg} active={this.props.statsType === "rankings"} name="Rankings"
                                {...this.props.params}
                            ></DropDownItem>
                            <DropDownItem item="alldata" subitem={this.props.agg} active={this.props.statsType === "alldata"} name="All Data for Cities"
                                {...this.props.params}
                            ></DropDownItem>
                        </DropdownButton>
                        ,
                        <DropdownButton className="pad-right" variant="success" id="dropdown-basic-button" title={this.props.aggHeader}>
                            <DropDownItem item={this.props.statsType} subitem="total" active={this.props.agg === "total"} name="Total Value"
                                {...this.props.params}
                            >
                            </DropDownItem>
                            <DropDownItem item={this.props.statsType} subitem="capita" active={this.props.agg === "capita"} name="Per Capita"
                                {...this.props.params}
                            ></DropDownItem>
                            <DropDownItem item={this.props.statsType} subitem="household" active={this.props.agg === "household"} name="Per Household"
                                {...this.props.params}
                            >
                            </DropDownItem>
                            {getPrecentageButton()}
                        </DropdownButton>
                    ]
                )
            }
        }

        return (
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="md">
                
                    <Link to="/"><Navbar.Brand>ON City Books</Navbar.Brand></Link>
                
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Text>
                        Visualizations for Ontario Municipal Financial Data
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {getDropDowns()}
                    <Navbar.Text>
                        <Link to="/about">About</Link>
                    </Navbar.Text>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}