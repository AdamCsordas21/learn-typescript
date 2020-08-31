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