// Generics
// Hello World of Generics
function identity1(arg: number): number {
  return arg
}

function identity2(arg: any): any {
  return arg
}

function identity3<T>(arg: T): T {
  return arg
}

let output = identity3<string>('myString')
//       ^ = let output: string

let output2 = identity3('myString')
//         = let output2: string

let output3 = identity3(234)
//         = let output3: number

// Working with Generic Type Variables
function identity4<T>(arg: T) {
  // console.log(arg.length) --> Property 'length' does not exist on type 'T'.ts(2339)
  return arg
}

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length) // Array has a .length, so no more error
  return arg
}

// Generic Types
function identity5<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity5

let myIdentity2: <U>(arg: U) => U = identity5

let myIdentity3: { <T>(arg: T): T } = identity5

interface GenericIdentityFn {
  <T>(arg: T): T
}

let myIdentity4: GenericIdentityFn = identity5

interface GenericIdentityFn2<T> {
  (arg: T): T
}

let myIdentity5: GenericIdentityFn2<number> = identity5
let myIdentity6: GenericIdentityFn2<number> = identity1

// Generic Classes
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T

  // The above is evil, because it allows you to get a null pointer exception
  // to mitigate, either make the props optional

  // zeroValue?: T
  // add?: (x: T, y: T) => T

  // or (better) add a constructor that will require the initial values

  // constructor(zeroValue: T, add: (x: T, y: T) => T) {
  //   this.zeroValue = zeroValue
  //   this.add = add
  // }
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
let stringNumber = new GenericNumber2<string>()
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

loggingIndentity3('sdfgs')
loggingIndentity3([1, 2])
loggingIndentity3({ length: 10, value: 3 })
// loggingIndentity3(3)
// Argument of type '3' is not assignable to parameter of type 'Lengthwise'.ts(2345)


// Using Type Parameters in Generic Constrains
function getProperty<T, K extends keyof T>(obj: T, key: K) {
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

new Lion().keeper.nametag
createInstance(Lion).keeper.nametag
new Bee().keeper.hasMask
createInstance(Bee).keeper.hasMask

export { }
