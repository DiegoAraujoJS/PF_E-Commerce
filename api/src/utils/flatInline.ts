import flat from "./flat"

const flatInline = (array: [number, number][]): [number, number][] => {
    let inLine = []
    
    let ranges: [number, number][] = []
    for (let i=0; i< array.length; i++) {
        if (i===0) {
            ranges.push([array[0][0], array[0][1]])
          console.log('ranges', ranges)
        } else {
            let l = array[i][0]
            let r = array[i][1]
            let min;
            let max;

            if (!ranges.find(range => range[0] <= l && range[1] >= l)) {
              console.log('primer if')
                min = l;
            }
            if (!ranges.find(range => range[0] <= r && range[1] >= r)){
                            console.log('segundo if')
                max = r
            }
            if (min && max) {
                            console.log('TERCER if')

                ranges = ranges.filter(range => ! (range[0] >= min && range[1] <= max))
                ranges.push([min, max])      

            } else if (min && !max) {
                            console.log('CUARTO if')

                const superSets = flat (ranges.filter(range => range[0] <= r && range[1] >= r)).sort()
                const maximumSuperSet = superSets[superSets.length - 1]
                max = maximumSuperSet
                ranges = ranges.filter(range => ! (range[0] >= min && range[1] <= max))
                              ranges.push([min, max]) 

            } else if (!min && max){
                            console.log('QUINTO if')

                const superSets = flat(ranges.filter(range => range[0] <= l && range[1] >= l)).sort()
                console.log('superSets', superSets)
                const minimumSuperSet = superSets[0]
                min = minimumSuperSet
                ranges = ranges.filter(range => ! (range[0] >= min && range[1] <= max))
                              ranges.push([min, max]) 
            }
        }
    }
    return ranges
}

export default flatInline