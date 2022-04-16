global.replace = require('@monorepo-semantic-release/replace');

module.exports = {
  plugins: [
    '@monorepo-semantic-release/zero-commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@monorepo-semantic-release/monorepo',
    [
      '@monorepo-semantic-release/replace',
      {
        "packages": [
          {
            "includes": ["@github-test/app3"],
            "replacements": [
              {
                "files": ["lib/Wei.php"],
                "from": "VERSION = '.*'",
                "to": "VERSION = '${nextRelease.version}'",
                "results": [
                  {
                    "file": "lib/Wei.php",
                    "hasChanged": true,
                    "numMatches": 1,
                    "numReplacements": 1,
                  },
                ],
                "countMatches": true,
              },
            ],
          },
        ],
      },
    ],
    '@semantic-release/npm',
    '@monorepo-semantic-release/github',
    [
      '@monorepo-semantic-release/git',
      {
        'message': 'chore(release): publish\n\nSee CHANGELOG.md for more details.',
        'assets': [
          '(packages|plugins)/*/CHANGELOG.md',
          '(packages|plugins)/*/package.json',
          '(packages|plugins)/*/composer.json',
          'packages/app3/lib/Wei.php',
          'm/CHANGELOG.md',
          'm/package.json',
          'CHANGELOG.md',
          'package.json',
          'composer.json',
          'composer.lock',
        ],
      },
    ],
    [
      '@monorepo-semantic-release/replace',
      {
        "packages": [
          {
            "includes": ["@github-test/m"],
            "replacements": [
              {
                "files": ["package.json"],
                "from": '"private": true,',
                "to": '"private": false,',
                "results": [
                  {
                    "file": "package.json",
                    "hasChanged": true,
                    "numMatches": 1,
                    "numReplacements": 1,
                  },
                ],
                "countMatches": true,
              },
            ],
          },
          {
            "includes": ["@github-test/test"],
            "replacements": [
              {
                "files": ["package.json"],
                "from": '"private": true,',
                "to": '"private": false,',
                "results": [
                  {
                    "file": "package.json",
                    "hasChanged": true,
                    "numMatches": 1,
                    "numReplacements": 1,
                  },
                ],
                "countMatches": true,
              },
            ],
          },
        ],
      },
    ],
  ],
  packages: [
    'packages/*',
    'plugins/*',
    'm',
    '.',
  ],
  firstRelease: '0.4.5',
  packageOptions: {
    '@github-test/test': {
      tagFormat: 'v${version}',
      filterCommits: (commits) => {
        return commits.filter(commit => {
          return commit.subject.split(':')[0].includes('u, ');
        });
      },
    }
  }
};