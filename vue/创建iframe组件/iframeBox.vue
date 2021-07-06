<!--https://codesandbox.io/s/hf1fe?file=/src/components/RenderToIFrame.js-->
<template>
  <iframe ref="iframeBox" />
</template>

<script>
  import { createApp, onMounted, ref } from 'vue'
  import i18n from '../../i18n'

  export default {
    name: 'DataIframe',
    props: {
      dd: { type: Number, default: 0 },
      cc: { type: Array, default: () => [] }
    },
    setup(props, { slots }) {
      const iframeBox = ref(null)
      const el = document.createElement('div')

      onMounted(() => {
        iframeBox.value.contentDocument.body.append(el)

        const iframeRootComponent = {
          name: 'DataFlowIframe',
          setup() {
            return () => slots.default()
          }
        }

        const iframeApp = createApp(iframeRootComponent)

        iframeApp.use(i18n)
        iframeApp.mount(el)
      })
      return {
        iframeBox
      }
    }
  }
</script>

<style>
  iframe {
    width: 200px;
    height: 200px;
    background: orange;
  }
</style>
