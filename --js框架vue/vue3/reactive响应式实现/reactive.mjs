// 这是对于值的响应设置
let currentCb
export class Dep {
    cbSet
    _value
    static currentCb

    constructor(value) {
        if (currentCb) {
            this._value = value
            this.cbSet = new Set()
        }
    }

    get value() {
        this.appendCb(currentCb)
        return this._value
    }

    set value(value) {
        this._value = value
        this.notice()
    }

    appendCb() {
        if (currentCb) {
            this.cbSet.add(currentCb)
        }
    }

    notice() {
        this.cbSet.forEach(cb => {
            cb()
        })
    }
}

export function effectWatch(cb) {
    currentCb = cb
    cb()                // cb 执行的时候 currentCb 是一直存在的
    currentCb = null
}

const objMap = new Map()        // 目标对象里的键值

function initKeyMap(obj, key) {
    let depsMap = objMap.get(obj)
    if (!depsMap) {
        depsMap = new Map()
        objMap.set(obj, depsMap)
    }

    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep(Reflect.get(obj, key))
        depsMap.set(key, dep)
    }
    return dep
}

// 这是对于对象进行响应设置
export function reactive(obj) {
    return new Proxy(obj, {
        get(rawObj, key) {
            const dep = initKeyMap(rawObj, key)
            dep.appendCb()
            return Reflect.get(rawObj, key)
        },
        set(obj, key, newVal) {
            const dep = initKeyMap(obj, key)
            const result = Reflect.set(obj, key, newVal)
            dep.notice()
            return result
        },
    })
}


