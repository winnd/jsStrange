#### REPL命令行中
- Ctrl+D                    退出REPL
- node debug debugging.js   调试


####业务

- 读取图片文件并供<img />使用
```
const fs = require('fs')
const img = fs.readFileSync(file.path)
const imgUrl = window.URL.createObjectURL(new Blob([img]))
```

#### 其他
- express常用中间件
    - app.use(express.static("/r_try/")); // 处理静态资源

- mongodb ORM
    - 框架mongoose



