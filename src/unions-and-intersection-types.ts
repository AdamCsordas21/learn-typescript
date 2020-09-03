// It's a tool that let you compose or combine exosting types instead of creating them from scratch

// Union Types
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft('Hello world', 4) // returns '    Hello world'

// passes at compile time, fails at runtime
let indentedString = padLeft('Hello world', true)

function padLeft2(value: string, padding: string | number) {
  // ...
}

// Unions With Common Fields
interface Bird {
  fly(): void
  layEggs(): void
}

interface Fish {
  swim(): void
  layEggs(): void
}

declare function getSmallPet(): Fish | Bird

let pet = getSmallPet()
pet.layEggs()

// Discriminating Unions
type NetworkLoadingState = {
  state: 'loading'
}

type NetworkFailedState = {
  state: 'failed'
  code: number
}

type NetworkSuccesState = {
  state: 'success'
  response: {
    title: string
    duration: number
    summary: string
  }
}

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccesState

function NetworkState(state: NetworkState): string {
  switch (state.state) {
    case 'loading':
      return 'Downolading...'
    case 'failed':
      return `Error ${state.code} downloading`
    case 'success':
      return `Downloaded ${state.response.title} - ${state.response.summary}`
  }
}

// Union Exhaustiveness checking
type NetworkFromCachedState = {
  state: 'from_cache'
  id: string
  response: NetworkSuccesState['response']
}

type NetworkState2 =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccesState
  | NetworkFromCachedState

function logger(s: NetworkState2) {
  switch (s.state) {
    case 'loading':
      return 'loading request'
    case 'failed':
      return `failed with ${s.code}`
    case 'success':
      return 'got response'
  }
}

export { }