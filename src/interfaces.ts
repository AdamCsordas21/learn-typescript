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

interface Point1 {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 }
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

a = ro as number[]

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
  (source: string, subString:string): boolean
}

let mySearch: SearchFunc

mySearch = function (source: string, subString: string) {
  let result = source.search(subString)
  return result > -1
}

let mySearch2: SearchFunc

mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1
}

let mySearch3: SearchFunc

mySearch = function (src, sub) {
  let result = src.search(sub)
  return result > - 1
}

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

let myArray2: ReadOnlyStringArray = ['Alice', 'Bib']