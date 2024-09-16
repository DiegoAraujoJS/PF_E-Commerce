import { Time } from "../../../../interfaces";

function rangeToHours(range: Time) {
    
    let min=Number(`${range[0][0]}${range[0][1]}`)
    let max=Number(`${range[1][0]}${range[1][1]}`)
    let allHours=[]
    while (min < max) {
        allHours.push(`${min} hs`)
        
        min=min+1
    }
    return allHours
}

export default rangeToHours