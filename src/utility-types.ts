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

export {}