const flatInline = (array: [number, number][]): [number, number][] => {
    let inLine = []

    let ranges: [number, number][] = []
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
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
            if (!ranges.find(range => range[0] <= r && range[1] >= r)) {

                max = r
            }
            if (min && max) {


                ranges = ranges.filter(range => !(range[0] >= min && range[1] <= max))
                ranges.push([min, max])

            } else if (min && !max) {


                const superSets = ranges.filter(range => range[0] <= r && range[1] >= r).flat().sort().reverse()
                const maximumSuperSet = superSets[superSets.length - 1]
                max = maximumSuperSet
                ranges = ranges.filter(range => !(range[0] >= min && range[1] <= max))
                ranges.push([min, max])

            } else if (!min && max) {


                const superSets = ranges.filter(range => range[0] <= l && range[1] >= l).flat().sort().reverse()
                console.log('superSets', superSets)
                const minimumSuperSet = superSets[0]
                min = minimumSuperSet
                ranges = ranges.filter(range => !(range[0] >= min && range[1] <= max))
                ranges.push([min, max])
            }
        }
    }
    return ranges
}



export default flatInline