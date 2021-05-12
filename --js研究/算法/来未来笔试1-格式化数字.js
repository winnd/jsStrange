function format(num){
    // 请实现 ...
    const a = 12345.6789
    const numbers = a.toString().split('.')         // num1：整数，num2：小数
    const [num1, num2] = numbers
    const _num1 = parseNumber({num: num1, type: 'front'}) // 解析整数
    const _num2 = parseNumber({num: num2, type: 'end'}) // 解析小数
    const result = [_num1, _num2].join('.')
    return result
}

function parseNumber({num, type}){
    if(type === 'front'){
        const [n1,...n2] = num.toString().split(',')
        if(parseInt((n1/1000).toString())>0){
            const _num = (n1/1000).toString().split('.').join(',')

            return parseNumber(
                {num:[_num,...n2].join(','),
                    type:'front'
                })
        } else {
            return num
        }
    } else if (type === 'end'){
        if(num.length > 3){
            if(!num.includes(',')){
                const [n1, ...n2] = num.toString().split(',')
                const tmpNum = n2.splice(3,0,',')
                return parseNumber({num: [n1, ..._num], type: 'end'})
            } else {

            }
        } else {
            return _num
        }
    }
}

// ============= 测试用例 ==============
console.log(format(12345.6789));
console.log(format(1234567));
console.log(format(0.1234567));
