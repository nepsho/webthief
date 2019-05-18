const { exec } = require('child_process');

// exec('ls -l', (err, stdout, stderr) => {
//     if (err) {
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

const { execSync } = require('child_process');

for (let j = 0; j < process.argv.length; j++) {  
    console.log(j + ' -> ' + (process.argv[j]));
}

var stdout = execSync('ls -l');
var x = execSync("echo '"+stdout+"'");
console.log(String(x))