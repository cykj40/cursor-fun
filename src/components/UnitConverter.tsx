import { useState } from 'react';

import {
  convertLength,
  convertWeight,
  convertTemperature,
  convertTime,
  convertVolume,
  lengthConversions,
  weightConversions,
  timeConversions,
  volumeConversions,
} from '../lib/unitConversions';

type ConversionCategory =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'time'
  | 'volume';

const categoryUnits = {
  length: Object.keys(lengthConversions),
  weight: Object.keys(weightConversions),
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
  time: Object.keys(timeConversions),
  volume: Object.keys(volumeConversions),
};

const categoryLabels = {
  length: 'Length',
  weight: 'Weight',
  temperature: 'Temperature',
  time: 'Time',
  volume: 'Volume',
};

export const UnitConverter = () => {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const value = Number.parseFloat(inputValue);
    if (Number.isNaN(value)) {
      setResult(null);
      return;
    }

    let convertedValue: number;

    switch (category) {
      case 'length':
        convertedValue = convertLength(value, fromUnit as any, toUnit as any);
        break;
      case 'weight':
        convertedValue = convertWeight(value, fromUnit as any, toUnit as any);
        break;
      case 'temperature':
        convertedValue = convertTemperature(value, fromUnit, toUnit);
        break;
      case 'time':
        convertedValue = convertTime(value, fromUnit as any, toUnit as any);
        break;
      case 'volume':
        convertedValue = convertVolume(value, fromUnit as any, toUnit as any);
        break;
      default:
        convertedValue = value;
    }

    setResult(convertedValue);
  };

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    setFromUnit(categoryUnits[newCategory][0]);
    setToUnit(categoryUnits[newCategory][1] || categoryUnits[newCategory][0]);
    setResult(null);
  };

  return (
    <div className="rounded-xl bg-gray-800 p-4">
      <h3 className="mb-4 text-center text-lg font-semibold text-white">
        Unit Converter
      </h3>

      {/* Category Selection */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {(Object.keys(categoryLabels) as ConversionCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-lg p-2 text-sm font-semibold transition-all ${
              category === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Input Value */}
      <div className="mb-3">
        <label className="mb-1 block text-sm text-gray-400">Value</label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full rounded-lg bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter value"
        />
      </div>

      {/* From Unit */}
      <div className="mb-3">
        <label className="mb-1 block text-sm text-gray-400">From</label>
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full rounded-lg bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {categoryUnits[category].map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {/* To Unit */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-gray-400">To</label>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-full rounded-lg bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {categoryUnits[category].map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        className="mb-4 w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition-all hover:bg-blue-500 active:scale-95"
      >
        Convert
      </button>

      {/* Result */}
      {result !== null && (
        <div className="rounded-lg bg-gray-900 p-4 text-center">
          <div className="text-sm text-gray-400">Result</div>
          <div className="mt-1 text-2xl font-bold text-white">
            {result.toFixed(6).replace(/\.?0+$/, '')} {toUnit}
          </div>
        </div>
      )}
    </div>
  );
};
