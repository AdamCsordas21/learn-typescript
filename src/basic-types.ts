let isDone: boolean = false
let decimal: number = 6
let octal: number = 0o744
// let bigInt: bigint = 100n // requires target ES2020

let colour: string = "blue"
colour = "red"

const name1: string = 'osh'
const age1: number = 37
const sentence: string = `Hello, my name is ${name1} and I'm ${age1} y/o`

let list: number[] = [1, 2, 3]
let list1: Array<number> = [5, 6, 7]
let favThings: (number | string)[] = [1, 2, 3, 'pizza']
let favThings1: Array<number | string> = [1, 2, 3, 'pizza']

let point1: [number, number] = [23, 73] // tuple means always the same amount of elements and each matching the declared type
point1 = [2, 5]
let nameAge: [string, number] = ['osh', 23]
type NameAgeTuple = [string, number]
let nameAge1: NameAgeTuple = ['adam', 22]

// Right before enumuration declaration
enum Colour {
  Red,
  Green,
  Blue
}
// before new variable of the Colour enum type
let c: Colour = Colour.Red

enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

enum ErrorMessage {
  NotFound = 'The requested resource was not found',
  NoAccess = 'You do not have permissions to access the requested resource',
  GenericError = 'Big bada boom'
}
const pageError: ErrorMessage = ErrorMessage.NoAccess

declare const maybe: unknown // this is provided by something, but we don't know the value (yet!)

// 'maybe' could be a string, object, boolean, undefined, or other types
// const aNumber: number = maybe;
// Type 'unknown' is not assignable to type 'number'.

if (maybe === true) {
  // if you reach inside of this IF, then you know that the value of `maybe` is `true`
  // if the value of `maybe` is `true`, then you also know that the type of `maybe` is `boolean`

  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  // const aString: string = maybe;
  // Type 'boolean' is not assignable to type 'string'.
}

if (typeof maybe === "string") {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  // const aBoolean: boolean = maybe;
  // Type 'string' is not assignable to type 'boolean'.
}

declare function getValue(key: string): any;
// OK, return value of 'getValue' is not checked
const str: string = getValue("myString");

function add(n1: number, n2: number): void {
  console.log('the sum is: ', n1 + n2)
}

let someValue: unknown = 'a string'
let strLength: number = (someValue as string).length
const strValue: string = someValue as string
let strLength2: number = strValue.length

const otherAssertion: string = <string>someValue

export {}