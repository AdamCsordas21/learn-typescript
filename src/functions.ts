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
  x: number
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