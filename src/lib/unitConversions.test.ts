import { describe, test, expect } from 'vitest';

import {
  convertLength,
  convertWeight,
  convertTemperature,
  convertTime,
  convertVolume,
} from './unitConversions';

describe('Unit Conversions', () => {
  describe('Length Conversions', () => {
    test('should convert meters to kilometers', () => {
      expect(convertLength(1000, 'meters', 'kilometers')).toBeCloseTo(1);
    });

    test('should convert kilometers to miles', () => {
      expect(convertLength(1, 'kilometers', 'miles')).toBeCloseTo(0.621371);
    });

    test('should convert feet to meters', () => {
      expect(convertLength(1, 'feet', 'meters')).toBeCloseTo(0.3048);
    });

    test('should convert inches to centimeters', () => {
      expect(convertLength(1, 'inches', 'centimeters')).toBeCloseTo(2.54);
    });

    test('should convert miles to kilometers', () => {
      expect(convertLength(1, 'miles', 'kilometers')).toBeCloseTo(1.60934);
    });

    test('should return same value for same unit', () => {
      expect(convertLength(100, 'meters', 'meters')).toBe(100);
    });

    test('should handle zero', () => {
      expect(convertLength(0, 'meters', 'kilometers')).toBe(0);
    });
  });

  describe('Weight Conversions', () => {
    test('should convert kilograms to pounds', () => {
      expect(convertWeight(1, 'kilograms', 'pounds')).toBeCloseTo(2.20462);
    });

    test('should convert pounds to kilograms', () => {
      expect(convertWeight(1, 'pounds', 'kilograms')).toBeCloseTo(0.453592);
    });

    test('should convert grams to ounces', () => {
      expect(convertWeight(100, 'grams', 'ounces')).toBeCloseTo(3.5274);
    });

    test('should convert tons to kilograms', () => {
      expect(convertWeight(1, 'tons', 'kilograms')).toBeCloseTo(1000);
    });

    test('should return same value for same unit', () => {
      expect(convertWeight(50, 'kilograms', 'kilograms')).toBe(50);
    });

    test('should handle zero', () => {
      expect(convertWeight(0, 'grams', 'pounds')).toBe(0);
    });
  });

  describe('Temperature Conversions', () => {
    test('should convert Celsius to Fahrenheit', () => {
      expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBeCloseTo(32);
      expect(convertTemperature(100, 'celsius', 'fahrenheit')).toBeCloseTo(212);
    });

    test('should convert Fahrenheit to Celsius', () => {
      expect(convertTemperature(32, 'fahrenheit', 'celsius')).toBeCloseTo(0);
      expect(convertTemperature(212, 'fahrenheit', 'celsius')).toBeCloseTo(100);
    });

    test('should convert Celsius to Kelvin', () => {
      expect(convertTemperature(0, 'celsius', 'kelvin')).toBeCloseTo(273.15);
      expect(convertTemperature(100, 'celsius', 'kelvin')).toBeCloseTo(373.15);
    });

    test('should convert Kelvin to Celsius', () => {
      expect(convertTemperature(273.15, 'kelvin', 'celsius')).toBeCloseTo(0);
      expect(convertTemperature(373.15, 'kelvin', 'celsius')).toBeCloseTo(100);
    });

    test('should convert Fahrenheit to Kelvin', () => {
      expect(convertTemperature(32, 'fahrenheit', 'kelvin')).toBeCloseTo(
        273.15,
      );
    });

    test('should convert Kelvin to Fahrenheit', () => {
      expect(convertTemperature(273.15, 'kelvin', 'fahrenheit')).toBeCloseTo(
        32,
      );
    });

    test('should return same value for same unit', () => {
      expect(convertTemperature(25, 'celsius', 'celsius')).toBe(25);
      expect(convertTemperature(77, 'fahrenheit', 'fahrenheit')).toBeCloseTo(
        77,
      );
    });

    test('should handle negative temperatures', () => {
      expect(convertTemperature(-40, 'celsius', 'fahrenheit')).toBeCloseTo(-40);
    });
  });

  describe('Time Conversions', () => {
    test('should convert seconds to minutes', () => {
      expect(convertTime(60, 'seconds', 'minutes')).toBeCloseTo(1);
      expect(convertTime(120, 'seconds', 'minutes')).toBeCloseTo(2);
    });

    test('should convert minutes to hours', () => {
      expect(convertTime(60, 'minutes', 'hours')).toBeCloseTo(1);
      expect(convertTime(90, 'minutes', 'hours')).toBeCloseTo(1.5);
    });

    test('should convert hours to days', () => {
      expect(convertTime(24, 'hours', 'days')).toBeCloseTo(1);
      expect(convertTime(48, 'hours', 'days')).toBeCloseTo(2);
    });

    test('should convert days to weeks', () => {
      expect(convertTime(7, 'days', 'weeks')).toBeCloseTo(1);
      expect(convertTime(14, 'days', 'weeks')).toBeCloseTo(2);
    });

    test('should convert weeks to seconds', () => {
      expect(convertTime(1, 'weeks', 'seconds')).toBeCloseTo(604800);
    });

    test('should return same value for same unit', () => {
      expect(convertTime(100, 'seconds', 'seconds')).toBe(100);
    });

    test('should handle zero', () => {
      expect(convertTime(0, 'hours', 'minutes')).toBe(0);
    });
  });

  describe('Volume Conversions', () => {
    test('should convert liters to milliliters', () => {
      expect(convertVolume(1, 'liters', 'milliliters')).toBeCloseTo(1000);
    });

    test('should convert gallons to liters', () => {
      expect(convertVolume(1, 'gallons', 'liters')).toBeCloseTo(3.78541);
    });

    test('should convert cups to milliliters', () => {
      expect(convertVolume(1, 'cups', 'milliliters')).toBeCloseTo(236.588);
    });

    test('should convert liters to gallons', () => {
      expect(convertVolume(1, 'liters', 'gallons')).toBeCloseTo(0.264172);
    });

    test('should convert fluid ounces to cups', () => {
      expect(convertVolume(8, 'fluidOunces', 'cups')).toBeCloseTo(1);
    });

    test('should return same value for same unit', () => {
      expect(convertVolume(500, 'milliliters', 'milliliters')).toBe(500);
    });

    test('should handle zero', () => {
      expect(convertVolume(0, 'liters', 'gallons')).toBe(0);
    });
  });
});
