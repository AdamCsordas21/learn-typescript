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

export { }