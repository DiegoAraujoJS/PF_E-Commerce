const flat = (array: any[][]) => {
    return array.reduce((acum, x) => [...acum, ...x])
}
export default flat