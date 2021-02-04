
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
        
        
        
        
