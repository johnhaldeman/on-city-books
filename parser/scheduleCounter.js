let fs = require('fs');
let path = require('path');

let outDir = path.join("data", "out");

let data = fs.readFileSync(path.join(outDir, "descs.json")).toString();

let descs = JSON.parse(data);

let schedules = {};


for (let desc in descs) {
    schedules[descs[desc].schedule] = 1;
}

console.log(JSON.stringify(schedules));
{
    "FINANCIAL INFORMATION RETURN": "Financial Information Return",
    "CONSOLIDATED STATEMENT OF OPERATIONS: REVENUE": "Consolidated Statement of Operations: Revenue",
    "GRANTS, USER FEES AND SERVICE CHARGES": "Grants, User Fees, and Service Charges",
    "TAXATION INFORMATION": "Taxation Information",
    "MUNICIPAL AND SCHOOL BOARD TAXATION": "Municipal and School Board Taxation",
    "PAYMENTS-IN-LIEU OF TAXATION": "Payments-in-lieu of Taxation",
    "TAXATION AND PAYMENTS-IN-LIEU SUMMARY": "Taxation and Payments-in-Lieu  Summary",
    "UPPER-TIER ENTITLEMENTS": "Upper-Tier Entitlements",
    "CONSOLIDATED STATEMENT OF OPERATIONS: EXPENSES": "Consolidated Statement of Operations: Expenses",
    "ADDITIONAL INFORMATION": "Additional Information",
    "SCHEDULE OF TANGIBLE CAPITAL ASSETS": "Schedule of Tangible Capital Assets",
    "CONSOLIDATED STATEMENT OF CHANGE IN NET FINANCIAL ASSETS (NET DEB": "Consolidated Statement of Change in Net Financial Assets",
    "CONSOLIDATED STATEMENT OF CASH FLOW (SELECT DIRECT OR INDIRECT ME": "Consolidated Statement of Cash Flow",
    "CONTINUITY OF RESERVES AND RESERVE FUNDS": "Continuity of Reserves and Reserve Funds",
    "CONSOLIDATED STATEMENT OF FINANCIAL POSITION": "Consolidated Statement of Financial Position",
    "LONG TERM LIABILITIES AND COMMITMENTS": "Long Term Liabilities and Commitments",
    "STATISTICAL INFORMATION  ": "Statistical Information",
    "ANNUAL DEBT REPAYMENT LIMIT": "Annual Debt Repayment Limit",
    "CONTINUITY OF TAXES RECEIVABLE": "Continuity of Taxes Receivable",
    "WATER AND WASTEWATER ": "Water and Wastewater",
    "COMMUNITY IMPROVEMENT PLANS": "Continuity Improvement Plans",
    "NOTES": "Notes",
    "CONSOLIDATED MUNICIPAL SERVICE MANAGER: MUNICIPAL COST SHARES": "Consolidated Municipal Service Manager: Municipal Cost Shares",
    "GOVERNMENT BUSINESS ENTERPRISES (GBE)": "Government Business Enterprises",
    "OTHER ENTITIES (DSSAB, HEALTH UNIT, OTHER AND TOTAL ALL)": "Other Entities (DSSAB, Health Unit, etc.)",
    "DEVELOPMENT CHARGES RESERVE FUNDS": "Development Charges and Reserve Funds"
 }