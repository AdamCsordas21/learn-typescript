// Generics
// Hello World of Generics
function identity(arg: number): number {
  return arg
}

function identity2(arg: any): any {
  return arg
}

function indentity<T>(arg: T): T {
  return arg
}

let output = indentity<string>('myString')
//       ^ = let output: string

let output2 = indentity('myString')
//         = let output: string

export { }
