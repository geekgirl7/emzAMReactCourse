console.log('utils.js is running');

// exports:
// every file has to choose *what* (and how) to export
//  * this is the "second half" of import/export
// every file c/have ONE *default* export
// every file c/have as many *named* exports as you like

const square = (x) => x * x;
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

// named exports
// NOTE: for this, curly braces are NOT an object definition!
export { square, add, subtract as default }; // c/have ONLY 1 default
