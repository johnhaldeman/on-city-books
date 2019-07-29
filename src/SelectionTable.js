import React, { Component } from 'react';
import * as SortIcons from './SortIcons';

export class SelectionTable extends Component {

    constructor(props){
        super();
        this.state = {
            sortOrder: true,
            sortKey: props.sortKey
        }
    }

    selectItem(item){
        return () => {
            this.props.selectItem(item);
        }
    }

    getRow(headerData){
        return (data, id) => {
            let row = headerData.map(d => {
                let classes = "";
                if(d.rightalign){
                    classes += "rightalign "
                }
                return <td className={classes} key={id + "-" + d.key}>{data[d.key]}</td>
            })
            
            return (<tr onClick={this.selectItem(data)} key={id} >
                        {row}
                    </tr>);
        }
    }
    
    getData(data) {
        let retData = [];
        if(data !== undefined){
            for(let id in data){
                if(this.props.filter(data[id])){                    
                    data[id].key = id;
                    retData.push(data[id])
                }
            }
        }

        
        let sortBy = this.state.sortKey;
        retData.sort((a, b) => {
            let retVal = 0;

            if(a[sortBy] < b[sortBy]){
                retVal = -1;
            }
            else if(a[sortBy] > b[sortBy]){
                retVal = 1;
            }

            if(!this.state.sortOrder){
                retVal = retVal * -1;
            }

            return retVal;
        });
        
        return retData.map(this.getRow(this.props.headerData));
    }

    sortBy(key){
        let sortBy = this.props.sortKey
        if(this.state.sortKey !== undefined){
            sortBy = this.state.sortKey;
        }
        return d => {
            if(sortBy === key){
                this.setState({sortOrder: !this.state.sortOrder});
            }
            else{
                this.setState({sortKey: key});
            }
        }
    }
    
    getHeaders() {
        let retData = this.props.headerData.map(d => {
            let classes = "";
            if(d.rightalign){
                classes += "rightalign "
            }

            
            let sortBy = this.props.sortKey
            if(this.state.sortKey !== undefined){
                sortBy = this.state.sortKey;
            }

            let icon = <SortIcons.SortIcon></SortIcons.SortIcon>;
            if(sortBy === d.key){
                if(this.state.sortOrder){
                    icon = <SortIcons.AscSortIcon></SortIcons.AscSortIcon>;
                }
                else {
                    icon = <SortIcons.DescSortIcon></SortIcons.DescSortIcon>;
                }
            }

            return <th className={classes} key={d.key} onClick={this.sortBy(d.key)}>{d.name} {icon}</th>
        })
        return retData;
    }

    render() {
        return(
        <table className="table table-bordered table-striped table-sm table-hover table-100pc pointer-cursor">
            <thead className="thead-dark">
                <tr>
                    {this.getHeaders()}
                </tr>
            </thead>
            <tbody>
                {this.getData(this.props.data)}
            </tbody>
        </table>
        )

    }

}


