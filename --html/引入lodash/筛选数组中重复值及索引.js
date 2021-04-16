
const data = ["a", "a", "b", "c", "c", "a"]

const result = _.pickBy(
    data.reduce(function (result,current,index) {
        a.indexOf(current, index) >= 0 ? _.set(result, current, [...result[current] || [], index]) && result : result, {}
    }), x => x.length > 1)

console.log(result)
