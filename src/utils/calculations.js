import { getFactor } from './calculator.js';

export const calculateElectricity = (answers) => {
  const kWh = answers.electricity_kWh || 0;
  const people = answers.household_size || 1;
  const factor = getFactor('electricity', 'grid');
  
  if (!factor) return { total: 0, transparency: null };

  const total = (kWh * 12 * factor.factor_value) / people;

  const transparency = {
    category: 'Electricity',
    formula: `(${kWh} kWh/month × 12 months × ${factor.factor_value} ${factor.factor_unit}/${factor.activity_unit}) / ${people} people`,
    coefficient: factor.factor_value,
    source: factor.source_name,
    year: factor.year,
    geography: factor.geography,
    confidence: factor.confidence_level
  };

  return { total, transparency };
};

export const calculateHeating = (answers) => {
  const type = answers.heating_type;
  if (!type || type === 'not_sure') return { total: 0, transparency: null };

  let factor;
  let usage = 0;
  let total = 0;
  let formula = '';

  if (type === 'natural_gas') {
    factor = getFactor('heating', 'natural_gas');
    usage = answers.heating_gas_m3 || 0;
    if (factor) {
      total = usage * 12 * factor.factor_value;
      formula = `${usage} m³/month × 12 months × ${factor.factor_value} ${factor.factor_unit}/${factor.activity_unit}`;
    }
  } else if (type === 'electric') {
    // If it's electric and they didn't separate it, we don't want to double count if they included it in electricity.
    // Assuming advanced mode exact input for electric heating if available, otherwise just use a placeholder
    factor = getFactor('heating', 'electric');
    usage = answers.heating_elec_kwh || 0;
    if (factor) {
      total = usage * 12 * factor.factor_value;
      formula = `${usage} kWh/month × 12 months × ${factor.factor_value} ${factor.factor_unit}/${factor.activity_unit}`;
    }
  } else if (type === 'district') {
    factor = getFactor('heating', 'district');
    // For district heating without a direct measure, we use a rough proxy or allow exact input
    usage = answers.heating_district_gcal || 1; // 1 Gcal/month proxy if not provided
    if (factor) {
      total = usage * 12 * factor.factor_value * 1000; // tCO2e to kgCO2e
      formula = `${usage} Gcal/month × 12 months × ${factor.factor_value} tCO2e/Gcal × 1000`;
    }
  }

  if (!factor) return { total: 0, transparency: null };

  return {
    total,
    transparency: {
      category: 'Heating',
      formula,
      coefficient: factor.factor_value,
      source: factor.source_name,
      year: factor.year,
      geography: factor.geography,
      confidence: factor.confidence_level
    }
  };
};

export const calculateCar = (answers) => {
  if (answers.car_usage !== 'yes') return { total: 0, transparency: null };

  const fuel = answers.car_fuel;
  const kmPerWeek = answers.car_km_week || 0;
  const people = answers.car_people || 1;
  const factor = getFactor('car', fuel);

  if (!factor) return { total: 0, transparency: null };

  let total = 0;
  let formula = '';
  
  if (fuel === 'ev') {
    // EV factor is per km
    total = (kmPerWeek * 52 * factor.factor_value) / people;
    formula = `(${kmPerWeek} km/week × 52 weeks × ${factor.factor_value} ${factor.factor_unit}/${factor.activity_unit}) / ${people} people`;
  } else {
    // Other fuels are per L, we assume fuel efficiency of 8L/100km for generic calc
    const lPer100Km = 8;
    const litersPerWeek = (kmPerWeek / 100) * lPer100Km;
    total = (litersPerWeek * 52 * factor.factor_value) / people;
    formula = `((${kmPerWeek} km/week ÷ 100 × ${lPer100Km} L/100km) × 52 weeks × ${factor.factor_value} ${factor.factor_unit}/${factor.activity_unit}) / ${people} people`;
  }

  return {
    total,
    transparency: {
      category: 'Private Car',
      formula,
      coefficient: factor.factor_value,
      source: factor.source_name,
      year: factor.year,
      geography: factor.geography,
      confidence: factor.confidence_level
    }
  };
};

