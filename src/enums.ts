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

export {}
