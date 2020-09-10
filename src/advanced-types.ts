// Advanced Types
// Type Guards and Differentiating Types
type Fish = { swim: () => void }
type Bird = { fly: () => void }
declare function getSmallPet(): Fish | Bird

let pet = getSmallPet()

// You can use the 'in' operator to check
if ('swim' in pet) {
  pet.swim
}

// However you cannot use property access
// if (pet.fly) {
//   pet.fly
// }
// Property 'fly' does not exist on type 'Fish | Bird'.
//   Property 'fly' does not exist on type 'Fish'.ts(2339)

// Property accessors
let pet2 = getSmallPet()
let fishPet = pet2 as Fish
let birdPet = pet2 as Bird

if (fishPet.swim) {
  fishPet.swim()
} else if (birdPet.fly) {
  birdPet.fly()
}
// This is not the sort of code you would want in your codebase however.

// User-Defined Type Guards
// Using type predicates
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

let pet3 = getSmallPet()

// Both calls to 'swim' and 'fly' are now ok.
if (isFish(pet3)) {
  pet3.swim()
} else {
  pet3.fly
}

// Notice that TypeScript not only knows that pet is a fish in the if branch,
// It also knows that in the else branch, you don't have a Fish, so you must have a bird

// Using the in Operator
function move(pet4: Fish | Bird) {
  if ('swim' in pet4) {
    return pet4.swim()
  }
  return pet4.fly
}

// typeof Type Guards
function isNumber(x: any): x is number {
  return typeof x === 'number'
}

function isString(x: any): x is string {
  return typeof x === 'string'
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value
  }
  if (isString(padding)) {
    return padding + value
  }
  throw new Error(`Expected string or number, got ${padding}`)
}

function padLeft2(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got ${padding}`)
}

// instanceof Type Guards
interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join('')
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
  ? new SpaceRepeatingPadder(4)
  : new StringPadder('  ')
}

let padder: Padder = getRandomPadder()
//        ^ = let padder: Padder

if (padder instanceof SpaceRepeatingPadder) {
  padder
//      ^ = Could not get LSP result: er;>
}
if (padder instanceof StringPadder) {
  padder
//      ^ = Could not get LSP result: er;>
}

// Nullable Types
let exampleString = 'foo'
// exampleString = null
// Type 'null' is not assignable to type 'string'.ts(2322)

let stringOrNull: string | null = 'bar'
stringOrNull = null

// stringOrNull = undefined
// Type 'undefined' is not assignable to type 'string | null'.ts(2322

// Note that TypeScript treats null and undefined differently in order to match JavaScript semantics.
// string | null is a different type than string | undefined and string | undefined | null.

// Optional Parameters and Properties
function f(x: number, y?: number) {
  return x + (y ?? 0)
}

f(1, 2)
f(1)
f(1, undefined)
// f(1, null)
// Argument of type 'null' is not assignable to parameter of type 'number | undefined'.ts(2345)

class C {
  a: number
  b?: number
}

let c = new C()

c.a = 12
// c.a = undefined
// Type 'undefined' is not assignable to type 'number'.ts(2322)

c.b = 13
c.b = undefined
// c.b = null
// Type 'null' is not assignable to type 'number | undefined'.ts(2322)

export { }