export const calculatePublicTransport = (answers) => {
  const freq = answers.pt_freq;
  if (!freq || freq === 'never') return { total: 0, transparency: null };

  const distance = answers.pt_distance || 0;
  const factor = getFactor('public_transport', 'bus'); // Default to bus blend
  
  if (!factor) return { total: 0, transparency: null };

  let daysPerWeek = 0;
  if (freq === 'rarely') daysPerWeek = 1.5;
  if (freq === 'often') daysPerWeek = 3.5;
  if (freq === 'daily') daysPerWeek = 5;

  const total = distance * daysPerWeek * 52 * factor.factor_value;

  return {
    total,
    transparency: {
      category: 'Public Transport',
      formula: `${distance} km/day × ${daysPerWeek} days/week × 52 weeks × ${factor.factor_value} ${factor.factor_unit}/${factor.activity_unit}`,
      coefficient: factor.factor_value,
      source: factor.source_name,
      year: factor.year,
      geography: factor.geography,
      confidence: factor.confidence_level
    }
  };
};

export const calculateFlights = (answers) => {
  const flights = answers.flights || { domestic: 0, short_haul: 0, long_haul: 0 };
  const cabinClass = answers.flight_class || 'economy';

  let total = 0;
  const transparencyItems = [];

  const types = ['domestic', 'short_haul', 'long_haul'];
  
  types.forEach(type => {
    const trips = flights[type] || 0;
    if (trips > 0) {
      const factorName = `${type}_${cabinClass === 'business' ? 'business' : 'economy'}`;
      const factor = getFactor('flight', factorName);
      
      if (factor) {
        const itemTotal = trips * factor.factor_value;
        total += itemTotal;
        transparencyItems.push({
          category: `Flight (${type}, ${cabinClass})`,
          formula: `${trips} trips × ${factor.factor_value} ${factor.factor_unit}/trip`,
          coefficient: factor.factor_value,
          source: factor.source_name,
          year: factor.year,
          geography: factor.geography,
          confidence: factor.confidence_level
        });
      }
    }
  });

  if (total === 0) return { total: 0, transparency: null };

  return {
    total,
    transparency: transparencyItems
  };
};

export const calculateWaste = (answers) => {
  const bags = answers.waste_bags || 0;
  const recycle = answers.waste_recycle || 'never';
  
  const factor = getFactor('waste', 'bag');
  const modFactor = getFactor('waste', 'recycle');
  
  if (!factor) return { total: 0, transparency: null };

  let rawTotal = bags * 52 * factor.factor_value;
  let multiplier = 1;
  let modFormula = "";
  
  if (modFactor && (recycle === 'sometimes' || recycle === 'usually')) {
    multiplier = recycle === 'usually' ? (1 + modFactor.factor_value) : (1 + (modFactor.factor_value / 2));
    modFormula = ` × ${multiplier.toFixed(2)} (recycling factor)`;
  }

  const total = rawTotal * multiplier;

  return {
    total,
    transparency: {
      category: 'Waste',
      formula: `${bags} bags/week × 52 weeks × ${factor.factor_value} ${factor.factor_unit}/bag${modFormula}`,
      coefficient: factor.factor_value,
      source: factor.source_name,
      year: factor.year,
      geography: factor.geography,
      confidence: factor.confidence_level
    }
  };
};

export const calculateTotal = (answers) => {
  const elec = calculateElectricity(answers);
  const heat = calculateHeating(answers);
  const car = calculateCar(answers);
  const pt = calculatePublicTransport(answers);
  const flight = calculateFlights(answers);
  const waste = calculateWaste(answers);

  const total = elec.total + heat.total + car.total + pt.total + flight.total + waste.total;
  
  // Flatten transparency arrays
  let transparencies = [];
  if (elec.transparency) transparencies.push(elec.transparency);
  if (heat.transparency) transparencies.push(heat.transparency);
  if (car.transparency) transparencies.push(car.transparency);
  if (pt.transparency) transparencies.push(pt.transparency);
  if (flight.transparency) {
    if (Array.isArray(flight.transparency)) transparencies.push(...flight.transparency);
    else transparencies.push(flight.transparency);
  }
  if (waste.transparency) transparencies.push(waste.transparency);

  return {
    total,
    breakdown: {
      electricity: elec.total,
      heating: heat.total,
      car: car.total,
      public_transport: pt.total,
      flights: flight.total,
      waste: waste.total
    },
    transparencies
  };
};
