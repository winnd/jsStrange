<template>

  <iframeBox>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
  </iframeBox>
  <div ref="app2Dom"></div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import * as X6 from '@antv/x6/lib/graph/graph'
  import X6_1 from './X6_1.vue'
  import iframeBox from '@/views/data-flow-diagram/iframeBox.vue'

  export default {
    components: {
      iframeBox,
    },
    // inject: ['getGraph', 'getNode'],
    setup() {
      const a = 1
      const app2Dom = ref(null)
      const outBtnClick = () => {
        console.log('outBtnClick')
        console.log(this.getGraph)
      }

      onMounted(() => {
        const data = { num: 0 }

        const graph = new X6.Graph({
          container: app2Dom.value,
          width: 800,
          height: 600,
          grid: true
        })

        graph.addNode({
          shape: 'html',
          width: 200,
          height: 200,
          x: 100,
          y: 100,
          attrs: {
            body: {
              width: 200,
              height: 200,
              stroke: 'red'
            }
          },
          component: {
            template: `<div :num="num" @add="add()"></div>`,
            data() {
              return data
            },
            methods: {
              add: () => {
                data.num += 1
              }
            }
          }
        })
      })

      return {
        app2Dom,
        outBtnClick
      }
    }
  }
</script>

<style></style>
