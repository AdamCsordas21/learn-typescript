// Our first Interface
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label)
}
let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)


interface LabeledValue {
  label: string
}
function printLabel1(labeledObj: LabeledValue) {
  console.log(labeledObj.label)
}
let myObj1 = { label: 'Size 10 Object', size: 10 }
printLabel(myObj1)

// Optional Properties
interface SquareConfig {
  colour?: string
  width?: number
}

const sc1: SquareConfig = {}
const sc2: SquareConfig = { colour: 'red' }
const sc3: SquareConfig = { width: 12 }
const sc4: SquareConfig = { colour: 'red', width: 12 }
const sc5: SquareConfig = { colour: undefined }
const sc6: SquareConfig = { width: undefined }
const sc7: SquareConfig = { colour: undefined, width: undefined }
const sc8: SquareConfig = { colour: undefined, width: 12 }

function createSquare(config: SquareConfig): { colour: string; area: number } {
  let newSquare = { colour: 'white', area: 100 }
  if (config.colour) {
    newSquare.colour = config.colour
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ colour: 'black' })

// Readonly Properties
interface Point1 {
  readonly x: number;
  readonly y: number;
}

let p1: Point1 = { x: 10, y: 20 }
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

a = ro as number[]

// Excess Property Checks
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any
}

function createSquare2(config: SquareConfig): { color: string; area: number } {
  return { color: config.color || 'red', area: config.width || 20 }
}

let squareOptions = { colour: 'red' }
let mySquare3 = createSquare(squareOptions)

interface SearchFunc {
  (source: string, subString: string): boolean
}

// Function Types
let mySearch: SearchFunc

mySearch = function (source: string, subString: string) {
  let result = source.search(subString)
  return result > -1
}

mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1
}

mySearch = function (src, sub) {
  let result = src.search(sub)
  return result > - 1
}

// Indexable Types
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]

interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
}

interface NumberOrStringDictionary {
  [index: string]: number | string
  length: number
  name: string
}

interface ReadOnlyStringArray {
  readonly [index: number]: string
}

let myArray2: ReadOnlyStringArray = ['Alice', 'Bob']

// Class Types - Implementing An Interface
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface
}

interface ClockInterface {
  tick(): void
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock')
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)

// Extending Interfaces
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = {} as Square
square.color = 'blue'
square.sideLength = 10

interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLenght: number
}

let square2 = {} as Square
square.color = 'blue'
square.sideLenght = 10
square.penWidth = 5.0

// Hybrid Types
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = function (start: number) { } as Counter
  counter.interval = 123
  counter.reset = function () { }
  return counter
}

let d = getCounter()
d(10)
d.reset()
d.interval = 5.0

// InterFaces Extending Classes
class Control {
  private state: any
  protected prot: any
  public pub: any
  pub2: any
  getState() {
    return this.state
  }
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

class ImageControl extends Control implements SelectableControl {
  select() {
    console.log(this.pub)
    console.log(this.pub2)
    console.log(this.prot)
    // console.log(this.state)
    // Property 'state' is private and only accessible within class 'Control'.ts(2341)
   }
}

const imageCtrl = new ImageControl()
console.log(imageCtrl.pub)
console.log(imageCtrl.pub2)
// console.log(imageCtrl.prot)
// Property 'prot' is protected and only accessible within class 'Control' and its subclasses.ts(2445)
// console.log(imageCtrl.state)
// Property 'state' is private and only accessible within class 'Control'.ts(2341)

export {}