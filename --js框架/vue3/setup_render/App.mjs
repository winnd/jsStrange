import {reactive} from '../reactive响应式实现/reactive.mjs'

export default {
    render(context) {
        const div = document.createElement('div')
        div.innerHTML = context.state.count
        return div
    },
    setup() {
        const state = reactive({
            count: 0,
        })
        setInterval(() => {
            state.count++
            console.log(state)
        }, 1000)
        return {state}
    },
}
