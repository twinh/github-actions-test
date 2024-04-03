const parser = require('conventional-commits-parser').sync;

function removeCommitScope(message, scope) {
  const result = parser(message, {
    headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
  });
  if (!result.scope) {
    return message;
  }

  let scopes = result.scope.split(', ');
  if (!scopes.includes(scope)) {
    return message;
  }

  scopes = scopes.filter(item => item !== scope);
  return result.type
    + (scopes.length ? '(' + scopes.join(', ') + ')' : '') + ': '
    +  result.subject + '\n\n' + result.body + '\n\n' + result.footer;
}

module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'master',
    'next',
    'next-major',
    {name: 'beta', prerelease: true},
    {name: 'alpha', prerelease: true},
  ],
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
                "countMatches": false,
              },
            ],
          },
        ],
      },
    ],
    '@semantic-release/npm',
    [
      '@monorepo-semantic-release/github',
      {
        includes: ['@github-test/test'],
      },
    ],
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
        return commits.map(commit => {
          const message = removeCommitScope(commit.message, 'u');
          if (message === commit.message) {
            return false;
          }
          commit.message = message;
          return commit;
        }).filter(Boolean);
      },
    },
  },
};