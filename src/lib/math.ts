export const add = (x: number, y: number): number => x + y;

export const subtract = (x: number, y: number): number => x - y;

export const multiply = (x: number, y: number): number => x * y;

export const divide = (x: number, y: number): number => {
  if (y === 0) {
    throw new Error('Cannot divide by zero');
  }
  return x / y;
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
