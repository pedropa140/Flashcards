const fs = require('fs');
const { exec } = require('child_process');

fs.readFile('dependencies.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading dependencies file:', err);
        return;
    }

    const dependencies = data.split('\n').filter(Boolean);
    dependencies.forEach(dep => {
        exec(`npm install ${dep}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error installing ${dep}:`, err);
                return;
            }
            console.log(`Successfully installed ${dep}`);
        });
    });
});