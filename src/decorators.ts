// Decorators are a stage 2 proposal for JavaScript and are available as an experimental feature of TypeScript.
// To enable experimental support for decorators, you must anable the expermentalDecorators compiler option on the
// command line or in your tsconfig.json: tsc --target ES5 --experimentalDecorators

// tsconfig.json:
// {
//   "compilerOptions": {
//     "target": "ES5",
//     "experimentalDecorators: true
//   }
// }

// Decorators

// A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property,
// or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called
// at runtime with information about the decorated declaration.

// For example, given the decorator @sealed we might write the sealed function as follows:
function sealed(target) {
  // do someting with 'target' ...
}

// Decorator Factories

// If we want to customise how a decorator is applied to a declaration, ew can write a decorator factory. A Decorator
// Factory is simply a function that return the expression that will be called by the decorator at runtime.

// We can write a decorator factory in the following fashion:
function colour(value: string) {
  // this is the decorator factory
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  }
}

// Decorator Composition
// Multiple decorators can be applied to a declaration, as in the following examples:

// On a single line:
// @f @g x

// On multiple lines:
// @f
// @g
// x

// When multiple decorators apply to a single declaration, their evaluation is similar to function composition in
// mathematics. In this model, when composing functions f and g, the resultin composite (f ∘ g)(x) is equivalent to
// f(g(x)).

// As such, the following steps are performed when evaluating multiple decorators on a single declaration
// in TypeScript:
// 1. The expression for each decorator are evaluated top-to-bottom.
// 2. The results are then called as function from bottom-to-top.

// If we were to use decorator factories, we can observe this evaluation order with the following example:
function f() {
  console.log('f(): evaluated')
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('f(): called')
  }
}

function g() {
  console.log('g(): evaluated')
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('g(): called')
  }
}

class C {
  @f()
  @g()
  method() { }
}
// Which would print this output to the console:
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called

// Decorator Evaluation
// This is a well defined order to how decorators applied to various declarations inside of a class are applied:
// 1. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
// 2. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
// 3. Parameter Decorators are applied for the constructor.
// 4. Class Decorators are applied for the class.

// Class Decorators
// A class decorator is declared just before a class declaration. The class decorator is applied to the constructor
// of the class and can be used to observe, modify, or replace a class definition. A class decorator cannot be used in
// a declaration file, or in any other ambient context (such as on a declare class).

// The expression for the class decorator will be called as a function at runtime, with the constructor of the
// decorated class as its only argument.

// If the class decoration return a value, it will replacethe class declaration with the provided constructor function.

// NOTE Should you choose to return a new cinstructor function, you must take care to maintain the original prototype.
// The logic that applies decorators at runtime will NOT do this for you.

// The following is an example of a class decorator (@sealed) applied to the Greeter class:
@sealed
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

// We can define the @sealed decorator using the following function declaration:
function sealed2(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

// When @sealed is executed, it will seal both the constructor and its prototype.

// Next we have an example of how to override the constructor.
function classDecorator<T extends { new(...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = 'new property'
    hello = 'override'
  }
}

@classDecorator
class Greeter2 {
  property = 'property'
  hello: string
  constructor(m: string) {
    this.hello = m
  }
}

console.log(new Greeter2('world'))

// Method Decorators
// A Method Decorator is declared just before a method declaration. The decoratore is applied to the
// Property Descriptor for the method, and can be used to observe, modify, or replace a method definition. A method
// decorator cannot be used in a declaration file, on an overload, or in any other ambient context (such as in a
// declare class).

// The expression for the method decorator will be called as a function at runtime, with the following three
// arguments:
// 1. Either the constructor function of the class for a static member, or the prototype of the class for an instance
// member.
// 2. The name of the member.
// 3. The Property Descriptor for the member.

// NOTE The return value is ignored if your script target is less than ES5.

// The following is an example of a method decorator (@anumerable) applied to a method on the Greeter class:
class Greeter3 {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting
  }
}

// We can define @enumerable decorator using the following function declaration:
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value
  }
}

// The @enumerable(false) decorator here is a decorator factory. When the @enumerable(false) decorator is called,
// it modifies the enumerable property of the property descriptor.

// Accessor Decorators
// An Accessor Decorator is declared just before an accessor declaration. The accessor decorator is applied to the
// Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor's definitions.
// An accessor decorator cannot be used in a declaration file, or in any other ambient context (such as in a declare
// class).

// Note - TypeScript disallows decorating both the get and set accessor for a single member. Instead, all decorators
// for the member must be applied to the first accessor specified in document order. This is because decorators apply,
// toa Property Descriptor, which combines both the get and set accessor, not each declaration separately.

// The expression for the accessor decorator will be called as a function at runtime, with the following three
// arguments:
// 1. Either the constructor function of the class for a static member, or the prototype of the class for an instance
// member.
// 2. The name if the member.
// 3. The Property Descriptor for the member.

// Note - The Property Descriptor will be undefined if your script target is less than ES5.

// If the accessor decorator returns a value, it will be used as the Property Descriptor for the member.
// Note - The return value is ognored if your script target is less than ES5.

// The following is an example of an accessor decorator (@configurable) applied to a member of the Point class:
class Point {
  private _x: number
  private _y: number
  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  @configurable(false)
  get x() {
    return this._x
  }

  @configurable(false)
  get y() {
    return this._y
  }
}

function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value
  }
}

// Property Decorators
// A Property Decorator is declared just before a property declaration. A property decorator cannot be used in a 
// declaration file, or in any other ambient context (such as in a declare class).

// The expression for the property decorator will be called as a function at runtime, with the following two
// arguments:
// 1. Either the constructor function of the class for a static member, or the prototype of the class for an instance
// member.
// 2. The name of the member.

// Note - A Property Descriptor is not provided as an argument to a property decorator due to how property decorators
// are initialised in TypeScript. This is because there is currently no mechanism to describe an instance property
// when defining members of a prototype, and no way to observe or modify the initialiser for a property. The return
// value is ignored too. As such, a property decorator can only be used to observe that a property of a specific name
// has been declared for a class.

// We can use this information to record metadata about the property, as in the following example:
// class Greeter4 {
//   @format('Hello, %s')
//   greeting: string
  
//   constructor(message: string) {
//     this.greeting = message
//   }
//   greet() {
//     let formatString = getFormat(this, 'greeting')
//     return formatString.replace('%s', this.greeting)
//   }
// }

// // We can then define the @format decorator and getFormat functions using the folloeing function declarations:
// import 'reflect-metadata'

// const formatMetadataKey = Symbol('format')

// function format(formatString: string) {
//   return Reflect.metadata(formatMetadataKey, formatString)
// }

// function getFormat(target: any, propertyKey: string) {
//   return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
// }

export { }
