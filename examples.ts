const helloWorld = 'Hello World'

interface User {
  name: string;
  id: number;
}

const user: User = {
  name: 'Adam',
  id: 21,
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user2: User = new UserAccount('Osh', 28)


function sayHello(user: User): string {
  return `hello, ${user.name}, your id is ${user.id}`
}

function sayHello2({ name, id }: User): string {
  return `hello, ${name}, your id is ${id}`
}

function sayHello3({ name, id }: { name: string; id: number }): string {
  return `hello, ${name}, your id is ${id}`
}

sayHello(user)
sayHello2(user)
sayHello3(user) // duck-typing