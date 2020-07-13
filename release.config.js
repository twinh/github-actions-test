module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@monorepo-semantic-release/monorepo',
    '@monorepo-semantic-release/github',
    '@monorepo-semantic-release/git',
  ],
  "version": "fixed",
}