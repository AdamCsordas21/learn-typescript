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

let myAdd3: (baseValeu: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y
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
  return firstName + ' '+ restOfName.join(' ')
}

let employeeName = buildName5('Mr', 'Adam', 'Csordas')

function buildName6(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ')
}

let buildNameFun: (fname: string, ...rest:string[]) => string

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

function f(this: void) {}

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