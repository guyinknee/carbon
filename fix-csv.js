import fs from 'fs';

let csvText = fs.readFileSync('public/data/factors_master.csv', 'utf8');

// The issue is unescaped commas inside the "Derived from X,XXX" notes.
csvText = csvText.replace(/Derived from 8,887 gCO2\/gal/g, '"Derived from 8,887 gCO2/gal"');
csvText = csvText.replace(/Derived from 10,180 gCO2\/gal/g, '"Derived from 10,180 gCO2/gal"');

fs.writeFileSync('public/data/factors_master.csv', csvText);
