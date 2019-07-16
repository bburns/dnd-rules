:: convert csv rules from airtable spreadsheet to json,
:: then copy to src/assets folder
csvtojson data/rules.csv > data/rules.json
cp rules.json src/assets
