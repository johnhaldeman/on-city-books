let parse = require('csv-parse/lib/sync');
let fs = require('fs');
let path = require('path');

let fileDir = "data";
let outDir = path.join("data", "out");


function updateList(list, find, field, value) {
    for (let i in list) {
        if (list[i].id === find) {
            list[i][field] = value;
        }
    }
}

function updateMuniList(muni, list) {
    for (let i in list) {
        if (muni.id === list[i].id) {
            list[i] = muni;
            return;
        }
    }
    list.push(muni);
}

fs.readdir(fileDir, function (err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    let descs = {};
    let muniList = [];
    let rankDescs = {};


    files.forEach(function (file, index) {
        var location = path.join(fileDir, file);

        if (file.endsWith(".csv")) {
            console.log("Processing: " + location);
            let data = fs.readFileSync(location).toString();
            data = data.replace("Schedule \"B\"", "Schedule B");
            data = data.replace("tab \"2\"", "tab 2");
            data = data.replace("\"youth\"", "youth");
            data = data.replace("\"disposal\"", "disposal");
            let records = parse(data, { columns: true });
            let muni = {};

            let filePath = "";
            for (let recordnum in records) {
                let record = records[recordnum];

                if (muni.id !== record.MUNID.trim()) {
                    if (muni.id !== undefined) {
                        console.log("Writing: " + filePath);
                        fs.writeFileSync(filePath, JSON.stringify(muni));
                    }
                    muni = {};
                    muni.id = record.MUNID.trim();
                    filePath = path.join(outDir, muni.id + ".json");
                    if (fs.existsSync(filePath)) {
                        let muniData = fs.readFileSync(filePath).toString();
                        muni = JSON.parse(muniData);
                    }
                    muni.desc = record.MUNICIPALITY_DESC;
                    muni.tier = record.TIER_CODE;

                    updateMuniList(
                        {
                            id: muni.id,
                            name: muni.desc,
                            tier: record.TIER_CODE
                        }
                        , muniList
                    );
                }

                let MARSYEAR = record.MARSYEAR;
                if (muni[MARSYEAR] === undefined) {
                    muni[MARSYEAR] = {};
                }
                let muniyear = muni[MARSYEAR];

                let SLC = record.SLC;
                muniyear[SLC] = {
                    amount: Number(record.AMOUNT),
                    value_text: record.VALUE_TEXT
                }

                descs[SLC] = {
                    schedule: record.SCHEDULE_DESC,
                    sub_schedule: record.SUB_SCHEDULE_DESC,
                    line_desc: record.SCHEDULE_LINE_DESC,
                    column_desc: record.SCHEDULE_COLUMN_DESC,
                    data_type: record.DATATYPE_DESC
                }

                if(rankDescs[SLC.substr(0, 17)] === undefined){
                    rankDescs[SLC.substr(0, 17)] = {
                        schedule: record.SCHEDULE_DESC,
                        sub_schedule: record.SUB_SCHEDULE_DESC,
                        line_desc: record.SCHEDULE_LINE_DESC,
                        column_descs: {}
                    }
                }
                rankDescs[SLC.substr(0, 17)].column_descs[SLC] = {
                    desc: record.SCHEDULE_COLUMN_DESC,
                    type: record.DATATYPE_DESC
                }

                if (SLC.trim() === "slc.02X.L0041.C01.01") {
                    updateList(muniList, muni.id, "population", Number(record.AMOUNT));
                }
                else if (SLC.trim() === "slc.02X.L0040.C01.01") {
                    updateList(muniList, muni.id, "households", Number(record.AMOUNT));
                }
            }
        }
    });


    fs.writeFileSync(path.join(outDir, "descs.json"), JSON.stringify(descs));
    fs.writeFileSync(path.join(outDir, "rankDescs.json"), JSON.stringify(rankDescs));
    fs.writeFileSync(path.join(outDir, "muniList.json"), JSON.stringify(muniList));


    const years = ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
    
    let rankDir = path.join(outDir, "rankings");
    if (!fs.existsSync(rankDir)) {
        fs.mkdirSync(rankDir);
    }

    for (let muni of muniList) {
        let filePath = path.join(outDir, muni.id + ".json");
        console.log("Processing Ranking With: " + filePath);

        if (fs.existsSync(filePath)) {
            let muniData = fs.readFileSync(filePath).toString();
            muni = JSON.parse(muniData);


            for (year of years) {
                for (let desc in rankDescs) {
                    if (muni[year] !== undefined) {
                        for(let column in rankDescs[desc].column_descs){
                            let data = muni[year][column];
                            if (data !== undefined) {
                                let rankYearDir = path.join(rankDir, year);
                                if (!fs.existsSync(rankYearDir)) {
                                    fs.mkdirSync(rankYearDir);
                                }

                                let rankPath = path.join(rankYearDir, desc + ".json");
                                let rankings = [];
                                if (fs.existsSync(rankPath)) {
                                    let rankData = fs.readFileSync(rankPath).toString();
                                    rankings = JSON.parse(rankData);
                                }
                                let rankEntry = undefined;
                                for(let entry of rankings){
                                    if(entry.muni_id === muni.id){
                                        rankEntry = entry;
                                    }
                                }
                                if(rankEntry === undefined){
                                    rankEntry = {
                                        muni_id: muni.id,
                                        muni_name: muni.desc,
                                        tier: muni.tier,
                                        columns: {}
                                    };
                                    rankings.push(rankEntry);
                                }
                                rankEntry.columns[column] = {
                                    amount: data.amount,
                                    value_text: data.value_text
                                }

                                
                                fs.writeFileSync(rankPath, JSON.stringify(rankings));
                            }
                        }
                    }
                }
            }
        }
        else {
            console.log("WARNING: Missing expected file " + filePath);
        }
    }
}

)



