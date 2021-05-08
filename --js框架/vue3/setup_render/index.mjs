import {effectWatch} from '../reactive响应式实现/reactive.mjs'
import {mountElement} from '../render/index.mjs'

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const context = rootComponent.setup()
            effectWatch(() => {
                rootContainer.innerHTML = ''
                const subTree = rootComponent.render(context)
                console.log(subTree)
                mountElement(subTree, rootContainer)
                // rootContainer.append(element)
            })
        },
    }
}
