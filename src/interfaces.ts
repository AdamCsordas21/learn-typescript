function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label)
}
let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)


interface LabeledValue {
  label: string
}
function printLabel1(labeledObj: LabeledValue) {
  console.log(labeledObj.label)
}
let myObj1 = { label: 'Size 10 Object', size: 10 }
printLabel(myObj1)


interface SquareConfig {
  colour?: string
  width?: number
}

const sc1: SquareConfig = {}
const sc2: SquareConfig = { colour: 'red' }
const sc3: SquareConfig = { width: 12 }
const sc4: SquareConfig = { colour: 'red', width: 12 }
const sc5: SquareConfig = { colour: undefined }
const sc6: SquareConfig = { width: undefined }
const sc7: SquareConfig = { colour: undefined, width: undefined }
const sc8: SquareConfig = { colour: undefined, width: 12 }

function createSquare(config: SquareConfig): { colour: string; area: number } {
  let newSquare = { colour: 'white', area: 100 }
  if (config.colour) {
    newSquare.colour = config.colour
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ colour: 'black' })
