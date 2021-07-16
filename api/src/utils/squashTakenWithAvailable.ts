import { Disponible, Ocupado } from "../../../interfaces";
import flatInline from "./flatInline";
const squashTakenWithAvailable = (available: [number, number][], taken: [number, number][]) => {
    const newAvailable = flatInline([...available]) 
        // disponible: [[10, 12]]
        // ocupado: [[14, 16], [18, 20]]

        // disponbie: [[10, 12], [19, 22]<==]
        // ocupado: [[14, 16], [18, 19]]

    const oldOcupado = taken

    let newOcupado = oldOcupado.filter(ocupado => ! newAvailable.find(range => range[0] <= ocupado[0] && range[1] >= ocupado[1]))

    newOcupado = newOcupado.map(ocupado => {
        let min = ocupado[0]
        let max = ocupado[1]
        const superSetsOfMin = newAvailable.find(range => range[0] <= min && range[1] >= min)
        const superSetsOfMax = newAvailable.find(range => range[0] <= max && range[1] >= max)
        
        if (superSetsOfMin){
            return [superSetsOfMin[1], max]
        } else if (superSetsOfMax){
            return [min, superSetsOfMax[0]]
        } else {
            return ocupado
        }
    })
}