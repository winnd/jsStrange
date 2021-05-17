// vdom -> do
export function mountElement(vNode, container) {
    // tag
    const {tag, props, children} = vNode
    const el = document.createElement(tag)


    // props
    if (props) {
        for (const key in props) {
            const val = props[key]
            el.setAttribute(key, val)
        }
    }
    // children
    if (typeof children === 'string') {
        const textNode = document.createTextNode(children)
        el.append(textNode)
    } else if (Array.isArray(children)) {
        children.forEach((v) => {
            mountElement(v, el)
        })

    }

    container.append(el)
}
