const fs = require('fs');
const path = require('path');

const year = 2027;
const outputDir = path.join(__dirname, '../data', year.toString());

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// January 2027 Data (Gathered manually)
const janData = [
    { date: "2027-01-01", weekday: "Friday", malayalam_date: "Dhanu 17", nakshatram: "Chithira", tithi: "Krishna Navami", festival: "New Year's Day" },
    { date: "2027-01-02", weekday: "Saturday", malayalam_date: "Dhanu 18", nakshatram: "Chothi", tithi: "Krishna Dashami" },
    { date: "2027-01-03", weekday: "Sunday", malayalam_date: "Dhanu 19", nakshatram: "Vishakham", tithi: "Krishna Ekadashi" },
    { date: "2027-01-04", weekday: "Monday", malayalam_date: "Dhanu 20", nakshatram: "Anizham", tithi: "Krishna Dwadashi" },
    { date: "2027-01-05", weekday: "Tuesday", malayalam_date: "Dhanu 21", nakshatram: "Thriketta", tithi: "Krishna Trayodashi", festival: "Pradosham" },
    { date: "2027-01-06", weekday: "Wednesday", malayalam_date: "Dhanu 22", nakshatram: "Thriketta", tithi: "Krishna Chaturdashi" },
    { date: "2027-01-07", weekday: "Thursday", malayalam_date: "Dhanu 23", nakshatram: "Moolam", tithi: "Amavasya" },
    { date: "2027-01-08", weekday: "Friday", malayalam_date: "Dhanu 24", nakshatram: "Pooradam", tithi: "Shukla Prathama" },
    { date: "2027-01-09", weekday: "Saturday", malayalam_date: "Dhanu 25", nakshatram: "Uthradam", tithi: "Shukla Dwitiya" },
    { date: "2027-01-10", weekday: "Sunday", malayalam_date: "Dhanu 26", nakshatram: "Thiruvonam", tithi: "Shukla Tritiya" },
    { date: "2027-01-11", weekday: "Monday", malayalam_date: "Dhanu 27", nakshatram: "Avittam", tithi: "Shukla Chathurthi" },
    { date: "2027-01-12", weekday: "Tuesday", malayalam_date: "Dhanu 28", nakshatram: "Chathayam", tithi: "Shukla Panchami" },
    { date: "2027-01-13", weekday: "Wednesday", malayalam_date: "Dhanu 29", nakshatram: "Pooruruttathi", tithi: "Shukla Panchami" },
    { date: "2027-01-14", weekday: "Thursday", malayalam_date: "Dhanu 30", nakshatram: "Uthrattathi", tithi: "Shukla Shashti", festival: "Makaravilakku, Pongal" },
    { date: "2027-01-15", weekday: "Friday", malayalam_date: "Makaram 1", nakshatram: "Revathi", tithi: "Shukla Saptami" },
    { date: "2027-01-16", weekday: "Saturday", malayalam_date: "Makaram 2", nakshatram: "Aswathi", tithi: "Shukla Ashtami" },
    { date: "2027-01-17", weekday: "Sunday", malayalam_date: "Makaram 3", nakshatram: "Bharani", tithi: "Shukla Dashami" },
    { date: "2027-01-18", weekday: "Monday", malayalam_date: "Makaram 4", nakshatram: "Karthika", tithi: "Shukla Ekadashi" },
    { date: "2027-01-19", weekday: "Tuesday", malayalam_date: "Makaram 5", nakshatram: "Rohini", tithi: "Shukla Dwadashi" },
    { date: "2027-01-20", weekday: "Wednesday", malayalam_date: "Makaram 6", nakshatram: "Makayiram", tithi: "Shukla Trayodashi", festival: "Pradosham" },
    { date: "2027-01-21", weekday: "Thursday", malayalam_date: "Makaram 7", nakshatram: "TBD", tithi: "Shukla Chaturdashi" },
    { date: "2027-01-22", weekday: "Friday", malayalam_date: "Makaram 8", nakshatram: "TBD", tithi: "Purnima", festival: "Thaipusam" },
    { date: "2027-01-23", weekday: "Saturday", malayalam_date: "Makaram 9", nakshatram: "TBD", tithi: "Krishna Prathama" },
    { date: "2027-01-24", weekday: "Sunday", malayalam_date: "Makaram 10", nakshatram: "TBD", tithi: "Krishna Dwitiya" },
    { date: "2027-01-25", weekday: "Monday", malayalam_date: "Makaram 11", nakshatram: "TBD", tithi: "Krishna Tritiya" },
    { date: "2027-01-26", weekday: "Tuesday", malayalam_date: "Makaram 12", nakshatram: "TBD", tithi: "Krishna Chathurthi", festival: "Republic Day" },
    { date: "2027-01-27", weekday: "Wednesday", malayalam_date: "Makaram 13", nakshatram: "TBD", tithi: "Krishna Panchami" },
    { date: "2027-01-28", weekday: "Thursday", malayalam_date: "Makaram 14", nakshatram: "TBD", tithi: "Krishna Shashti" },
    { date: "2027-01-29", weekday: "Friday", malayalam_date: "Makaram 15", nakshatram: "TBD", tithi: "Krishna Saptami" },
    { date: "2027-01-30", weekday: "Saturday", malayalam_date: "Makaram 16", nakshatram: "TBD", tithi: "Krishna Ashtami" },
    { date: "2027-01-31", weekday: "Sunday", malayalam_date: "Makaram 17", nakshatram: "TBD", tithi: "Krishna Navami" }
];

const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

months.forEach(month => {
    const daysInMonth = new Date(year, parseInt(month), 0).getDate();
    const monthData = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, parseInt(month) - 1, day);
        const dateStr = date.toISOString().split('T')[0];
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

        // Check if we have manual data for Jan
        if (month === '01') {
            const existing = janData.find(d => d.date === dateStr);
            if (existing) {
                monthData.push({
                    date: dateStr,
                    weekday: weekday,
                    malayalam_date: existing.malayalam_date,
                    nakshatram: existing.nakshatram,
                    tithi: existing.tithi,
                    sunrise: "06:40", // Placeholder
                    sunset: "18:20", // Placeholder
                    rahukalam: "TBD",
                    festival: existing.festival || null,
                    vratham: null
                });
                continue;
            }
        }

        // Default placeholder
        monthData.push({
            date: dateStr,
            weekday: weekday,
            malayalam_date: "TBD",
            nakshatram: "TBD",
            tithi: "TBD",
            sunrise: "06:00",
            sunset: "18:00",
            rahukalam: "TBD",
            festival: null,
            vratham: null
        });
    }

    fs.writeFileSync(path.join(outputDir, `${month}.json`), JSON.stringify(monthData, null, 2));
    console.log(`Generated ${month}.json`);
});
