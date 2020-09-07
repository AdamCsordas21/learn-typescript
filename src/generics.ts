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

// Generic Constraints
function loggingIndetity2<T>(arg: T): T {
  // console.log(arg.length)
  // Property 'length' does not exist on type 'T'.ts(2339)
  return arg
}

interface Lengthwise {
  length: number
}

function loggingIndentity3<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) // Now we know it has a .length property, so no more error
  return arg
}

// loggingIndentity3(3)
// Argument of type '3' is not assignable to parameter of type 'Lengthwise'.ts(2345)

loggingIndentity3({ length: 10, value: 3 })

// Using Type Parameters in Generic Constrains
function getProperty<T , K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a')
// getProperty(x, 'm')
// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.ts(2345)

// Using Class Types in Generics
function create<T>(c: { new (): T }): T {
  return new c()
}

class BeeKeeper {
  hasMask: boolean
}

class ZooKeeper {
  nametag: string
}

class Animal {
  numLegs: number
}

class Bee extends Animal {
  keeper: BeeKeeper
}

class Lion extends Animal {
  keeper: ZooKeeper
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask

export { }
