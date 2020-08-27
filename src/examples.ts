const helloWorld = 'Hello World'

interface User {
  name: string;
  id: number;
}

const user: User = {
  name: 'Adam',
  id: 21,
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user2: User = new UserAccount('Osh', 28)


function sayHello(user: User): string {
  return `hello, ${user.name}, your id is ${user.id}`
}

function sayHello2({ name, id }: User): string {
  return `hello, ${name}, your id is ${id}`
}

function sayHello3({ name, id }: { name: string; id: number }): string {
  return `hello, ${name}, your id is ${id}`
}

sayHello(user)
sayHello2(user)
sayHello3(user) // duck-typing

type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

const myWindowState = 'minimized'

function describeWindowState(state: WindowStates) {
  console.log(`The state is ${state}`)
}

describeWindowState(myWindowState)

type oshFavThingies = "pizza" | "coke" | "games" | 23;
const todaysFavThing: oshFavThingies = 23

function addNumbers(numbers: number[]) {
  return numbers.reduce((a, c) => a + c)
}

function getLength(array: any[]) {
  return array.length
}

const maybeUndefined = undefined

if (typeof maybeUndefined === "undefined") {
  console.log("It's undefined")
}
if (maybeUndefined === undefined) {
  console.log("It's undefined")
}
if (maybeUndefined) {
  console.log("It's truthy, therefore defined")
}

const myArr = []
// don't do that
// if (typeof myArr === 'array') {
//   console.log("it's array")
// }
if (Array.isArray(myArr)) {
  console.log("it's array")
}

function wrapInArray(obj: string | string[]): string[] {
  if (typeof obj === "string") {
    return [obj];
    //          ^ = (parameter) obj: string
  } else {
    return obj;
  }
}

type MyStringArray = string[]
type MyStringArray2 = Array<string>

type MyNumberArray = number[]
type MyNumberArray2 = Array<number>

type MyObjectArray = { name: string }[]
type MyObjectArray2 = Array<{ name: string }>

type MyUserArray = User[]
type MyUserArray2 = Array<User>

type Taste = 'sweet' | 'bitter'
type DrinkAt = "5 o'clock" | 'any time' | 'morning or afternoon'

interface Glass<DrinkType> {
  add: (obj: DrinkType) => void;
  get: () => DrinkType;
}

interface EnglishBreakfast {
  drinkAt: DrinkAt
  taste: Taste
}

interface Coke {
  drinkAt: 'any time'
  taste: 'sweet'
}

const tea: EnglishBreakfast = {
  drinkAt: "5 o'clock",
  taste: "bitter"
}

const adamsGlass: Glass<EnglishBreakfast> = new class {
  tea: EnglishBreakfast

  add(tea) {
    this.tea = tea
  }

  get() {
    return this.tea
  }
}

const adamsTea: EnglishBreakfast = adamsGlass.get()
adamsTea.drinkAt // "5 o'clock"

const oshsGlass: Glass<Coke> = new class {
  coke: Coke

  add(coke) {
    this.coke = coke
  }

  get() {
    return this.coke
  }
}

const oshsCoke: Coke = oshsGlass.get()
oshsCoke.drinkAt // "any time"

type MyArray<T> = T[]

interface Backpack<T> {
  add: (o: T) => void
  get: () => T
}

declare const backpack: Backpack<string>

const somethingFromBackpack = backpack.get()

backpack.add('yummy string')
// backpack.add(23)
// Argument of type 'number' is not assignable to parameter of type 'string'.


interface Point {
  x: number
  y: number
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`)
}

const point: Point = { x: 12, y: 26 }
printPoint(point)

const iAmNotAPointButIHaveXAndYThatAreNumbers = { x: 12, y: 26 }
printPoint(iAmNotAPointButIHaveXAndYThatAreNumbers)

const iHaveXYZ = { x: 12, y: 26, z: 33 }
printPoint(iHaveXYZ)

// const iHaveNoX = { y: 26, z: 33 }
// printPoint(iHaveNoX)
// Argument of type '{ y: number; z: number; }' is not assignable to parameter of type 'Point'.
//   Property 'x' is missing in type '{ y: number; z: number; }' but required in type 'Point'.ts(2345)

// const iHaveXYButStrings = { x: '12', y: '26' }
// printPoint(iHaveXYButStrings)
// Argument of type '{ x: string; y: string; }' is not assignable to parameter of type 'Point'.
//   Types of property 'x' are incompatible.
//     Type 'string' is not assignable to type 'number'.ts(2345)
