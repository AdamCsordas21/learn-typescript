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

export {}