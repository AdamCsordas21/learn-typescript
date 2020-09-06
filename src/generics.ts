// Generics
// Hello World of Generics
function identity(arg: number): number {
  return arg
}

function identity2(arg: any): any {
  return arg
}

function indentity<T>(arg: T): T {
  return arg
}

let output = indentity<string>('myString')
//       ^ = let output: string

let output2 = indentity('myString')
//         = let output: string

// Working with Generic Type Variables
function indentity3<T>(arg: T) {
  // console.log(arg.length) --> Property 'length' does not exist on type 'T'.ts(2339)
  return arg
}

function loggingIndetity<T>(arg: T[]) {
  console.log(arg.length)
  return arg
}

function logginIndentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length) // Array has a .length, so no more error
  return arg
}

// Generic Types


// Generic Classes
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}

// @strict: false
class GenericNumber2<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

// ---cut---
let stringNumber = new GenericNumber<string>()
stringNumber.zeroValue = ''
stringNumber.add = function(x, y) {
  return x + y
}

console.log(stringNumber.add(stringNumber.zeroValue, 'test'))

export { }
