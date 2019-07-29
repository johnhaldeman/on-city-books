
export function getValueForVariable(d, id, i, total, year, selectedCities, agg) {
    if (selectedCities === undefined) {
        return 1;
    }
    let population = selectedCities[i].population;
    let households = selectedCities[i].households;
    if (d[year][id] === undefined) {
        d[year][id] = { amount: 0 }
    }
    if (agg === "percentage") {
        return d[year][id].amount / total;
    }
    else if (agg === "capita") {
        return d[year][id].amount / population;
    }
    else if (agg === "household") {
        return d[year][id].amount / households;
    }
    else {
        return d[year][id].amount;
    }
}

let keyedMuniData = undefined;

export function getAggregateValue(muniData, muni_id, value, agg){
    if(muniData === undefined){
        return value;
    }
    if(keyedMuniData === undefined){
        keyedMuniData = {};
        for(let muni of muniData){
            keyedMuniData[muni.id] = muni;
        }
    }

    if(agg === "capita"){
        return value / keyedMuniData[muni_id].population;
    }
    else if(agg === "household"){
        return value / keyedMuniData[muni_id].households;
    }
    else{
        return value;
    }
    


}


export function getCityNamesSlashDelimited(cityList){
    if(cityList === undefined){
        return "";
    }
    let retStr = "";
    for(let city of cityList){
        retStr += "/" + city.id;
    }
    return retStr;
}
