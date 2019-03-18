let parse = require('csv-parse/lib/sync');
let fs = require('fs');
let path = require('path');

let fileDir = "data";
let outDir = path.join("data", "out");

function updateList(list, find, field, value){
    for(let i in list){
        if(list[i].id === find){
            list[i][field] = value;
        }
    }
}

function updateMuniList(muni, list){
    for(let i in list){
        if(muni.id === list[i].id){
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


    files.forEach(function (file, index) {
        var location = path.join(fileDir, file);

        if (file.endsWith(".csv")) {
            console.log("Processing: " + location);
            let data = fs.readFileSync(location).toString();
            data = data.replace("Schedule \"B\"", "Schedule B");
            data = data.replace("tab \"2\"", "tab 2");
            data = data.replace("\"youth\"", "youth");
            let records = parse(data, { columns: true });
            let muni = {};

            let filePath = "";
            for (let recordnum in records) {
                let record = records[recordnum];

                if (muni.id !== record.MUNID.trim()) {
                    if(muni.id !== undefined){
                        console.log("Writing: " + filePath);
                        fs.writeFileSync(filePath, JSON.stringify(muni));
                    }
                    muni = {};
                    muni.id = record.MUNID.trim();
                    filePath = path.join(outDir, muni.id  + ".json");
                    if (fs.existsSync(filePath)) {
                        let muniData = fs.readFileSync(filePath).toString();
                        muni = JSON.parse(muniData);
                    }
                    muni.desc = record.MUNICIPALITY_DESC;

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
                    line_desc: record.SCHEDULE_LINE_DESC,
                    column_desc: record.SCHEDULE_COLUMN_DESC
                }

                if(SLC.trim() === "slc.02X.L0041.C01.01"){
                    updateList(muniList, muni.id, "population", Number(record.AMOUNT));
                }
                else if(SLC.trim() === "slc.02X.L0040.C01.01"){
                    updateList(muniList, muni.id, "households", Number(record.AMOUNT));
                }
            }
        }
    });

    fs.writeFileSync(path.join(outDir, "descs.json"), JSON.stringify(descs));
    fs.writeFileSync(path.join(outDir, "muniList.json"), JSON.stringify(muniList));

});



