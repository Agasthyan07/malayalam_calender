const fs = require('fs');
const path = require('path');

const nakshatrams = [
    "അശ്വതി", "ഭരണി", "കാർത്തിക", "രോഹിണി", "മകയിരം", "തിരുവാതിര", "പുണർതം", "പൂയം", "ആയില്യം",
    "മകം", "പൂരം", "ഉത്രം", "അത്തം", "ചിത്തിര", "ചോതി", "വിശാഖം", "അനിഴം", "തൃക്കേട്ട",
    "മൂലം", "പൂരാടം", "ഉത്രാടം", "തിരുവോണം", "അവിട്ടം", "ചതയം", "പൂരുരുട്ടാതി", "ഉത്രട്ടാതി", "രേവതി"
];

const tithis = [
    "പ്രഥമ", "ദ്വിതീയ", "തൃതീയ", "ചതുർത്ഥി", "പഞ്ചമി", "ഷഷ്ടി", "സപ്തമി", "അഷ്ടമി", "നവമി", "ദശമി", "ഏകാദശി", "ദ്വാദശി", "ത്രയോദശി", "ചതുർദ്ദശി", "പൗർണ്ണമി/അമാവാസി"
];

const malayalamMonths = [
    "മകരം", "കുംഭം", "മീനം", "മേടം", "ഇടവം", "മിഥുനം", "കർക്കടകം", "ചിങ്ങം", "കന്നി", "തുലാം", "വൃശ്ചികം", "ധനു"
];

// Helper to get Rahukalam based on weekday
function getRahukalam(weekday) {
    const map = {
        "Sunday": "16:30 - 18:00",
        "Monday": "07:30 - 09:00",
        "Tuesday": "15:00 - 16:30",
        "Wednesday": "12:00 - 13:30",
        "Thursday": "13:30 - 15:00",
        "Friday": "10:30 - 12:00",
        "Saturday": "09:00 - 10:30"
    };
    return map[weekday] || "";
}

// Approximation state
// Starting from Feb 1, 2026
// Jan 31 was Makaram 18
let malMonthIdx = 0; // Makaram
let malDay = 19;
let nakshatramIdx = 6; // Punartham was Jan 31
let tithiIdx = 12; // Thrayodashi was Jan 31

function generate() {
    for (let month = 1; month < 12; month++) { // 1 = Feb, 11 = Dec
        const year = 2026;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthData = [];

        const monthStr = (month + 1).toString().padStart(2, '0');
        const dir = path.join(__dirname, '../data', year.toString());
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, month, d);
            const dateStr = `${year}-${monthStr}-${d.toString().padStart(2, '0')}`;
            const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

            // Advance parameters (Simple cycle for demo purposes)

            // Nakshatram cycle
            nakshatramIdx = (nakshatramIdx + 1) % nakshatrams.length;

            // Tithi cycle
            tithiIdx = (tithiIdx + 1) % tithis.length;

            // Malayalam Date Logic (Approximate: Months change around 14th-17th)
            malDay++;
            if (malDay > 30) { // Simplified month transition
                // Check if we should switch month (around middle of gregorian month)
                // Keeping it extremely simple: just reset automatically after 30 for now
                // In a real app, this needs precise astronomical calculation
                if (d > 13 && d < 18) {
                    malMonthIdx = (malMonthIdx + 1) % 12;
                    malDay = 1;
                }
            }

            monthData.push({
                date: dateStr,
                weekday: weekday,
                malayalam_date: `${malayalamMonths[malMonthIdx]} ${malDay}`,
                nakshatram: nakshatrams[nakshatramIdx],
                tithi: tithis[tithiIdx],
                sunrise: "06:30", // Placeholder
                sunset: "18:30",  // Placeholder
                rahukalam: getRahukalam(weekday),
                festival: null,
                vratham: null
            });
        }

        fs.writeFileSync(path.join(dir, `${monthStr}.json`), JSON.stringify(monthData, null, 2));
        console.log(`Generated ${monthStr}.json`);
    }
}

generate();
