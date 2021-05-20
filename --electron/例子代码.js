//region 主进程 -> 渲染交互
//1. 渲染进程发射:
const {ipcRenderer} = require('electron')
ipcRenderer.invoke('perform-action', ...args)

//2.主进程接收:
const { ipcMain } = require('electron')
ipcMain.handle('perform-action', (event, ...args) => {})
//endregion


// -- 获取所有窗口
remote.BrowserWindow.getAllWindows()
remote.BrowserWindow.getAllWindows().filter(w => w.id !== id)       // 过滤获得窗口实例

// 发送消息给特定的窗口
_getWindows().wins.forEach(w => { w.send(name) })

// 获取当前窗口
remote.getCurrentWindow()

