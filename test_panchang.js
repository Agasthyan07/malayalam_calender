const p = require('@ishubhamx/panchangam-js');

const date = new Date('2026-02-01T06:30:00Z');
// Trivandrum coords roughly
const lat = 8.5241;
const lon = 76.9366;

const panchang = p.getPanchangam(date, lat, lon);
console.log(JSON.stringify(panchang, null, 2));
