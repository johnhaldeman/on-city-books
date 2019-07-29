import React,  { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';


export class ItemDropDown extends Component{


    headers = {
        "FINANCIAL INFORMATION RETURN": "S2: Financial Information Return - Admin Info",
        "CONSOLIDATED STATEMENT OF OPERATIONS: REVENUE": "S10: Consolidated Statement of Operations: Revenue",
        "GRANTS, USER FEES AND SERVICE CHARGES": "S12: Grants, User Fees, and Service Charges",
        "TAXATION INFORMATION": "S20: Taxation Information",
        "MUNICIPAL AND SCHOOL BOARD TAXATION": "S22: Municipal and School Board Taxation",
        "PAYMENTS-IN-LIEU OF TAXATION": "S24: Payments-in-lieu of Taxation",
        "TAXATION AND PAYMENTS-IN-LIEU SUMMARY": "S26: Taxation and Payments-in-Lieu  Summary",
        "UPPER-TIER ENTITLEMENTS": "S28: Upper-Tier Entitlements",
        "CONSOLIDATED STATEMENT OF OPERATIONS: EXPENSES": "S40: Consolidated Statement of Operations: Expenses",
        "ADDITIONAL INFORMATION": "S42: Additional Information",
        "SCHEDULE OF TANGIBLE CAPITAL ASSETS": "S51: Schedule of Tangible Capital Assets",
        "CONSOLIDATED STATEMENT OF CHANGE IN NET FINANCIAL ASSETS (NET DEB": "S53: Consolidated Statement of Change in Net Financial Assets",
        "CONSOLIDATED STATEMENT OF CASH FLOW (SELECT DIRECT OR INDIRECT ME": "S54: Consolidated Statement of Cash Flow",
        "CONTINUITY OF RESERVES AND RESERVE FUNDS": "S60: Continuity of Reserves and Reserve Funds",
        "DEVELOPMENT CHARGES RESERVE FUNDS": "S61: Development Charges and Reserve Funds",
        "CONSOLIDATED STATEMENT OF FINANCIAL POSITION": "S70: Consolidated Statement of Financial Position",
        "CONTINUITY OF TAXES RECEIVABLE": "S72: Continuity of Taxes Receivable",
        "LONG TERM LIABILITIES AND COMMITMENTS": "S74: Long Term Liabilities and Commitments",
        "WATER AND WASTEWATER ": "S75: Water and Wastewater",
        "GOVERNMENT BUSINESS ENTERPRISES (GBE)": "S76: Government Business Enterprises",
        "OTHER ENTITIES (DSSAB, HEALTH UNIT, OTHER AND TOTAL ALL)": "S77: Other Entities (DSSAB, Health Unit, etc.)",
        "CONSOLIDATED MUNICIPAL SERVICE MANAGER: MUNICIPAL COST SHARES": "S78: Consolidated Municipal Service Manager: Municipal Cost Shares",
        "COMMUNITY IMPROVEMENT PLANS": "S79: Continuity Improvement Plans",
        "STATISTICAL INFORMATION  ": "S80: Statistical Information",
        "ANNUAL DEBT REPAYMENT LIMIT": "S81: Annual Debt Repayment Limit",
        "NOTES": "S83: Notes"
    }

    getHeader(tier){
        return this.headers[tier];
    }


    render(){
        return(
            <DropdownButton size="md" variant="dark" id="tier-dropdown" title={this.getHeader(this.props.schedule) + " "}>
            {
                Object.keys(this.headers).map(key => {
                    return <Dropdown.Item key={key} onSelect={() => {this.props.setSchedule(key)}}>{this.getHeader(key)}</Dropdown.Item>
                })
            }
            </DropdownButton>
        );
    }
}


