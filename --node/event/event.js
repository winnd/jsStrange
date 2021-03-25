import {EventEmitter} from "events";
import * as path from "path";
import {open} from "fs/promises";

const mEvent = new EventEmitter({captureRejections: true})
mEvent[Symbol.for('nodejs.rejection')] = logError // 挂载错误监听器
mEvent.on('something', async () => {              // ← 这里的 async 是必要的
    JSON.parse('ddd')
})

mEvent.emit('something')

async function logError(err) {
    const logPath = path.resolve(`./event/errLog.txt`)
    const log = new Log({logPath, err})

    log.printErr()

    await log.writeErrToLog()
}

class Log {
    constructor({logPath, err}) {
        this.logPath = logPath
        this.err = err
        this.simpleLocalTime = new Date().toLocaleString()
        this.lineHeader = `\n------${this.simpleLocalTime}: error start------\n`
        this.lineFooter = `\n------${this.simpleLocalTime}: error end------\n`
    }

    printErr() {
        console.log(this.lineHeader)
        console.log(this.err.stack)
        console.log(this.lineFooter)
    }

    async writeErrToLog() {
        const fd = await open(this.logPath, 'a+')
        await fd.appendFile(this.lineHeader)
        await fd.appendFile(this.err.stack)
        await fd.appendFile(this.lineFooter)
        await fd.close()
    }
}
