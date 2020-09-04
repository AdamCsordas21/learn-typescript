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

// Working with Generic Type Variables
function indentity3<T>(arg: T) {
  // console.log(arg.length) --> Property 'length' does not exist on type 'T'.ts(2339)
  return arg
}

function loggingIndetity<T>(arg: T[]) {
  console.log(arg.length)
  return arg
}

function logginIndentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}

export { }
