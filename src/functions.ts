function add2(x: number, y: number): number {
  return x + y
}

let myAdd = function (x: number, y: number): number {
  return x + y
}

let myAdd2: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y
}

let myAdd3: (baseValue: number, increment: number) => number = function (
  osh: number,
  adam: number
): number {
  return osh + adam
}

// The parameters 'x' and 'y' have the type number
let myAdd4 = function (x: number, y: number): number {
  return x + y
}

// myAdd5 has the full function type
let myAdd5: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y
}

function buildName(firstName: string, lastName: string) {
  return firstName + ' ' + lastName
}

// let result1 = buildName('Adam') --> An argument for 'lastName' was not provided.
// let result2 = buildName('Adam', 'Csordas', 'Mr') --> Expected 2 arguments, but got 3.
let result3 = buildName('Adam', 'Csordas')

function buildName2(firstName: string, lastName?: string) {
  if (lastName) return firstName + ' ' + lastName
  else return firstName
}

let result1 = buildName2('Adam')
// let result2 = buildName('Adam', 'Csordas', 'Mr') --> Expected 2 arguments, but got 3.
let result4 = buildName2('Adam', 'Csordas')

function buildName3(firstName: string, lastName = 'Csordas') {
  return firstName + ' ' + lastName
}

let result5 = buildName3('Adam')
let result6 = buildName3('Adam', undefined)
// let result7 = buildName2('Adam', 'Csordas', 'Mr') --> Expected 2 arguments, but got 3.
let result7 = buildName3('Adam', 'Csordas')

function buildName4(firstName = 'Adam', lastName: string) {
  return firstName + ' ' + lastName
}

// let result8 = buildName('Adam') --> An argument for lastName was not provided.
// let result9 = buildName4('Adam', 'Csordas', 'Mr') --> Expected 2 arguments, but got 3.
let result10 = buildName4('Adam', 'Csordas')
let result11 = buildName4(undefined, 'Csordas')

function buildName5(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ')
}

let employeeName = buildName5('Mr', 'Adam', 'Csordas')

function buildName6(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ')
}

employeeName = buildName6('Mr', 'Adam', 'Csordas')

let buildNameFunc: (fname: string, ...rest: string[]) => string

let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function () {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit)

function f(this: void) { }

interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(this: Deck): () => Card
}

let deck2: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit2 = Math.floor(pickedCard / 13)

      return { suit: this.suits[pickedSuit2], card: pickedCard % 13 }
    }
  }
}

let cardPicker2 = deck.createCardPicker()
let pickedCard2 = cardPicker()

alert('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)

// this parameters in callbacks
interface MyEvent {
  message: string
}

interface UIElement {
  addClickListener(onClick: (this: void, e: MyEvent) => void): void
}
declare const uiElement: UIElement

class Handler {
  info: string
  onClickBad(this: Handler, e: MyEvent) {
    this.info = e.message
  }
}

let h = new Handler()
// uiElement.addClickListener(h.onClickBad)
// Argument of type '(this: Handler, e: MyEvent) => void' is not assignable to parameter of type '(this: void, e: Event) => void'.
//   The 'this' types of each signature are incompatible.
//     Type 'void' is not assignable to type 'Handler'.ts(2345)

class GoodHandler {
  info: string
  onClickGood(this: void, e: MyEvent) {
    console.log(e.message)
    // this.info = e.message
    // Property 'info' does not exist on type 'void'.ts(2339)
  }
}

let h2 = new GoodHandler()
uiElement.addClickListener(h2.onClickGood)

class BestHandler {
  info: string
  onClickBest = (e: MyEvent) => {
    this.info = e.message
  }
}

let h3 = new BestHandler()
uiElement.addClickListener(h3.onClickBest)

// Overloads
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickedCard3(x: { suit: string, card: number }[]): number
function pickedCard3(x: number): { suit: string, card: number }
function pickedCard3(x: any): any {
  if (typeof x == 'object') {
    let pickedCard4 = Math.floor(Math.random() * x.length)
    return pickedCard4
  }
  else if (typeof x == 'number') {
    let pickedSuit3 = Math.floor(x / 13)
    return { suit: suits[pickedSuit3], card: x % 13 }
  }
}

let myDeck2 = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]

let pickedCard4 = myDeck2[pickedCard3(myDeck2)]
alert('card: ' + pickedCard4 + ' of ' + pickedCard4.suit)

let pickedCard5 = pickedCard3(15)
alert('card: ' + pickedCard5.card + ' of ' + pickedCard5.suit)

// we want to create universal addition
type NumbersAdder = (x: number, y: number) => number
type StringAdder = (x: string, y: string) => string
type ArrayAdder = (x: any[], y: any[]) => any[]
type ObjectAdder = (x: object, y: object) => object


function add3(x: number, y: number): number
function add3(x: string, y: string): string
function add3(x: any[], y: any[]): any[]
function add3(x: object, y: object): object
function add3(x: any, y: any): any {
  if (typeof x !== typeof y) {
    throw new Error('x and y must be of the same type')
  }
  if (typeof x === 'number') {
    return x + y
  }
  if (typeof x === 'string') {
    return x + ' ' + y
  }
  if (Array.isArray(x)) {
    return [...x, ...y]
  }
  if (typeof x === 'object') {
    return { ...x, ...y }
  }
  throw new Error('Unsupported type')
}

const numbers: number = add3(1, 2)
const strings: string = add3("1", "2")
const arrays: any[] = add3(["1"], [2])
const objects: object = add3({ "1": 1 }, { "2": "2" })

// add3(true, false)
// No overload matches this call.
//   The last overload gave the following error.
//     Argument of type 'true' is not assignable to parameter of type 'object'.ts(2769)
// functions.ts(214, 10): The last overload is declared here.
