global.replace = require('@monorepo-semantic-release/replace');

module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        "preset": "conventionalcommits",
        "releaseRules": [
          {"release": false}, // 用于跳过默认规则
          {type: 'feat', "scope": "u, *", release: 'minor'},
          {type: 'fix', "scope": "u, *", release: 'patch'},
          {type: 'perf', "scope": "u, *", release: 'patch'},
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        "preset": "conventionalcommits",
        "presetConfig": {
          "types": [
            {type: 'feat', section: 'Features'},
            {type: 'fix', section: 'Bug Fixes'},
            {type: 'patch', section: 'Patches'},
            {type: 'perf', section: 'Performance Improvements'},
            {type: 'revert', section: 'Reverts'},
            {type: 'docs', section: 'Documentation', hidden: true},
            {type: 'style', section: 'Styles', hidden: true},
            {type: 'chore', section: 'Miscellaneous Chores', hidden: true},
            {type: 'refactor', section: 'Code Refactoring', hidden: true},
            {type: 'test', section: 'Tests', hidden: true},
            {type: 'build', section: 'Build System', hidden: true},
            {type: 'ci', section: 'Continuous Integration', hidden: true},
          ],
        },
      },
    ],
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
    'm',
    '.',
  ],
  firstRelease: '0.4.5',
  packageOptions: {
    '@github-test/test': {
      tagFormat: 'v${version}',
      plugins: [
        [
          '@semantic-release/commit-analyzer',
          {
            "releaseRules": [
              {breaking: true, "scope": "u", release: 'major'},
              {revert: true, "scope": "u", release: 'patch'},
              {type: 'feat', "scope": "u", release: 'minor'},
              {type: 'fix', "scope": "u", release: 'patch'},
              {type: 'perf', "scope": "u", release: 'patch'},
            ],
          },
        ],
      ]
    }
  }
};