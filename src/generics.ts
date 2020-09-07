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
function identity4<T>(arg: T): T {
  return arg;
}

// let myIdentity: <T>(arg: T) => T = identity;
// Type '(arg: number) => number' is not assignable to type '<T>(arg: T) => T'.
// Types of parameters 'arg' and 'arg' are incompatible.
// Type 'T' is not assignable to type 'number'.ts(2322)

function indentity5<T>(arg: T): T {
  return arg
}

// let myIdentity: <U>(arg: U) => U = identity
// Type '(arg: number) => number' is not assignable to type '<T>(arg: T) => T'.
// Types of parameters 'arg' and 'arg' are incompatible.
// Type 'T' is not assignable to type 'number'.ts(2322)

function indentity6<T>(arg: T): T {
  return arg  
}

let myIdentity: { <T>(arg: T): T } = indentity

interface GenericIdentityFn {
  <T>(arg: T): T
}

function identity7<T>(arg: T): T {
  return arg
}

let myIdentity2: GenericIdentityFn = indentity

interface GenericIdentityFn2<T> {
  (arg: T): T
}

function identity8<T>(arg: T): T {
  return arg
}

let myIdentity3: GenericIdentityFn2<number> = identity

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
