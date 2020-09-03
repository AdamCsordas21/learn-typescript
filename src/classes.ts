// Classes
class Greeter {
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return `Hello, ${this.greeting}`
  }
}

let greeter = new Greeter('world')

// Inheritance
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)
dog.bark()

class Animal2 {
  name: string
  constructor(theName: string) {
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

class Snake extends Animal2 {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal2 {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
  }
}

let sam = new Snake('Sammy the Python')
let tom: Animal = new Horse('Tommy the Palomino')

sam.move()
tom.move(34)

// Public, Private, and Protected Modifiers
// Public by Default
class Animal3 {
  public name: string

  public constructor(theName: string) {
    this.name
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

// ECMAScript Private Fields
class Animal4 {
  #name: string
  constructor(theName: string) {
    this.#name = theName
  }
}

// new Animal4('Cat').#name
// Property '#name' is not accessible outside
// class 'Animal' because it has a private identifier.

// Understanding TypeScript's Private
class Animal5 {
  private name: string
  
  constructor(theName: string) {
    this.name = theName
  }
}

// new Animal5('Popek').name
// Property 'name' is private and only accessible within class 'Animal5'.ts(2341)

class Animal6 {
  private name: string
  constructor(theName: string) {
    this.name = theName
  }
}

class Rhino extends Animal6 {
  constructor() {
    super('Rhino')
  }
}

class Employee {
  private name: string
  constructor(theName: string) {
    this.name = theName
  }
}

let animal = new Animal6('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')

animal = rhino
// animal = employee
// Type 'Employee' is not assignable to type 'Animal6'.
// Types have separate declarations of a private property 'name'.

// Understanding Protected
class Person {
  protected name: string
  constructor(name: string) {
    this.name = name
  }
}

class Employee2 extends Person {
  private deparment: string

  constructor(name: string, department: string) {
    super(name)
    this.deparment = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.deparment}.`
  }
}

let howard = new Employee2('Howard', 'Sales')
console.log(howard.getElevatorPitch)
// console.log(howard.name)
// Property 'name' is protected and only accessible within class 'Person'
// and its subclasses.ts(2445)

class Person2 {
  protected name: string
  protected constructor(theName: string) {
    this.name
  }
}

// Employee can extend Person
class Employee3 extends Person {
  private deparment: string

  constructor(name: string, department: string) {
    super(name)
    this.deparment = department
  }

  public getElavatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.deparment}.`
  }
}

let james = new Employee3('James', 'Sales')
let john = new Person('John')
// Constructor of class 'Person' is protectec and only accessable within the
// class declaration.

// Readonly Modifier
class Octopus {
  readonly name: string
  readonly numberOfLegs: number = 8

  constructor(theName: string) {
    this.name = theName
  }
}

let dad = new Octopus('Man with the 8 strong legs')
// dad.name = 'Man with the 3-piece suit'
// Cannot assign to 'name' because it is read-only property

// Parameter Properties
class Octopus2 {
  readonly numberOfLegs: number = 8
  constructor(readonly name: string) { }
}

let dad2 = new Octopus('Man with the 8 strong legs')
dad2.name

// Accessors
class Player {
  fullName: string
}

let player = new Player()
player.fullName = 'Bob Smith'

if (player.fullName) {
  console.log(player.fullName)
}

class Player2 {
  private static fullNameMaxLength = 10
  private _fullName: string

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (newName && newName.length > Player2.fullNameMaxLength) {
      throw new Error('fullName has a max length of ' + Player2.fullNameMaxLength)
    }

    this._fullName = newName
  }
}

let player2 = new Player()
player.fullName = 'Adam Csordas'

if (player.fullName) {
  console.log(player.fullName)
}

// Static Properties
class Grid {
  static origin = { x: 0, y: 0 }

  calculateDistanceFromOrigin(point: { x: number, y: number }) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }

  constructor(public scale: number) { }
}

let grid1 = new Grid(1.0) // 1x scale
let grid2 = new Grid(5.0) // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }))
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }))

// Abstract Classes
abstract class Animal7 {
  abstract makeSound(): void

  move(): void {
    console.log('roaming the earth...')
  }
}

abstract class Department {
  constructor(public name: string) { }

  printName(): void {
    console.log(`Department name: ${this.name}`)
  }

  abstract printMeeting(): void  // must be implemented in derived classes
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing') // constructor in derived classes must call super()
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department // ok to create a referencet of an abstract type
// deparment = new Deparment() --> error: cannot create an instance of an abstract class
department = new AccountingDepartment() // ok to create and assign a non-abstract subclass
department.printName()
department.printMeeting()
// department.generateReports() --> Property 'generateReports' does not exist on the type 'Department'

// Advanced Techniques
// Constructor Functions
class Greeter2 {
  static standardGreeting = 'Hello, there'
  greeting: string
  greet() {
    if (this.greeting) {
      return `Hello, ${this.greeting}`
    } else {
      return Greeter2.standardGreeting
    }
  }
}

let greeter3: Greeter2
greeter3 = new Greeter2()
console.log(greeter3.greet()) // 'Hello, there'

let greeterMaker: typeof Greeter2 = Greeter2
greeterMaker.standardGreeting = 'Hey there!'

let greeter4: Greeter2 = new greeterMaker()
console.log(greeter4.greet) // Hey there!

// Using a Class as an Interface
class Point {
  x: number
  y: number
}

interface Pointed extends Point {
  z: number
}

let pointed: Pointed = { x: 1, y: 2, z:3 }

export { }
