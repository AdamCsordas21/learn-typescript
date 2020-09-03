// It's a tool that let you compose or combine exosting types instead of creating them from scratch

// Union Types
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft('Hello world', 4) // returns '    Hello world'

// passes at compile time, fails at runtime
let indentedString = padLeft('Hello world', true)

function padLeft2(value: string, padding: string | number) {
  // ...
}

// Unions With Common Fields
interface Bird {
  fly(): void
  layEggs(): void
}

interface Fish {
  swim(): void
  layEggs(): void
}

declare function getSmallPet(): Fish | Bird

let pet = getSmallPet()
pet.layEggs()

export { }