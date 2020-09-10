// Advanced Types
// Type Guards and Differentiating Types
type Fish = { swim: () => void }
type Bird = { fly: () => void }
declare function getSmallPet(): Fish | Bird

let pet = getSmallPet ()

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
let fishPet = pet as Fish
let birdPet = pet as Bird

if (fishPet.swim) {
  fishPet.swim()
} else if (birdPet.fly) {
  birdPet.fly()
}
// This is not the sort of code you would want in your codebase however.


export {}
