import {mountElement} from '../render/index.mjs'
import {effectWatch} from '../reactive响应式实现/reactive.mjs'

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const context = rootComponent.setup()
            effectWatch(() => {
                rootContainer.innerHTML = ''
                const subTree = rootComponent.render(context)
                mountElement(subTree, rootContainer)
                // rootContainer.append(element)
            })
        },
    }
}
