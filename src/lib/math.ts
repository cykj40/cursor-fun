export const add = (a: number, b: number): number => a + b;

export const subtract = (a: number, b: number): number => a - b;

export const multiply = (a: number, b: number): number => a * b;

export const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
};

export const percentage = (value: number): number => value / 100;

// Algebraic functions
export const power = (base: number, exponent: number): number => {
  return Math.pow(base, exponent);
};

export const squareRoot = (value: number): number => {
  if (value < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  return Math.sqrt(value);
};

export const square = (value: number): number => value * value;

export const cube = (value: number): number => value * value * value;

export const reciprocal = (value: number): number => {
  if (value === 0) {
    throw new Error('Cannot calculate reciprocal of zero');
  }
  return 1 / value;
};

export const absolute = (value: number): number => Math.abs(value);
