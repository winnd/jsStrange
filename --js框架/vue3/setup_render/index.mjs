import {effectWatch} from '../reactive响应式实现/reactive.mjs'

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const context = rootComponent.setup()
            effectWatch(() => {
                const element = rootComponent.render(context)

                rootContainer.innerHTML = ''
                rootContainer.append(element)
            })
        },
    }
}
