// app/Labs/Lab3/Math.ts

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  return a / b;
}

// Default export (as an object)
const MathLib = {
  add,
  subtract,
  multiply,
  divide,
};

export default MathLib;
