const fs = require('fs');
const path = require('path');
const { MhahPanchang } = require('mhah-panchang');

const panchang = new MhahPanchang();

// Map array for Malayalam Nakshatras 
// mhah-panchang indices 0-26 (Aswini to Revati)
const mlNakshatras = [
    'അശ്വതി', 'ഭരണി', 'കാർത്തിക', 'രോഹിണി', 'മകയിരം', 'തിരുവാതിര', 'പുണർതം',
    'പൂയം', 'ആയില്യം', 'മകം', 'പൂരം', 'ഉത്രം', 'അത്തം', 'ചിത്തിര',
    'ചോതി', 'വിശാഖം', 'അനിഴം', 'തൃക്കേട്ട', 'മൂലം', 'പൂരാടം', 'ഉത്രാടം',
    'തിരുവോണം', 'അവിട്ടം', 'ചതയം', 'പൂരുരുട്ടാതി', 'ഉത്രട്ടാതി', 'രേവതി'
];

// Map array for Malayalam Tithis
// mhah-panchang indices 0-29
// 0-14: Shukla Paksha (Pratipada to Purnima)
// 15-29: Krishna Paksha (Pratipada to Amavasya)
const mlTithis = [
    'പ്രഥമ', 'ദ്വിതീയ', 'തൃതീയ', 'ചതുർത്ഥി', 'പഞ്ചമി', 'ഷഷ്ടി', 'സപ്തമി',
    'അഷ്ടമി', 'നവമി', 'ദശമി', 'ഏകാദശി', 'ദ്വാദശി', 'ത്രയോദശി', 'ചതുർദ്ദശി', 'പൗർണ്ണമി', // Shukla Paksha
    'പ്രഥമ', 'ദ്വിതീയ', 'തൃതീയ', 'ചതുർത്ഥി', 'പഞ്ചമി', 'ഷഷ്ടി', 'സപ്തമി',
    'അഷ്ടമി', 'നവമി', 'ദശമി', 'ഏകാദശി', 'ദ്വാദശി', 'ത്രയോദശി', 'ചതുർദ്ദശി', 'അമാവാസി'  // Krishna Paksha 
];

const dataDir = path.join(__dirname, 'data', '2026');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let modified = false;

    for (let i = 0; i < data.length; i++) {
        const dayDate = data[i].date;
        // Calculate Panchang at 06:30 AM IST (Sunrise equivalent roughly)
        // 06:30 AM IST = 01:00 AM UTC
        const dateObj = new Date(`${dayDate}T01:00:00Z`);

        try {
            const p = panchang.calculate(dateObj);
            const nakshatraIndex = p.Nakshatra.ino; // 0 to 26
            const tithiIndex = p.Tithi.ino; // 0 to 29

            const malayalamNakshatra = mlNakshatras[nakshatraIndex];
            const malayalamTithi = mlTithis[tithiIndex];

            if (data[i].nakshatram !== malayalamNakshatra || data[i].tithi !== malayalamTithi) {
                data[i].nakshatram = malayalamNakshatra;
                data[i].tithi = malayalamTithi;
                modified = true;
            }
        } catch (e) {
            console.error(`Error calculating for ${dayDate}:`, e);
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Updated ${file}`);
        updatedCount++;
    }
}

console.log(`Successfully recalculated and saved Panchangam data for ${updatedCount} files.`);
