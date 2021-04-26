module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        "preset": "conventionalcommits"
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        "preset": "conventionalcommits"
      }
    ],
    '@semantic-release/changelog',
    '@monorepo-semantic-release/monorepo',
    '@semantic-release/npm',
    '@monorepo-semantic-release/github',
    '@monorepo-semantic-release/git',
  ],
  firstRelease: '0.4.5',
};