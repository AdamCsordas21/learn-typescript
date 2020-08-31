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