import {
  Disponible,
  Ocupado
} from "../../../interfaces";
function getArrayDepth(value) {
  return Array.isArray(value) ? 
    1 + Math.max(...value.map(getArrayDepth)) :
    0;
}
import flatInline from "./flatInline";

const squashTakenWithAvailable = (available: [number, number][], taken: [number, number][]) => {
  const newAvailable = flatInline([...available])
  console.log('newAvailable', newAvailable)

  const oldOcupado = flatInline(taken)
  console.log('oldOcupado', oldOcupado)

  let newOcupado = oldOcupado.filter(ocupado => !newAvailable.find(range => range[0] <= ocupado[0] && range[1] >= ocupado[1]))
  const sortedNewAvailable = newAvailable.flat().sort().reverse()
  const newTakenTransform = newOcupado.map(ocupado => {
    let min = ocupado[0]
    let max = ocupado[1]
    
    console.log(sortedNewAvailable)
    console.log(min, max)
    if (sortedNewAvailable[0] >= min && sortedNewAvailable[sortedNewAvailable.length - 1] >= max) {
      return [min, sortedNewAvailable[0]]
    }
    if (sortedNewAvailable[0] <= min && sortedNewAvailable[sortedNewAvailable.length - 1] <= max) {
      return [sortedNewAvailable[sortedNewAvailable.length - 1], max] // el return de array seria de orden dos
    }
    if (sortedNewAvailable[0] >= min && sortedNewAvailable[sortedNewAvailable.length - 1] <= max) {
      console.log('entre')
      const taken1: [number, number][] = [[min, sortedNewAvailable[0]]]
      const taken2: [number, number][] = [[sortedNewAvailable[sortedNewAvailable.length - 1], max]]

      return [squashTakenWithAvailable(available, taken1), squashTakenWithAvailable(available, taken2)]
    }
  })
  let flattenedNewTakenTransform;

  if (getArrayDepth(newTakenTransform) > 2) {
    console.log('entre')
    flattenedNewTakenTransform = newTakenTransform.flat(getArrayDepth(newTakenTransform) - 2)
    return flattenedNewTakenTransform
  }
  return newTakenTransform
}
