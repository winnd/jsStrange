
① this 专项练习


漏掉的知识点
    解构
        ① 赋默认值
            let { name, job='Software engineer' } = person; 
        ② 可以通过解构来复制对象属性, 并且属性会随着原始对象改变
            let personCopy = {};
            ({ name: personCopy.name, age: personCopy.age, job: personCopy.job } = person);
            person.job.title = 'Hacker' 
            console.log(person); //  { name: 'Matt', age: 27, job: { title: 'Hacker' } }
        
        ③ console.log(title); // Software engineer


###前端优化

1. 网页优化
    1. [electron加快1秒](https://blog.inkdrop.info/how-to-make-your-electron-app-launch-1000ms-faster-32ce1e0bb52c)
        1. v8 的快照功能

2. electron优化
    1. [chrome 的perform性能分析](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)


------------------vscode中来的优化---------------------



##todo

1. node搭建一个im框架
    - 数据库
    - token 体系
        - 1. 前端加密
        - 2. 后台加密解密
    - 登录
        - refer
        - 代理人攻击
        - https及如何伪造https 进行数据获取
        - 安全方面
        - form传输格式
        - 前端登录机制
        - header里放什么 与body有什么区别
        - 传输的头中的mime是什么 (post中)
        - url和uri的区别
        - ngnix
        - vue 原理 源码
        - vue官网
        - proxy代理
        - fetch
        - options

2. vue视频









        
