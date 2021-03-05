module.exports = {
  plugins: [
    ["@semantic-release/commit-analyzer", {
      "parserOpts": {
        "headerPattern": /^(\w*)(?:\((.*)\))?!?: (.*)$/,
        "breakingHeaderPattern": /^(\w*)(?:\((.*)\))?!: (.*)$/,
      }
    }],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@monorepo-semantic-release/monorepo',
    '@semantic-release/npm',
    '@monorepo-semantic-release/github',
    '@monorepo-semantic-release/git',
  ],
  firstRelease: '0.4.5'
}