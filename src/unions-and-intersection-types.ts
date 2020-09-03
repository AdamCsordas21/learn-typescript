// It's a tool that let you compose or combine existing types instead of creating them from scratch

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

// Only available in one of the two possible types
// pet.swim();
// Property 'swim' does not exist on type 'Bird | Fish'.
//   Property 'swim' does not exist on type 'Bird'.

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
      return 'Downloading...'
    case 'failed':
      return `Error ${state.code} downloading`
    case 'success':
      return `Downloaded ${state.response.title} - ${state.response.summary}`
  }
}

enum NetworkState3 {
  Loading,
  Failed,
  Succes
}

interface NetworkEventSuccess {
  state: NetworkState3.Succes
  response: {
    title: string
    duration: number
    summary: string
  }
}

type NetworkEventFailed = {
  state: NetworkState3.Failed
  code: number
}

type NetworkEventLoading = {
  state: NetworkState3.Loading
}

type NetworkEvent = NetworkEventSuccess | NetworkEventFailed | NetworkEventLoading

function logEvent(event: NetworkEvent): string {
  switch (event.state) {
    case NetworkState3.Loading:
      return 'loading request'
    case NetworkState3.Failed:
      return `failed with ${event.code}`
    case NetworkState3.Succes:
      return 'got response'
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

function logger(s: NetworkState2)/* : string - can't add this, because we don't cover the case of 'from_cache' */ {
  switch (s.state) {
    case 'loading':
      return 'loading request'
    case 'failed':
      return `failed with ${s.code}`
    case 'success':
      return 'got response'
  }
}

// Intersection Types
interface ErrorHandling {
  success: boolean // maybe this is not needed after all
  error?: { message: string }
}

interface ArtworksData {
  artworks: { title: string }[]
}

interface ArtistsData {
  artists: { name: string }[]
}

type ArtworksResponse = ArtworksData & ErrorHandling
type ArtistsResponse = ArtistsData & ErrorHandling

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.log(response.error.message)
    return
  }
  console.log(response.artists)
}

interface ErrorneousResponse {
  success: false
  error: { message: string }
}

interface SuccessfulResponse {
  success: true
}

type ErrorHandling2 = ErrorneousResponse | SuccessfulResponse

interface ArtworksData2 {
  artworks: { title: string }[]
}

interface ArtistsData2 {
  artists: { name: string }[]
}

type ArtworksResponse2 = ArtworksData2 & ErrorHandling2
type ArtistsResponse2 = ArtistsData2 & ErrorHandling2

const handleArtistsResponse2 = (response: ArtistsResponse2) => {
  if (!response.success) {
    console.log(response.error.message)
    return
  }
  console.log(response.artists)
}

export { }
