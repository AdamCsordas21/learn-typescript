// Utility Types

// Partial<Type>
// Constructs a type with all properties of Type set to optional. This utility will return a type that represents all
// subsets of a givrn type.

interface Todo {
  title: string
  description: string
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate }
}

const todo1 = {
  title: 'organise desk',
  description: 'clear clutter'
}

const todo2 = updateTodo(todo1, {
  description: 'throw out trash'
})

// Readonly<Type
// Constructs a type all properties of Type set to readonly, meaning the properties of the constructed type cannot be
// reassigned.

interface Todo2 {
  title: string
}

const todo3: Readonly<Todo2> = {
  title: 'Delete inactive users'
}

// todo3.title = 'Hello'
// Cannot assign to 'title' because it is a read-only property.ts(2540)

// This utility is useful for representing assignment expression that will fail at runtime (i.e. when attempting to
// reassign properties of a frozen object).
// Object.freeze
// function freeze<Type>(obj: Type): Readonly<Type>

// Record<Keys,Type>
// Constructs a type with a set of properties Keys of type Type. This utility can be used to mapthe properties of
// a type to another type.
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

const nav: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' }
}

nav.about

// Pick<Type, Keys>
// Constructs a type by picking the set of properties Keys from Type.
interface Todo3 {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo3, 'title' | 'completed'>

const todo4: TodoPreview = {
  title: 'Clean room',
  completed: false
}

todo4

// Omit<Type, Keys>
// Constructs a type by picking all properties from Type and then removing Keys.
interface Todo4 {
  title: string
  description: string
  completed: boolean
}

type TodoPreview2 = Omit<Todo4, 'description'>

const todo5: TodoPreview2 = {
  title: 'Clean room',
  completed: false
}

todo5

// Exclude<Type, ExcludeUnion>
// Constructs a type by excluding from Type all union members that are assignable to ExcludedUnion.
type T0 = Exclude<'a' | 'b' | 'c', 'a'>
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
type T2 = Exclude<string | number | (() => void), Function>

// Extract<Type, Union>
// Constructs a type by extracting from Type all union members that are assignable to Union.
type T3 = Extract<'a' | 'b' | 'c', 'a' | 'f'>
type T4 = Extract<string | number | (() => void), Function>

// NonNullable<Type>
// Constructs a type by excluding null and undefined from Type
type T5 = NonNullable<string | number | undefined>
type T6 = NonNullable<string[] | null | undefined>

// Parameters<Type>
// Constructs a tuple type from the types used in the parameters of a function type Type.
declare function f1(arg: { a: number, b: string }): void

type T7 = Parameters<() => string>
type T8 = Parameters<(s: string) => void>
type T9 = Parameters<<T>(arg: T) => T>
type T10 = Parameters<typeof f1>
type T11 = Parameters<any>
type T12 = Parameters<never>
type T13 = Parameters<never>
// type T14 = Parameters<string>
// Type 'string' does not satisfy the constraint '(...args: any) => any'.ts(2344)

// type T15 = Parameters<Function>
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
// Type 'Function' provides no match for the signature '(...args: any): any'.ts(2344)

// ConstructorParameters<Type>
// Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all
// the parameter types (or the type never if Type is not a function).
type T14 = ConstructorParameters<ErrorConstructor>
type T15 = ConstructorParameters<FunctionConstructor>
type T16 = ConstructorParameters<RegExpConstructor>
type T17 = ConstructorParameters<any>
// type T18 = ConstructorParameters<Function>
// Type 'Function' does not satisfy the constraint 'new (...args: any) => any'.
// Type 'Function' provides no match for the signature 'new (...args: any): any'.ts(2344)

// ReturnType<Type>
// Constructs a type consisting of the return type of function Type.

declare function f2(): { a: number, b: string }

type T18 = ReturnType<() => string>
type T19 = ReturnType<(s: string) => void>
type T20 = ReturnType<<T>() => T>
type T21 = ReturnType<<T extends UIEvent, U extends number[]>() => T>
type T22 = ReturnType<typeof f2>
type T23 = ReturnType<any>
type T24 = ReturnType<never>
// type T25 = ReturnType<string>
// Type 'string' does not satisfy the constraint '(...args: any) => any'.ts(2344)

// type T26 = ReturnType<Function>
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
// Type 'Function' provides no match for the signature '(...args: any): any'.ts(2344)

// InstanceType<Type>
// Constructs a type consisting of the instance type of a constructor function in Type.
class C {
  x = 0
  y = 0
}

type T27 = InstanceType<typeof C>
type T28 = InstanceType<any>
type T29 = InstanceType<never>
// type T30 = InstanceType<string>
// Type 'string' does not satisfy the constraint 'new (...args: any) => any'.ts(2344)

// type T31 = InstanceType<Function>
// Type 'Function' does not satisfy the constraint 'new (...args: any) => any'.
// Type 'Function' provides no match for the signature 'new (...args: any): any'.ts(2344)

// Required<Type>
// Constructs a type consisting of all properties of T set to required. The opposite of Partial.
interface Props {
  a?: number
  b?: string
}

const obj: Props = { a: 5 }

// const obj2: Required<Props> = { a: 5 }
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.ts(2741)
// utility-types.ts(181, 3): 'b' is declared here.

// ThisParameterType<Type>
// Extracts the type of the this parameter for a function type, or unknown if the function type has no this parameter.
function toHex(this: Number) {
  return this.toString(16)
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}

// OmitThisParameterType<Type>
// Removes the this paramater from Type. If Type has no explicity declared this parameter, the result is simply Type.
// Otherwise, a new function type with no this parameter is created from Type. Genereics are erased and only the last
// overload signature is propagated into the new function type.
function toHex2(this: Number) {
  return this.toString(16)
}

const fivetoHex: OmitThisParameter<typeof toHex2> = toHex2.bind(5)

console.log(fivetoHex())

// ThisType<Type>
// This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type.
// Note that the --noImplicitThis flag must be enabled to use this utility.
type ObjectDescriptor<D, M> = {
  data?: D
  methods?: M & ThisType<D & M>
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {}
  let methods: object = desc.methods || {}
  return { ...data, ...methods } as D & M
}

let obj3 = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx
      this.y += dy
    }
  }
})

obj3.x = 10
obj3.y = 20
obj3.moveBy(5, 5)

// In this example above, the methods object in the argument to makeObject has a contextual type that includes
// ThisType<D & M> and therefore the type of this in methods within the methods object is { x: number, y: number }
// & { moveBy(dx: number, dy: number): number }. Notice how the type of the moethods property simultaneously is an
// inference target and a source for the this type in methods.
// The ThisType<T> marker interface is simply an emtyp interface declared in lib.d.ts. Beyond being recognised in the
// contextual type of an object literal, the interface acts like any empty interface.

export {}