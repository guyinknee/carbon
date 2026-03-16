import fs from 'fs';
import Papa from 'papaparse';

const csvText = fs.readFileSync('public/data/factors_master.csv', 'utf8');

Papa.parse(csvText, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: (results) => {
    // console.log(results.data.filter(f => f.category === 'car'));
    const factorsData = results.data;
    
    const getFactor = (category, subcategory) => {
      const matchingFactors = factorsData
        .filter(f => f.category === category && f.subcategory === subcategory)
        .sort((a, b) => a.fallback_order - b.fallback_order);
      return matchingFactors[0] || null;
    };

    console.log("Testing getFactor('car', 'gasoline'):");
    console.log(getFactor('car', 'gasoline'));
  }
});
