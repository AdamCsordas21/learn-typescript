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

export { }
