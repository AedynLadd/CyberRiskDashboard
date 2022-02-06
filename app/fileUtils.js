const fs = require('fs');
const csv = require('csv-parse/sync');

module.exports = {
    readCSV: (filePath, skipHeader) => {
        const fileContents = fs.readFileSync(filePath);
        const csvData = csv.parse(fileContents, {
            skip_empty_lines: true,
            delimiter: ','
        });
        if (skipHeader) {
            csvData.shift()
        }
        return csvData;
    },
    readJson: (filePath) => {
        const fileContents = fs.readFileSync(filePath);
        return JSON.parse(fileContents);
    },
    writeJson: (filePath, json) => {
        fs.writeFileSync(filePath, JSON.stringify(json));
    }
}