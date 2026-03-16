import Papa from 'papaparse';

let factorsData = [];

export const loadFactors = async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/factors_master.csv`);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          factorsData = results.data.filter(f => f.active_for_calculation === true);
          resolve(factorsData);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Failed to fetch factors CSV:', error);
    throw error;
  }
};

export const getFactor = (category, subcategory) => {
  if (factorsData.length === 0) {
    console.warn('Factors data is not loaded yet!');
    return null;
  }
  
  // Sort by fallback_order (ascending: 1 is best)
  const matchingFactors = factorsData
    .filter(f => f.category === category && f.subcategory === subcategory)
    .sort((a, b) => a.fallback_order - b.fallback_order);
    
  if (matchingFactors.length === 0) {
    console.warn(`No factor found for ${category}:${subcategory}`);
    return null;
  }
  
  return matchingFactors[0];
};

export const getFactorsData = () => factorsData;

// FOR TESTING PURPOSES
export const setFactorsDataForTesting = (data) => {
  factorsData = data;
};
