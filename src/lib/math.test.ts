import { describe, test, expect } from 'vitest';

import {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  power,
  squareRoot,
  square,
  cube,
  reciprocal,
  absolute,
} from './math';

describe('Math Utilities', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should add two negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test('should add a positive and negative number', () => {
      expect(add(5, -3)).toBe(2);
    });

    test('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });

    test('should handle decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('subtract', () => {
    test('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test('should subtract two negative numbers', () => {
      expect(subtract(-2, -3)).toBe(1);
    });

    test('should subtract a negative from a positive', () => {
      expect(subtract(5, -3)).toBe(8);
    });

    test('should handle zero', () => {
      expect(subtract(5, 0)).toBe(5);
      expect(subtract(0, 5)).toBe(-5);
      expect(subtract(0, 0)).toBe(0);
    });

    test('should handle decimal numbers', () => {
      expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });
  });

  describe('multiply', () => {
    test('should multiply two positive numbers', () => {
      expect(multiply(2, 3)).toBe(6);
    });

    test('should multiply two negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6);
    });

    test('should multiply a positive and negative number', () => {
      expect(multiply(2, -3)).toBe(-6);
    });

    test('should handle zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(0, 0)).toBe(0);
    });

    test('should handle decimal numbers', () => {
      expect(multiply(0.1, 0.2)).toBeCloseTo(0.02);
    });

    test('should handle one', () => {
      expect(multiply(5, 1)).toBe(5);
      expect(multiply(1, 5)).toBe(5);
    });
  });

  describe('divide', () => {
    test('should divide two positive numbers', () => {
      expect(divide(6, 3)).toBe(2);
    });

    test('should divide two negative numbers', () => {
      expect(divide(-6, -3)).toBe(2);
    });

    test('should divide a positive by a negative number', () => {
      expect(divide(6, -3)).toBe(-2);
    });

    test('should handle zero numerator', () => {
      expect(divide(0, 5)).toBe(0);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
    });

    test('should handle decimal numbers', () => {
      expect(divide(0.6, 0.3)).toBeCloseTo(2);
    });

    test('should handle division resulting in decimal', () => {
      expect(divide(1, 3)).toBeCloseTo(0.333333);
    });

    test('should handle division by one', () => {
      expect(divide(5, 1)).toBe(5);
    });
  });

  describe('percentage', () => {
    test('should convert a number to percentage', () => {
      expect(percentage(50)).toBe(0.5);
    });

    test('should handle zero', () => {
      expect(percentage(0)).toBe(0);
    });

    test('should handle 100', () => {
      expect(percentage(100)).toBe(1);
    });

    test('should handle decimal percentages', () => {
      expect(percentage(33.33)).toBeCloseTo(0.3333);
    });

    test('should handle numbers greater than 100', () => {
      expect(percentage(200)).toBe(2);
    });

    test('should handle negative percentages', () => {
      expect(percentage(-50)).toBe(-0.5);
    });
  });

  describe('Algebraic Functions', () => {
    describe('power', () => {
      test('should calculate positive integer exponents', () => {
        expect(power(2, 3)).toBe(8);
        expect(power(5, 2)).toBe(25);
      });

      test('should handle zero exponent', () => {
        expect(power(5, 0)).toBe(1);
        expect(power(100, 0)).toBe(1);
      });

      test('should handle negative exponents', () => {
        expect(power(2, -1)).toBe(0.5);
        expect(power(10, -2)).toBe(0.01);
      });

      test('should handle fractional exponents', () => {
        expect(power(4, 0.5)).toBe(2);
        expect(power(8, 1 / 3)).toBeCloseTo(2);
      });

      test('should handle base of zero', () => {
        expect(power(0, 5)).toBe(0);
      });

      test('should handle negative base', () => {
        expect(power(-2, 3)).toBe(-8);
        expect(power(-2, 2)).toBe(4);
      });
    });

    describe('squareRoot', () => {
      test('should calculate square root of positive numbers', () => {
        expect(squareRoot(4)).toBe(2);
        expect(squareRoot(9)).toBe(3);
        expect(squareRoot(16)).toBe(4);
      });

      test('should handle zero', () => {
        expect(squareRoot(0)).toBe(0);
      });

      test('should handle decimal numbers', () => {
        expect(squareRoot(2)).toBeCloseTo(1.414213);
        expect(squareRoot(0.25)).toBe(0.5);
      });

      test('should throw error for negative numbers', () => {
        expect(() => squareRoot(-1)).toThrow(
          'Cannot calculate square root of negative number',
        );
        expect(() => squareRoot(-100)).toThrow(
          'Cannot calculate square root of negative number',
        );
      });
    });

    describe('square', () => {
      test('should calculate square of positive numbers', () => {
        expect(square(2)).toBe(4);
        expect(square(5)).toBe(25);
      });

      test('should calculate square of negative numbers', () => {
        expect(square(-3)).toBe(9);
        expect(square(-10)).toBe(100);
      });

      test('should handle zero', () => {
        expect(square(0)).toBe(0);
      });

      test('should handle decimal numbers', () => {
        expect(square(0.5)).toBe(0.25);
        expect(square(1.5)).toBe(2.25);
      });
    });

    describe('cube', () => {
      test('should calculate cube of positive numbers', () => {
        expect(cube(2)).toBe(8);
        expect(cube(3)).toBe(27);
      });

      test('should calculate cube of negative numbers', () => {
        expect(cube(-2)).toBe(-8);
        expect(cube(-3)).toBe(-27);
      });

      test('should handle zero', () => {
        expect(cube(0)).toBe(0);
      });

      test('should handle decimal numbers', () => {
        expect(cube(0.5)).toBe(0.125);
        expect(cube(2.5)).toBe(15.625);
      });
    });

    describe('reciprocal', () => {
      test('should calculate reciprocal of positive numbers', () => {
        expect(reciprocal(2)).toBe(0.5);
        expect(reciprocal(4)).toBe(0.25);
        expect(reciprocal(0.5)).toBe(2);
      });

      test('should calculate reciprocal of negative numbers', () => {
        expect(reciprocal(-2)).toBe(-0.5);
        expect(reciprocal(-4)).toBe(-0.25);
      });

      test('should throw error when dividing by zero', () => {
        expect(() => reciprocal(0)).toThrow(
          'Cannot calculate reciprocal of zero',
        );
      });

      test('should handle decimal numbers', () => {
        expect(reciprocal(0.1)).toBeCloseTo(10);
        expect(reciprocal(0.25)).toBe(4);
      });
    });

    describe('absolute', () => {
      test('should return absolute value of positive numbers', () => {
        expect(absolute(5)).toBe(5);
        expect(absolute(100)).toBe(100);
      });

      test('should return absolute value of negative numbers', () => {
        expect(absolute(-5)).toBe(5);
        expect(absolute(-100)).toBe(100);
      });

      test('should handle zero', () => {
        expect(absolute(0)).toBe(0);
      });

      test('should handle decimal numbers', () => {
        expect(absolute(-3.14)).toBe(3.14);
        expect(absolute(3.14)).toBe(3.14);
      });
    });
  });
});
