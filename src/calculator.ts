const add = (x: number) => (y: number) => x + y;

const subtract = (x: number) => (y: number) => x - y;

const multiply = (x: number) => (y: number) => x * y;

const divide = (x: number) => (y: number) => x / y;

const modulo = (x: number) => (y: number) => x % y;

type Action = {
  type: 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE' | 'MODULO';
  payload: {
    x: number;
    y: number;
  };
};

export const addAction = {
  type: 'ADD',
  payload: {
    x: 1,
    y: 2,
  },
};
export const subtractAction = {
  type: 'SUBTRACT',
  payload: {
    x: 1,
    y: 2,
  },
};

export const isAddAction = (action: Action) => action.type === 'ADD';
export const isSubtractAction = (action: Action) => action.type === 'SUBTRACT';
export const isMultiplyAction = (action: Action) => action.type === 'MULTIPLY';
export const isDivideAction = (action: Action) => action.type === 'DIVIDE';
export const isModuloAction = (action: Action) => action.type === 'MODULO';

export const mathReducer = (
  state: number,
  action: { type: string; payload: { x: number; y: number } },
) => {
  switch (action.type) {
    case 'ADD':
      return action.payload.x + action.payload.y;
    case 'SUBTRACT':
      return action.payload.x - action.payload.y;
    case 'MULTIPLY':
      return action.payload.x * action.payload.y;
    case 'DIVIDE':
      return action.payload.x / action.payload.y;
    case 'MODULO':
      return action.payload.x % action.payload.y;
    default:
      return state;
  }
};

export { add, subtract, multiply, divide, modulo };
