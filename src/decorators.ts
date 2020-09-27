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

export {}