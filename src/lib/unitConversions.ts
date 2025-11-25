// Length conversions (base unit: meters)
export const lengthConversions = {
  meters: 1,
  kilometers: 0.001,
  centimeters: 100,
  millimeters: 1000,
  miles: 0.000621371,
  yards: 1.09361,
  feet: 3.28084,
  inches: 39.3701,
} as const;

// Weight conversions (base unit: kilograms)
export const weightConversions = {
  kilograms: 1,
  grams: 1000,
  milligrams: 1000000,
  pounds: 2.20462,
  ounces: 35.274,
  tons: 0.001,
} as const;

// Temperature conversions
export const convertTemperature = (
  value: number,
  from: string,
  to: string,
): number => {
  // First convert to Celsius
  let celsius: number;
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = ((value - 32) * 5) / 9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  // Then convert from Celsius to target
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return (celsius * 9) / 5 + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
};

// Time conversions (base unit: seconds)
export const timeConversions = {
  seconds: 1,
  minutes: 1 / 60,
  hours: 1 / 3600,
  days: 1 / 86400,
  weeks: 1 / 604800,
} as const;

// Volume conversions (base unit: liters)
export const volumeConversions = {
  liters: 1,
  milliliters: 1000,
  gallons: 0.264172,
  quarts: 1.05669,
  pints: 2.11338,
  cups: 4.22675,
  fluidOunces: 33.814,
} as const;

// Generic conversion function
export const convert = (
  value: number,
  fromUnit: string,
  toUnit: string,
  conversionTable: Record<string, number>,
): number => {
  if (fromUnit === toUnit) return value;

  // Convert to base unit first
  const baseValue = value / conversionTable[fromUnit];

  // Convert from base unit to target unit
  return baseValue * conversionTable[toUnit];
};

// Specific conversion functions
export const convertLength = (
  value: number,
  from: keyof typeof lengthConversions,
  to: keyof typeof lengthConversions,
): number => {
  return convert(value, from, to, lengthConversions);
};

export const convertWeight = (
  value: number,
  from: keyof typeof weightConversions,
  to: keyof typeof weightConversions,
): number => {
  return convert(value, from, to, weightConversions);
};

export const convertTime = (
  value: number,
  from: keyof typeof timeConversions,
  to: keyof typeof timeConversions,
): number => {
  return convert(value, from, to, timeConversions);
};

export const convertVolume = (
  value: number,
  from: keyof typeof volumeConversions,
  to: keyof typeof volumeConversions,
): number => {
  return convert(value, from, to, volumeConversions);
};
