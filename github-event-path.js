const fs = require('fs');

console.log(JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')));