import { useReducer, useState } from 'react';

import { UnitConverter } from './components/UnitConverter';
import {
  add,
  subtract,
  multiply,
  divide,
  power,
  squareRoot,
  square,
  cube,
  reciprocal,
  absolute,
} from './lib/math.js';

type CalculatorState = {
  display: string;
  previousValue: number | null;
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | null;
  waitingForOperand: boolean;
};

type CalculatorAction =
  | { type: 'INPUT_DIGIT'; digit: string }
  | { type: 'INPUT_DECIMAL' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ENTRY' }
  | {
      type: 'SET_OPERATION';
      operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power';
    }
  | { type: 'CALCULATE' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'PERCENTAGE' }
  | { type: 'SQUARE_ROOT' }
  | { type: 'SQUARE' }
  | { type: 'CUBE' }
  | { type: 'RECIPROCAL' }
  | { type: 'ABSOLUTE' };

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
};

const performOperation = (
  prev: number,
  current: number,
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power',
): number => {
  switch (operation) {
    case 'add':
      return add(prev, current);
    case 'subtract':
      return subtract(prev, current);
    case 'multiply':
      return multiply(prev, current);
    case 'divide':
      return divide(prev, current);
    case 'power':
      return power(prev, current);
  }
};

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState => {
  switch (action.type) {
    case 'INPUT_DIGIT': {
      if (state.waitingForOperand) {
        return {
          ...state,
          display: action.digit,
          waitingForOperand: false,
        };
      }
      return {
        ...state,
        display:
          state.display === '0' ? action.digit : state.display + action.digit,
      };
    }

    case 'INPUT_DECIMAL': {
      if (state.waitingForOperand) {
        return {
          ...state,
          display: '0.',
          waitingForOperand: false,
        };
      }
      if (state.display.includes('.')) {
        return state;
      }
      return {
        ...state,
        display: state.display + '.',
      };
    }

    case 'CLEAR': {
      return initialState;
    }

    case 'CLEAR_ENTRY': {
      return {
        ...state,
        display: '0',
      };
    }

    case 'TOGGLE_SIGN': {
      const value = Number.parseFloat(state.display);
      return {
        ...state,
        display: String(-value),
      };
    }

    case 'PERCENTAGE': {
      const value = Number.parseFloat(state.display) / 100;
      return {
        ...state,
        display: String(value),
      };
    }

    case 'SQUARE_ROOT': {
      try {
        const value = Number.parseFloat(state.display);
        const result = squareRoot(value);
        return {
          ...state,
          display: String(result),
          waitingForOperand: true,
        };
      } catch {
        return {
          ...initialState,
          display: 'Error',
        };
      }
    }

    case 'SQUARE': {
      const value = Number.parseFloat(state.display);
      const result = square(value);
      return {
        ...state,
        display: String(result),
        waitingForOperand: true,
      };
    }

    case 'CUBE': {
      const value = Number.parseFloat(state.display);
      const result = cube(value);
      return {
        ...state,
        display: String(result),
        waitingForOperand: true,
      };
    }

    case 'RECIPROCAL': {
      try {
        const value = Number.parseFloat(state.display);
        const result = reciprocal(value);
        return {
          ...state,
          display: String(result),
          waitingForOperand: true,
        };
      } catch {
        return {
          ...initialState,
          display: 'Error',
        };
      }
    }

    case 'ABSOLUTE': {
      const value = Number.parseFloat(state.display);
      const result = absolute(value);
      return {
        ...state,
        display: String(result),
      };
    }

    case 'SET_OPERATION': {
      const currentValue = Number.parseFloat(state.display);

      if (state.previousValue === null) {
        return {
          ...state,
          previousValue: currentValue,
          operation: action.operation,
          waitingForOperand: true,
        };
      }

      if (state.operation && state.waitingForOperand) {
        return {
          ...state,
          operation: action.operation,
        };
      }

      if (state.operation) {
        try {
          const result = performOperation(
            state.previousValue,
            currentValue,
            state.operation,
          );
          return {
            ...state,
            display: String(result),
            previousValue: result,
            operation: action.operation,
            waitingForOperand: true,
          };
        } catch {
          return {
            ...initialState,
            display: 'Error',
          };
        }
      }

      return state;
    }

    case 'CALCULATE': {
      if (!state.operation || state.previousValue === null) {
        return state;
      }

      const currentValue = Number.parseFloat(state.display);

      try {
        const result = performOperation(
          state.previousValue,
          currentValue,
          state.operation,
        );
        return {
          display: String(result),
          previousValue: null,
          operation: null,
          waitingForOperand: true,
        };
      } catch {
        return {
          ...initialState,
          display: 'Error',
        };
      }
    }

    default:
      return state;
  }
};

