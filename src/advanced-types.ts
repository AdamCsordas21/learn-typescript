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
  constructor(private numSpaces: number) { }
  getPaddingString() {
    return Array(this.numSpaces + 1).join('')
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
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

// Type Guards and Type Assertions
function f2(stringOrNull: string | null): string {
  if (stringOrNull === null) {
    return 'defualt'
  } else {
    return stringOrNull
  }
}

function f3(stringOrNull: string | null): string {
  return stringOrNull ?? 'default'
}

function getUser(id: string): UserAccount | undefined {
  return {} as any;
}

interface UserAccount {
  id: number
  email?: string
}

const user = getUser('admin')
// user.id
// Object is possibly 'undefined'.ts(2532)

if (user) {
  // user.email.length
  // Object is possibly 'undefined'.ts(2532)
}

// Instead if you are sure that these objects or fields exist, the
// postfix ! lets you short circuit the nullability
user!.email!.length

// Type Aliases
type Second = number

let timeInSecond: number = 10
let time: Second = 10

type Conatainer<T> = { value: T }

type Tree<T> = {
  value: T
  left?: Tree<T>
  right?: Tree<T>
}

declare function getDriversLicenseQueue(): LinkedList<Person>;

type LinkedList<Type> = Type & { next: LinkedList<Type> }

interface Person {
  name: string
}

let people = getDriversLicenseQueue()
people.name
people.next.name
people.next.next.name
people.next.next.next.name

// Interfaces vs Type Aliases

// Interface
// Extending an interface
declare function getBear(): any

interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear()
bear.name
bear.honey

// Adding new fields to an existing interface


// Type
// Extanding a Type via Intersections
type Animal2 = {
  name: string
}

type Bear2 = Animal2 & {
  honey: Boolean
}

const bear2 = getBear()
bear.name
bear.honey

// A Type cannot be changed after being created

// Enum Member Types
// As mentioned in our section on enums, enum members have types when every member is literal-initialized.
// Much of the time when talk about 'singleton types', we're referring to both enum member types as well as
// numeric/string literal types, though many users will use 'singleton types' and 'literal types' interchangeably.

// Polymorphic this Type
class BasicCalculator {
  public constructor(protected value: number = 0) { }
  public currentValue(): number {
    return this.value
  }
  public add(operand: number): this {
    this.value += operand
    return this
  }
  public multiply(operand: number): this {
    this.value *= operand
    return this
  }
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue()

class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value)
  }
  public sin() {
    this.value = Math.sin(this.value)
    return this
  }
}

let v2 = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue
// Without this type, ScientificCalculator would not have been able to extend BasicCalculator and keep the fluent
// interface. multiply would have returned BasicCalculator, which doens't have the sin method. However, this types,
// multiply return this, which is ScientificCalculator here.

// Index Types
// With JavaScript it would look like this
function pluck(o, propertyNames) {
  return propertyNames.map((n) => o[n])
}

// With TypeScript
function pluck2<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map((n) => o[n])
}

interface Car {
  manufacturer: string
  model: string
  year: number
}

let taxi: Car = {
  manufacturer: 'Toyota',
  model: 'Camry',
  year: 2014,
}
//Manufacturer and model are both of type string, so we can pluck them both into a typed string array.
let makeAndModel: string[] = pluck2(taxi, ['manufacturer', 'model'])

// If we try to pluck model and year, we get an array of a union type: (string | number)[]
let modelYear = pluck2(taxi, ['model', 'year'])

let carProps: keyof Car
//         ^ = let carProps: 'manufacturer' | 'model' | 'year'

// pluck2(taxi, ['year', 'unknown'])
// Type '"unknown"' is not assignable to type '"manufacturer" | "model" | "year"'.ts(2322)

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName] // o[propertyName] is of type T[K]
}

let manufacturer: string = getProperty(taxi, 'manufacturer')
let year: number = getProperty(taxi, 'year')

// let unknown = getProperty(taxi, 'unknown')
// Argument of type '"unknown"' is not assignable to parameter of type '"manufacturer" | "model" | "year"'.ts(2345)

// Index Types and Index Signatures
interface Dictionary<T> {
  [key: string]: T
}
let keys: keyof Dictionary<number>
//      ^ = let keys: string | number

let value: Dictionary<number>['foo']
//       ^ = let value: number

interface Dictionary2<T> {
  [key: number]: T
}

let keys2: keyof Dictionary2<number>
//       ^ = let keys2 = number

let numberValue: Dictionary2<number>[42]
//       ^ = let numberValue: number

// let value2: Dictionary2<number>['foo']
// Property 'foo' does not exist on type 'Dictionary<number>'.

// Mapped Types
interface PersonSubset {
  name?: string
  age?: number
}

interface PersonReadonly {
  readonly name: string
  readonly age: number
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type PersonPartial = Partial<Person>
//   ^ = type PersonPartial = {
//  name?: string | undefined
//  age?: number | undefined
// }

type ReadonlyPerson = Readonly<Person>
//   ^ = type ReadonlyPerson = {
//  readonly name: string
//  readonly age: number
// }

// Use this:
type PartialWithNewMemeber<T> = {
  [P in keyof T]?: T[P]
} & { newMember: boolean }

// This is an error!
type WrongPartialWithNewMember<T> = {
  [P in keyof T]?: T[P]
  // newMember: boolean
  // 'boolean' only refers to a type, but is being used as a value here.ts(2693)
}
// Declaration or statement expected.

type Keys = 'option1' | 'option2'
type Flags = { [K in Keys]: boolean }

type Flags2 = {
  option1: boolean
  option2: boolean
}

type NullablePerson = { [P in keyof Person]: Person[P] | null }
//   ^ = type NullablePerson = {
//  name: string | null
//  age: number | null
// }

type PartialPerson = { [P in keyof Person]?: Person[P] }
//   ^ = type PartialPerson = {
//  name?: string | undefined
//  age?: number | undefined
// }

type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial2<T> = { [P in keyof T]?: T[P] }

type Proxy<T> = {
  get(): T
  set(value: T): void
}

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

function proxify<T>(o: T): Proxify<T> {
  return o[1]
}

let props = { rooms: 4 }
let proxyProps = proxify(props)
//  ^ = let proxyProps: Proxify<{
//  rooms: number
// }>

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Record<K extends keyof any, T> = {
  [P in K]: T
}

type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>

export { }
