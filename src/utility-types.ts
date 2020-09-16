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

export {}