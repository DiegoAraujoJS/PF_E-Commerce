import flatInline from "./flatInline";

function getArrayDepth(value) {
  return Array.isArray(value) ? 
    1 + Math.max(...value.map(getArrayDepth)) :
    0;
}

const squashTakenWithAvailable = (available: [number, number][], taken: [number, number][]) => {
  let isFlattened: boolean;
  const newAvailable = flatInline([...available])
  
  isFlattened = newAvailable.length < available.length ? true : false
  let whichFlattened = isFlattened ? newAvailable.find((tuple, i) => tuple !== available[i]) : null
  
  const oldOcupado = flatInline(taken)
  

  let newOcupado = oldOcupado.filter(ocupado => !newAvailable.find(range => range[0] <= ocupado[0] && range[1] >= ocupado[1]))
  
  const sortedNewAvailable = isFlattened ? whichFlattened : available[available.length - 1]
  
  const newTakenTransform = newOcupado.map(ocupado => {
    let min = ocupado[0]
    let max = ocupado[1]
    
    const A = sortedNewAvailable[0]
    const B = sortedNewAvailable[sortedNewAvailable.length - 1]
    
    if (min <= A && max <= A) {
      return [min, max]
    }
    if (min <= A && max >= A && max <= B) {
      return [min, A]
    }
    if (min <= A && max >= B) {
      
      const taken1: [number, number][] = [[min, sortedNewAvailable[0]]]
      const taken2: [number, number][] = [[sortedNewAvailable[sortedNewAvailable.length - 1], max]]

      return [squashTakenWithAvailable(available, taken1), squashTakenWithAvailable(available, taken2)]
    }
    if (min >= A && min <= B && max >= B) {
      return [B, max] 
    }
    if (min >= A && min >= B) {
      return [min, max]
    }
  })
  let flattenedNewTakenTransform;

  if (getArrayDepth(newTakenTransform) > 2) {
    
    flattenedNewTakenTransform = newTakenTransform.flat(getArrayDepth(newTakenTransform) - 2)
    return flattenedNewTakenTransform
  }
  return newTakenTransform
}

export default squashTakenWithAvailable