export const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [showConverter, setShowConverter] = useState(false);

  const handleDigit = (digit: string) => {
    dispatch({ type: 'INPUT_DIGIT', digit });
  };

  const handleOperation = (
    operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power',
  ) => {
    dispatch({ type: 'SET_OPERATION', operation });
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-4 bg-gray-100 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-gray-900 p-6 shadow-2xl">
        {/* Header with converter toggle */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Calculator</h2>
          <button
            onClick={() => setShowConverter(!showConverter)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-95"
          >
            {showConverter ? 'Hide' : 'Show'} Converter
          </button>
        </div>

        {/* Display */}
        <div
          className="mb-6 rounded-lg bg-gray-800 p-6 text-right"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="overflow-hidden text-4xl font-light text-ellipsis text-white">
            {state.display}
          </div>
        </div>

        <div className="flex gap-4">
          {/* Basic Calculator Grid */}
          <div className="grid flex-1 grid-cols-4 gap-3" role="grid">
            {/* Row 1 */}
            <button
              onClick={() => dispatch({ type: 'CLEAR' })}
              className="col-span-2 rounded-xl bg-gray-600 p-5 text-xl font-semibold text-white transition-all hover:bg-gray-500 active:scale-95"
              aria-label="Clear all"
            >
              AC
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SIGN' })}
              className="rounded-xl bg-gray-600 p-5 text-xl font-semibold text-white transition-all hover:bg-gray-500 active:scale-95"
              aria-label="Toggle sign"
            >
              +/-
            </button>
            <button
              onClick={() => handleOperation('divide')}
              className="rounded-xl bg-orange-500 p-5 text-2xl font-semibold text-white transition-all hover:bg-orange-400 active:scale-95"
              aria-label="Divide"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleDigit('7')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="7"
            >
              7
            </button>
            <button
              onClick={() => handleDigit('8')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="8"
            >
              8
            </button>
            <button
              onClick={() => handleDigit('9')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="9"
            >
              9
            </button>
            <button
              onClick={() => handleOperation('multiply')}
              className="rounded-xl bg-orange-500 p-5 text-2xl font-semibold text-white transition-all hover:bg-orange-400 active:scale-95"
              aria-label="Multiply"
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleDigit('4')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="4"
            >
              4
            </button>
            <button
              onClick={() => handleDigit('5')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="5"
            >
              5
            </button>
            <button
              onClick={() => handleDigit('6')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="6"
            >
              6
            </button>
            <button
              onClick={() => handleOperation('subtract')}
              className="rounded-xl bg-orange-500 p-5 text-2xl font-semibold text-white transition-all hover:bg-orange-400 active:scale-95"
              aria-label="Subtract"
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleDigit('1')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="1"
            >
              1
            </button>
            <button
              onClick={() => handleDigit('2')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="2"
            >
              2
            </button>
            <button
              onClick={() => handleDigit('3')}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="3"
            >
              3
            </button>
            <button
              onClick={() => handleOperation('add')}
              className="rounded-xl bg-orange-500 p-5 text-2xl font-semibold text-white transition-all hover:bg-orange-400 active:scale-95"
              aria-label="Add"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => handleDigit('0')}
              className="col-span-2 rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="0"
            >
              0
            </button>
            <button
              onClick={() => dispatch({ type: 'INPUT_DECIMAL' })}
              className="rounded-xl bg-gray-700 p-5 text-2xl font-semibold text-white transition-all hover:bg-gray-600 active:scale-95"
              aria-label="Decimal point"
            >
              .
            </button>
            <button
              onClick={() => dispatch({ type: 'CALCULATE' })}
              className="rounded-xl bg-orange-500 p-5 text-2xl font-semibold text-white transition-all hover:bg-orange-400 active:scale-95"
              aria-label="Equals"
            >
              =
            </button>
          </div>

          {/* Algebra Functions Panel */}
          <div className="grid grid-cols-2 gap-3 self-start" role="grid">
            <div className="col-span-2 mb-2 text-center text-sm font-semibold text-gray-400">
              Algebra Functions
            </div>

            <button
              onClick={() => dispatch({ type: 'SQUARE_ROOT' })}
              className="rounded-xl bg-purple-600 p-4 text-lg font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
              aria-label="Square root"
            >
              √x
            </button>
            <button
              onClick={() => dispatch({ type: 'SQUARE' })}
              className="rounded-xl bg-purple-600 p-4 text-lg font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
              aria-label="Square"
            >
              x²
            </button>
            <button
              onClick={() => dispatch({ type: 'CUBE' })}
              className="rounded-xl bg-purple-600 p-4 text-lg font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
              aria-label="Cube"
            >
              x³
            </button>
            <button
              onClick={() => handleOperation('power')}
              className="rounded-xl bg-purple-600 p-4 text-lg font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
              aria-label="Power"
            >
              xʸ
            </button>
            <button
              onClick={() => dispatch({ type: 'RECIPROCAL' })}
              className="rounded-xl bg-purple-600 p-4 text-lg font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
              aria-label="Reciprocal"
            >
              1/x
            </button>
            <button
              onClick={() => dispatch({ type: 'ABSOLUTE' })}
              className="rounded-xl bg-purple-600 p-4 text-lg font-semibold text-white transition-all hover:bg-purple-500 active:scale-95"
              aria-label="Absolute value"
            >
              |x|
            </button>
          </div>
        </div>
      </div>

      {/* Unit Converter Panel */}
      {showConverter && (
        <div className="w-full max-w-md">
          <UnitConverter />
        </div>
      )}
    </div>
  );
};
