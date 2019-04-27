
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

