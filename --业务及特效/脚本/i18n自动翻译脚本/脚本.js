const fs = require('fs')
const path = require('path')
const readline = require('readline')

//D:\libo37\IM\PC-Hik-IM\src\asset\local
// 李波的配置
// const mapFilePath = 'D:/libo37/IM/en/PC-Hik-Base/doc/国际化/i18n.csv'
// im
// const zhcnFilePath = 'D:/libo37/IM/en/PC-Hik-IM/src/asset/local/im_zhcn.js'     // 本程序中中文映射文件的位置
// const enFilePath = 'D:/libo37/IM/en/PC-Hik-IM/src/asset/local/im_en.js'         // 本程序中英文映射文件的位置

// base
// const zhcnFilePath = 'D:/libo37/IM/en/PC-Hik-Base/resource/release/js/local/base_zhcn.js'     // 本程序中中文映射文件的位置
// const enFilePath = 'D:/libo37/IM/en/PC-Hik-Base/resource/release/js/local/base_en.js'


// 中英文对照文件,utf8格式
// 任丰烨的配置 - IM
const zhcnFilePath = 'E:/project/h5-moa-electron-new-framework2-vitetron/IM/src/asset/local/im_zhcn.js'     // 本程序中中文映射文件的位置
const enFilePath = 'E:/project/h5-moa-electron-new-framework2-vitetron/IM/src/asset/local/im_en.js'         // 本程序中英文映射文件的位置
// 任丰烨的配置 - BASE
// const enFilePath = 'E:/project/h5-moa-electron-new-framework2-vitetron/BASE/resource/release/js/local/base_en.js'         // 本程序中英文映射文件的位置
// const zhcnFilePath = 'E:/project/h5-moa-electron-new-framework2-vitetron/BASE/resource/release/js/local/base_zhcn.js'     // 本程序中中文映射文件的位置
const mapFilePath = './i18n.csv'               // 中英文对照文件,utf8格式

/**
 * todo 自动格式化 要不然git上传的时候会不对应
 */

startTransform()

async function startTransform() {
  const {result: zhcnObj} = transformLanguageFileToObj({filePath: zhcnFilePath})   // 本程序中的zhcn.js文件
  const {result: languageObj, isNodeModule: isNodeModule_en} = transformLanguageFileToObj({filePath: enFilePath})         // 本程序中的en.js文件
  const {result: translateMapList, languages} = await getLanguageMapFile({filePath: mapFilePath})                       // 中英文对照文件, 从.csv文件中生成
  const english = languages[1] // 语言名称 这里是 `English` 来自.cvs对照文件的题头
  const chinese = languages[0] // 语言名称 这里是 `Chinese` 来自.cvs对照文件的题头
  const {translatedLanguageObj: newEnObj} = getTranslatedLanguageObj(translateMapList, {zhcnObj, languageObj, originLanguage: chinese, targetLanguage: english})
  writeNewLanguageToFile({newLanguageObj: newEnObj, targetLanguageFilePath: enFilePath, isNodeModule: isNodeModule_en})
}

/**
 * 拿文件里的文本并放到内存对象里
 * todo 要改成异步代码
 * @param filePath{string}
 * @param variableName{string}
 * @return {{result: Object}}      // 返回内存对象
 */
function transformLanguageFileToObj({filePath}) {     // variableName 存到哪个文件里
  const _tmpObj = {}     // 用来暂存eval()执行以后产生的东西
  const _tmpVar = 'tmpVar'
  const languageFile = fs.readFileSync(filePath)
  const zhcnFileString = languageFile.toString()
  const isNodeModule = zhcnFileString.startsWith('module.exports = ') // todo 判断是否有这个文件， 其实可以自动生成文件而不是解析文件然后塞进去
  const json = isNodeModule ? zhcnFileString.substr('module.exports = '.length) : zhcnFileString.substr('export default '.length)  // node的模块引入 ?? es6的import
  const resultJson = json ? json : '\{\}' // 针对en.js里是空的情况
  try {
    eval(`_tmpObj.${_tmpVar} = ${resultJson}`)      // 把对象字符串变成内存里的对象
  } catch (err) {
    console.error(err)
  }

  return {
    isNodeModule,
    result: _tmpObj[_tmpVar],
  }
}

/**
 * 语言转换
 * @param translateMapList
 * @param language           cvs文件的题头 [Chinese,English,...]
 * @param zhcnObj
 * @param languageObj
 * @return {{newEnObj, newOtherObj: {}}}
 */
