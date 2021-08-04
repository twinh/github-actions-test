global.replace = require('@monorepo-semantic-release/replace');

module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        "preset": "conventionalcommits",
        "releaseRules": [
          {"type": "patch", "release": "patch"},
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
                "files": ["composer.json"],
                "from": '"dev-master": ".*-dev"',
                "to": '"dev-master": "${nextRelease.version}-dev"',
                "results": [
                  {
                    "file": "composer.json",
                    "hasChanged": true,
                    "numMatches": 1,
                    "numReplacements": 1,
                  },
                ],
                "countMatches": true,
              },
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
        ],
      },
    ],
  ],
  packages: [
    'packages/*',
    'm',
  ],
  firstRelease: '0.4.5',
};