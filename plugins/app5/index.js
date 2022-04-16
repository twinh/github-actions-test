const replace = require('replace-in-file');

const c = {
  "files": ["../../composer.json"],
  "from": new RegExp('                    "github-test/app5": ".*"', "g"),
  "to": '                    "github-test/app5": "${nextRelease.version}"',
  "countMatches": true,
};

const r =  [
  {
    "file": "../../composer.json",
    "hasChanged": true,
    "numMatches": 1,
    "numReplacements": 1,
  },
];

replace(c)
  .then(results => {
    console.log('Replacement results:', results);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });