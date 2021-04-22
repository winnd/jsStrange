<template>
  <div id="app">
    <div class="reader">
      <div class="reader-text js-reader-text" ref="readerDom">
        <h2 class="reader-text-title">
          {{ readData.title }}
          <p class="author"> —— {{ readData.author }}</p>
        </h2>

        <span v-for="(item, index) in readData.texts" class="reader-text-item"
              :class="{speak: index === readData.index, 'js-next': index === (readData.index + 1 >= readData.length ? readData.length - 1 : readData.index + 1)}"
        >
          {{ item }}<br></span>
      </div>
      <div class="reader-oprations">
        <button v-if="!reading" @click="onRead">朗读</button>
        <button v-else @click="onStop">停止</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const reading = ref(false)
    const params = ref({
      voiceURI: 'Ting-Ting',
      lang    : 'zh-CN',
      volume  : 1,
      pitch   : 1,
      rate    : 1,
      text    : ''
    })
    const readData = ref({
      title : '再别康桥',
      author: '作者: 徐志摩',
      texts : [
        '轻轻的我走了，',
        '正如我轻轻的来；',
        '我轻轻的招手，',
        '作别西天的云彩。',
        '那河畔的金柳，',
        '是夕阳中的新娘；',
        '波光里的艳影，',
        '在我的心头荡漾。',
        '软泥上的青荇，',
        '油油的在水底招摇；',
        '在康河的柔波里，',
        '我甘心做一条水草！',
        '那榆荫下的一潭，',
        '不是清泉，',
        '是天上虹；',
        '揉碎在浮藻间，',
        '沉淀着彩虹似的梦。',
        '寻梦？撑一支长篙，',
        '向青草更青处漫溯；',
        '满载一船星辉，',
        '在星辉斑斓里放歌。',
        '但我不能放歌，',
        '悄悄是别离的笙箫；',
        '夏虫也为我沉默，',
        '沉默是今晚的康桥！',
        '悄悄的我走了，',
        '正如我悄悄的来；',
        '我挥一挥衣袖，',
        '不带走一片云彩。',
      ],
      index : -1
    })
    const speechInstance = null
    const readerDom = ref(null)

    const speak = () => {
      if (speechInstance.value) {
        readData.value.index++
        console.log(readData.value.texts[readData.value.index])
        speechInstance.value.text = readData.value.texts[readData.value.index]
        typeof speechSynthesis !== 'undefined' && speechSynthesis.speak(speechInstance.value)

        bindEvents()
      }
    }

    const bindEvents = () => {
      speechInstance.value.onend = e => {
        if (readData.value.index === readData.value.texts.length - 1) {
          onStop()
          return
        }
        scroll()
        speak()
      }

      speechInstance.value.onstart = () => {
        reading.value = true
      }
    }

    const scroll = () => {
      readerDom.value.querySelector('.js-next').scrollIntoViewIfNeeded({
        block   : 'center',
        behavior: 'smooth',
      })
    }

    const onRead = () => {
      onStop()

      speechInstance.value = new SpeechSynthesisUtterance()
      Object.keys(params.value).forEach(key => {
        speechInstance.value[key] = params.value[key]
      })

      speak()
    }

    const onStop = () => {
      speechSynthesis.cancel()
      speechInstance.value = null
      readData.value.index = -1
      reading.value = false
      readerDom.value.scrollTo({top: 0})
    }

    onMounted(() => {
      console.log(readerDom.value)
    })

    return {
      reading,
      readData,
      onRead,
      speak,
      onStop,
      readerDom,
    }
  },
}
</script>
<style lang="scss">
.reader {
  width: 500px;
  margin: 10px auto;

  .reader-text {
    padding: 10px;
    border: 1px solid #000;
    background-color: #fffbf6;
    text-align: center;
    margin: 0 auto;
    width: 350px;
    max-height: 400px;
    overflow: auto;

    .reader-text-title {
      font-size: 14px;

      .author {
        text-align: right;
        font-size: 12px;
        padding: 0;
        margin: 0;
      }

    }

    .reader-text-item {
      transition: all .2s ease;

      &.speak {
        background-color: #f39c12;
        border-radius: 4px;
      }

    }
  }

  .reader-oprations {
    padding: 10px 0;
    text-align: center;
  }

  button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
  }
}
</style>
