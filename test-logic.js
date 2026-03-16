import fs from 'fs';
import Papa from 'papaparse';
import { setFactorsDataForTesting } from './src/utils/calculator.js';
import * as calculations from './src/utils/calculations.js';

const csvText = fs.readFileSync('public/data/factors_master.csv', 'utf8');

Papa.parse(csvText, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: (results) => {
    const factorsData = results.data.filter(f => f.active_for_calculation === true);
    setFactorsDataForTesting(factorsData);

    const persona1 = {
      electricity_kWh: 150,
      household_size: 2,
      heating_type: 'district',
      heating_district_gcal: 1,
      car_usage: 'no',
      pt_freq: 'often',
      pt_distance: 10,
      flights: { domestic: 0, short_haul: 0, long_haul: 0 },
      waste_bags: 1,
      waste_recycle: 'usually'
    };

    const persona2 = {
      electricity_kWh: 400,
      household_size: 4,
      heating_type: 'natural_gas',
      heating_gas_m3: 150,
      car_usage: 'yes',
      car_fuel: 'gasoline',
      car_km_week: 200,
      car_people: 2,
      pt_freq: 'rarely',
      pt_distance: 5,
      flights: { domestic: 2, short_haul: 0, long_haul: 0 },
      flight_class: 'economy',
      waste_bags: 3,
      waste_recycle: 'sometimes'
    };

    const persona3 = {
      electricity_kWh: 800,
      household_size: 1,
      heating_type: 'electric',
      heating_elec_kwh: 500,
      car_usage: 'yes',
      car_fuel: 'gasoline',
      car_km_week: 500,
      car_people: 1,
      pt_freq: 'never',
      flights: { domestic: 4, short_haul: 2, long_haul: 1 },
      flight_class: 'business',
      waste_bags: 5,
      waste_recycle: 'never'
    };

    console.log("Persona 1: Low-footprint urban");
    console.dir(calculations.calculateTotal(persona1), {depth: null});
    
    console.log("\nPersona 2: Medium-footprint family");
    console.dir(calculations.calculateTotal(persona2), {depth: null});

    console.log("\nPersona 3: High-footprint flyer");
    console.dir(calculations.calculateTotal(persona3), {depth: null});
  }
});
