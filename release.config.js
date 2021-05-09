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
    [
      "@google/semantic-release-replace-plugin",
      {
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
    '@monorepo-semantic-release/monorepo',
    '@semantic-release/npm',
    '@monorepo-semantic-release/github',
    [
      "@semantic-release/git",
      {
        "assets": [
          'CHANGELOG.md',
          'package.json',
          'lib/Wei.php',
        ],
      },
    ],
  ],
  firstRelease: '0.4.5',
};