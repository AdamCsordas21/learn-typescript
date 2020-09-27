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
  method() {}
}
// Which would print this output to the console:
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called

export {}