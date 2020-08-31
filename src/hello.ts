interface Person {
  name: string
}

const adam = {
  name: 'Adam Was Here',
  firstName: 'Adam',
  lastName: 'Was Here'
}

function sayHi(person: Person): void {
  console.log(`How you doing ${person.name}`)
}

sayHi(adam)

export {}
