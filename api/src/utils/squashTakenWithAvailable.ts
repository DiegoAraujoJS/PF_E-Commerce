import {
  Disponible,
  Ocupado
} from "../../../interfaces";
import flatInline from "./flatInline";
import { parseToIntTuples, parseToStringTuples } from "./parseString";

function getArrayDepth(value) {
  return Array.isArray(value) ? 
    1 + Math.max(...value.map(getArrayDepth)) :
    0;
}

const squashTakenWithAvailable = (available: [number, number][], taken: [number, number][]) => {
  const newAvailable = flatInline([...available])
  

  const oldOcupado = flatInline(taken)
  

  let newOcupado = oldOcupado.filter(ocupado => !newAvailable.find(range => range[0] <= ocupado[0] && range[1] >= ocupado[1]))
  console.log('newOcupado',newOcupado)
  const sortedNewAvailable = newAvailable.flat().sort((a, b) => a-b)
  console.log(sortedNewAvailable)
  const newTakenTransform = newOcupado.map(ocupado => {
    let min = ocupado[0]
    let max = ocupado[1]
    
    
    if (sortedNewAvailable[0] >= min && sortedNewAvailable[sortedNewAvailable.length - 1] >= max) {
      console.log('1')
      return [min, sortedNewAvailable[0]]
    }
    if (sortedNewAvailable[0] <= min && sortedNewAvailable[sortedNewAvailable.length - 1] <= max) {
      console.log('2')
      return [sortedNewAvailable[sortedNewAvailable.length - 1], max] // el return de array seria de orden dos
    }
    if (sortedNewAvailable[0] >= min && sortedNewAvailable[sortedNewAvailable.length - 1] <= max) {
      console.log('3')
      
      const taken1: [number, number][] = [[min, sortedNewAvailable[0]]]
      const taken2: [number, number][] = [[sortedNewAvailable[sortedNewAvailable.length - 1], max]]

      return [squashTakenWithAvailable(available, taken1), squashTakenWithAvailable(available, taken2)]
    }
  })
  let flattenedNewTakenTransform;

  if (getArrayDepth(newTakenTransform) > 2) {
    
    flattenedNewTakenTransform = newTakenTransform.flat(getArrayDepth(newTakenTransform) - 2)
    return flattenedNewTakenTransform
  }
  return newTakenTransform
}

const horario1 = JSON.parse(`{
  "email": "edwardburgos@gmail.com",
  "fecha": {
      "anio": 2021,
      "mes": 8,
      "dia": 14
  },
  "disponible": [["12:00:00", "14:00:00"]],
  "ocupado": null
  
}`)
const disponible1: Disponible = JSON.parse(`{
  "email": "edwardburgos@gmail.com",
  "fecha": {
      "anio": 2021,
      "mes": 8,
      "dia": 14
  },
  "disponible": [["18:00:00", "20:00:00"]]
  
}`)
const ocupado1 = JSON.parse(`{
  "email": "edwardburgos@gmail.com",
  "fecha": {
      "anio": 2021,
      "mes": 8,
      "dia": 14
  },
  "ocupado": [["12:00:00", "14:00:00"]]
  
}`)

const squash = squashTakenWithAvailable([[12, 14]], [[12,14], [18,20]])
console.log(squash)
// export default squashTakenWithAvailable