function getTranslatedLanguageObj(translateMapList, {originLanguage, targetLanguage, zhcnObj, languageObj}) {
  const translatedLanguageObj = _copyZhcnKeyToOtherLanguageObj({zhcnObj, languageObj, originLanguage, targetLanguage})

  /**
   * todo 需要尾递归优化
   * 复制一份中文对象到其他语言对象中
   * @param zhcnObj{Object}            中文对象
   * @param languageObj{Object}        目标语言对象
   * @param originLanguage{string}     原语言:`Chinese`
   * @param targetLanguage{string}     目标语言:`English`
   */
  function _copyZhcnKeyToOtherLanguageObj({zhcnObj, languageObj, originLanguage, targetLanguage}) {
    const _otherLanguageObj = languageObj     // todo 这个可以优化掉
    for (let key in zhcnObj) {
      if (typeof zhcnObj[key] === 'object') {
        _otherLanguageObj[key] = {}
        _copyZhcnKeyToOtherLanguageObj({zhcnObj: zhcnObj[key], languageObj: _otherLanguageObj[key], originLanguage, targetLanguage})
      } else {
        const englishText = _getMapContentFromTranslateFile({translateMapList, zhcnText: zhcnObj[key], originLanguage, targetLanguage})
        _otherLanguageObj[key] = englishText
      }
    }
    return _otherLanguageObj
  }

  function _getMapContentFromTranslateFile({translateMapList, zhcnText, originLanguage, targetLanguage}) {
    const translateObj = translateMapList.find(x => x[`${originLanguage}`] === zhcnText)
    let translatedText

    if (translateObj) {
      const mappedText = translateObj[`${targetLanguage}`]
      if (mappedText) {
        // 处理@人
        let _text = mappedText.replace('@', `{'@'}`) // todo 这里可以注入格式化规则
        translatedText = _text
      } else {
        throw new Error('请检查zhcn.js文件里是否有为空的字符串')
      }
    } else {
      translatedText = `--未找到,未翻译--: ${zhcnText}`
    }
    return translatedText
  }

  return {
    translatedLanguageObj,
  }
}

/**
 * 拿中英文对照文件出来
 * @param filePath
 * @return {Promise<{result: unknown, languages: []}>}
 */
async function getLanguageMapFile({filePath}) {
  const _readline = readline.createInterface({input: fs.createReadStream(filePath), crlfDelay: 'Infinity'})   // 文件的流
  const resultArr = []   // 中英文对照映射的数组
  let languages = []

  _readline.on('line', (line) => {
    let obj = {}


    if (line.startsWith('"') || line.endsWith('"')) {
      let Chinese
      let otherLanguage
      const reg = /\".*?\"/g
      const startWithQuote = line.startsWith('"')
      const endWithQuote = line.endsWith('"')
      const sentences = line.match(reg)

      if (line.includes('开发中，敬请期待')) {
        console.log(line)
      }
      if (startWithQuote) {
        Chinese = _removeQuote(sentences[0])
        otherLanguage = line.substr(Chinese.length + 3, line.length) // +3是因为去掉了双引号和逗号
      } else if (!startWithQuote && endWithQuote) { // 中文没用双引号括起来, 英文用双引号括起来, 说明中文里没有包括逗号
        Chinese = line.split(',')[0]
        otherLanguage = _removeQuote(sentences[0])
      } else if (startWithQuote && endWithQuote) {
        Chinese = _removeQuote(sentences[0])
        otherLanguage = _removeQuote(sentences[1])
      } else {
        Chinese = '--未找到--双引号解析有问题'
        otherLanguage = '--未找到--双引号解析有问题'
      }
      obj[languages[0]] = Chinese
      obj[languages[1]] = otherLanguage
    } else {
      const languageMapArr = line.split(',')
      if (!resultArr.length) {                // 第一行是题头, 标识了语言
        languageMapArr.forEach((x, index) => { obj[`${languageMapArr[index]}`] = languageMapArr[index] })
        languages = languageMapArr
      } else {                                // ['登录','login']=>{'chinese':'登录','english':'login'}
        languageMapArr.forEach((x, index) => {
          obj[languages[index]] = languageMapArr[index]
        })
      }
    }
    resultArr.push(obj)
  })

  function _getObjOnEnd() {
    return new Promise((resolve) => {
      _readline.on('close', () => {
        resolve(resultArr)
      })
    })
  }

  const result = await _getObjOnEnd()

  return {
    result,
    languages: languages, // csv文件的题头, 标识的是语言 [Chinese,English,...]
  }
}

function _removeQuote(str) {
  if (!str) {
    return '--未找到-- 不能删除引号'
  }
  let _str = str.substr(1)  // 去除头部引号
  _str = _str.substr(0, _str.length - 1) // 去除尾部引号
  return _str
}

/**
 *
 * @param newLanguageObj{Object}
 * @param enFilePath{string}
 */
function writeNewLanguageToFile({newLanguageObj, targetLanguageFilePath: languageFilePath, isNodeModule}) {
  const jsonStr = JSON.stringify(newLanguageObj)
  const resultStr = isNodeModule ? `module.exports = ${jsonStr}` : `export default ${jsonStr}`
  fs.writeFileSync(languageFilePath, resultStr)
}
