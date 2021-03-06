// Numeric Enums
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

enum Direction2 {
  Up,
  Down,
  Left,
  Right
}

enum UserResponse {
  No,
  Yes
}

function respond(recipient: string, message: UserResponse): void { }

respond('Princess Nela', UserResponse.Yes)

declare function getSomeValue(): number
enum E {
  A,
  B = getSomeValue(),
  // C, Enum member must have initializer.ts(1061)
  D = 33,
  E
}

// String Enums
enum KeyboardControl {
  Up = 'W',
  Down = 'S',
  Left = 'A',
  Right = 'D',
  Jump = 'Space',
}

// Heterogeneous Enums
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'Y'
}

// Computed and Constant members
enum F {
  X,
  Y,
  z
}

enum F2 {
  A = 1,
  B,
  C
}

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  WriteReadAndExplode = Write | Read | 1,
  OnePlusTwo = 1 + 2,
  // computed member
  G = "123".length
}

// Union Enums and Enum Member Types
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle
  radius: number
}

interface Square {
  kind: ShapeKind.Square
  sideLength: number
}

let c: Circle = {
  kind: ShapeKind.Circle,
  // kind: ShapeKind.Square,
  // Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.ts(2322)
  radius: 100
}

enum G {
  Foo,
  Bar
}
/* 
function f(x: G) {
  if (x !== G.Foo || x !== G.Bar) {
    // This condition will always return 'true' since the types 'G.Foo' and 'G.Bar' have no overlap.
  }
}

function f2(x: boolean) {
  if (x !== true || x !== false) {
    // This condition will always return 'true' since the types 'true' and 'false' have no overlap.
  }
}
*/
function f3(x: boolean) {
  if (x !== true && x !== false) {
    // This condition will always return 'false' since the types 'true' and 'false' have no overlap.
  }
}

function f4(x: G) {
  if (x !== G.Foo && x !== G.Bar) {
    // This condition will always return 'false' since the types 'true' and 'false' have no overlap.
  }
}

// Enums at Runtime
enum H {
  X,
  Y,
  Z
}

function f5(obj: { X: number }) {
  return obj.X
}

f5(H)

// Enums at Compile Time
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}
/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel

function printImportant(key: LogLevelStrings, message: string) {
  // function printImportant(key: LogLevel, message: string) {
  const num = LogLevel[key]
  if (num <= LogLevel.WARN) {
    console.log('Log level key is:', key)
    console.log('Log level value is:', num)
    console.log('Log level message is:', message)
  }
}

printImportant('ERROR', 'This is a message')
// printImportant(LogLevel.ERROR, 'This is a message')
// Argument of type 'LogLevel.ERROR' is not assignable to parameter of type '"ERROR" | "WARN" | "INFO" | "DEBUG"'.ts(2345)

// Reverse Mappings
enum Map {
  A
}

let a = Map.A // 0
let nameOfA = Map[a] // 'A'

enum String {
  abc = 'definitely not ABC'
}

// const Enums
const enum Mune {
  a = 1,
  b = a * 10,
  // c = 'c'.length
  // const enum member initializers can only contain literal values and other computed enum values.ts(2474)
}

const munes = [Mune.a, Mune.b]

// Ambient Enums
declare enum Adam {
  a = 1,
  b,
  c = 2
}
const adams = [Adam.a, Adam.b, Adam.c]

export { }
