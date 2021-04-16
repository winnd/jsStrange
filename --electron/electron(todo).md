### 进程间交流
1. 主,渲染进程交互 
    - 主进程 -> 渲染交互
        1. 渲染进程发射:
        ```
            const { ipcRenderer } = require('electron')
            ipcRenderer.invoke('perform-action', ...args)
        ```
        2. 主进程接收:
        ```
           const { ipcMain } = require('electron')
           ipcMain.handle('perform-action', (event, ...args) => {})
        ```




