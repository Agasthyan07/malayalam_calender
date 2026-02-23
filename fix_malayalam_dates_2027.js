const fs = require('fs');
const path = require('path');

const transitions = [
    { date: '2027-01-01', ml_month: 'ധനു', start_val: 17 }, // Based on Dec 16 Dhanu start in 2026
    { date: '2027-01-14', ml_month: 'മകരം', start_val: 1 },
    { date: '2027-02-13', ml_month: 'കുംഭം', start_val: 1 },
    { date: '2027-03-15', ml_month: 'മീനം', start_val: 1 },
    { date: '2027-04-15', ml_month: 'മേടം', start_val: 1 },
    { date: '2027-05-15', ml_month: 'ഇടവം', start_val: 1 },
    { date: '2027-06-15', ml_month: 'മിഥുനം', start_val: 1 },
    { date: '2027-07-17', ml_month: 'കർക്കിടകം', start_val: 1 },
    { date: '2027-08-17', ml_month: 'ചിങ്ങം', start_val: 1 },
    { date: '2027-09-17', ml_month: 'കന്നി', start_val: 1 },
    { date: '2027-10-18', ml_month: 'തുലാം', start_val: 1 },
    { date: '2027-11-17', ml_month: 'വൃശ്ചികം', start_val: 1 },
    { date: '2027-12-16', ml_month: 'ധനു', start_val: 1 },
];

function getFormattedDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const yearData = {};
let currentTransitionIdx = 0;
let currentMlMonth = transitions[0].ml_month;
let currentMlDate = transitions[0].start_val;

const startDate = new Date('2027-01-01T00:00:00Z');
const endDate = new Date('2027-12-31T00:00:00Z');

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = getFormattedDate(d);

    if (currentTransitionIdx + 1 < transitions.length && dateStr === transitions[currentTransitionIdx + 1].date) {
        currentTransitionIdx++;
        currentMlMonth = transitions[currentTransitionIdx].ml_month;
        currentMlDate = transitions[currentTransitionIdx].start_val;
    }

    const malayalamDateStr = `${currentMlMonth} ${currentMlDate}`;
    yearData[dateStr] = malayalamDateStr;

    currentMlDate++;
}

// Update files
const dataDir = path.join(__dirname, 'data', '2027');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

let modifiedCount = 0;
for (const file of files) {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    let modified = false;
    for (const day of data) {
        if (yearData[day.date]) {
            if (day.malayalam_date !== yearData[day.date]) {
                day.malayalam_date = yearData[day.date];
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        modifiedCount++;
    }
}

console.log(`Finished updating malayalam dates for 2027. Updated ${modifiedCount} files.`);
