-- 解析 .yaml yaml配置文件

    ```
import yaml from 'js-yaml' 
const electronEsbuildConfig = (yaml.load(fileContent) as unknown) as ElectronEsbuildConfigYaml
```

-- 在js文件里调用 package.josn的script

    ```
exec('npm run vite_dev', (err, stdout, stderr) => { 
    if (err) { console.error(err)} 
    console.log({err, stdout, stderr}); 
});
```

-- 用spawn调用.exe

    ```
const { spawn } = require('child_process'); 
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

bat.stdout.on('data', (data) => { console.log(data.toString()); });

bat.stderr.on('data', (data) => { console.error(data.toString()); });

bat.on('exit', (code) => { console.log(`Child exited with code ${code}`); });
```

    -- 用exec调用.exe

        ```
const { exec, spawn } = require('child_process');
exec('my.bat', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});

// Script with spaces in the filename:
const bat = spawn('"my script.cmd"', ['a', 'b'], { shell: true });
// or:
exec('"my script.cmd" a b', (err, stdout, stderr) => {
// ...
});
// or
const {stdout,stderr} = await exec('ls')
```
