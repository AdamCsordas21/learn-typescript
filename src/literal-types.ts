// Literal Narrowing

// TypeScript sets the type to be 'Hello World' not string
const helloWorld = 'Hello World!'

// On the other hand, a let can change, and so the compiler declares it a string
let hiWorld = 'Hi World'

// String Literal Types
type DayOfWeek = 
  | 'Monday' 
  | 'Tueday' 
  | 'Wednesday' 
  | 'Thursday' 
  | 'Friday' 
  | 'Saturday' 
  | 'Sunday'

let today: DayOfWeek = 'Sunday'

// const tomorrow: DayOfWeek = 'tuesday'
// Type '"tuesday"' is not assignable to type 'DayOfWeek'.ts(2322)

type WeekendDay = 'Saturday' | 'Sunday'
const restDay: WeekendDay = 'Saturday'
const restDay2: WeekendDay = today

// change the value
today = 'Monday'
// const restDay3: WeekendDay = today
// Type '"Monday"' is not assignable to type 'WeekendDay'.ts(2322)

// String literal types can be used in the same way to distinguish overloads:
class Element { }
class HTMLImageElement extends Element { }
class HTMLInputElement extends Element { }

function createElement(tagName: 'img'): HTMLImageElement
function createElement(tagName: 'input'): HTMLInputElement
function createElement(tagName: string): Element {
  if (tagName === 'img') return new HTMLImageElement()
  if (tagName === 'input') return new HTMLInputElement()
  return new Element()
}

// Numeric Literal Types
type DiceRollResult = 1 | 2 | 3 | 4 | 5 | 6

function rollDice(): DiceRollResult {
  return (Math.floor(Math.random() * 6) + 1) as DiceRollResult
}

const result = rollDice()

interface MapConfig {
  lng: number
  lat: number
  tileSize: 8 | 16 | 32
}
declare function setupMap(x: MapConfig): void

setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 8 });

// Boolean Literal Types
interface ValidationSuccess {
  isValid: true
  reason: undefined
}

interface ValidationFailure {
  isValid: false
  reason: string
}

type ValidationResult = ValidationSuccess | ValidationFailure

type ValidationResultBad = {
  isValid: boolean
  reason?: string
}
// this type is not good, because in theory we can end up with an invalid state, like
// { isValid: false, reason: undefined }
// { isValid: true, reason: 'osh was here' }

declare function validate(): ValidationResult

const validationResult = validate()
if (!validationResult.isValid) {
  console.log('error: ' + validationResult.reason)
} else {
  console.log('all good')
}

export { }
