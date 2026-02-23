const fs = require('fs');
const path = require('path');
const { MhahPanchang } = require('mhah-panchang');

const panchang = new MhahPanchang();

// Map from English Nakshatra to Malayalam
const nakshatraMap = {
    'Aswini': 'അശ്വതി',
    'Bharani': 'ഭരണി',
    'Kruttika': 'കാർത്തിക',
    'Rohini': 'രോഹിണി',
    'Mrugasira': 'മകയിരം',
    'Arudra': 'തിരുവാതിര',
    'Punarvasu': 'പുണർതം',
    'Pushya': 'പൂയം',
    'Aslesha': 'ആയില്യം',
    'Magha': 'മകം',
    'Purbafalguni': 'പൂരം', // Wait, check mhah-panchang exact spelling
    'Uttarafalguni': 'ഉത്രം',
    'Hasta': 'അത്തം',
    'Chitra': 'ചിത്തിര',
    'Swati': 'ചോതി',
    'Bisakha': 'വിശാഖം',
    'Anuradha': 'അനിഴം',
    'Jyestha': 'തൃക്കേട്ട',
    'Mula': 'മൂലം',
    'Purbasadha': 'പൂരാടം',
    'Uttarasadha': 'ഉത്രാടം',
    'Sraban': 'തിരുവോണം',
    'Dhanistha': 'അവിട്ടം',
    'Satabhisa': 'ചതയം',
    'Purbabhadrapada': 'പൂരുരുട്ടാതി',
    'Uttarabhadrapada': 'ഉത്രട്ടാതി',
    'Revati': 'രേവതി'
};

const tithiMap = {
    'Pratipada': 'പ്രഥമ',
    'Dwitiya': 'ദ്വിതീയ',
    'Tritiya': 'തൃതീയ',
    'Chaturthi': 'ചതുർത്ഥി',
    'Panchami': 'പഞ്ചമി',
    'Sasthi': 'ഷഷ്ടി',
    'Saptami': 'സപ്തമി',
    'Astami': 'അഷ്ടമി',
    'Navami': 'നവമി',
    'Dasami': 'ദശമി',
    'Ekadasi': 'ഏകാദശി',
    'Dwadasi': 'ദ്വാദശി',
    'Trayodasi': 'ത്രയോദശി',
    'Chaturdasi': 'ചതുർദ്ദശി',
    'Punnami': 'പൗർണ്ണമി', // Purnima
    'Amabasya': 'അമാവാസി' // Amavasya
};

// First let's just log the exact names from a few days to verify spelling from mhah-panchang
for (let i = 1; i <= 30; i++) {
    const d = new Date(`2026-02-${String(i).padStart(2, '0')}T06:30:00Z`);
    const p = panchang.calculate(d);
    console.log(`${d.toISOString().split('T')[0]}: ${p.Nakshatra.name_en_IN} | ${p.Tithi.name_en_IN}`);
}
