module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@monorepo-semantic-release/monorepo',
    '@semantic-release/npm',
    '@monorepo-semantic-release/github',
    '@monorepo-semantic-release/git',
  ],
  firstRelease: '0.4.5',
  packageOptions: {
    '@github-test/base': {
      branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'master',
        'next',
        'next-major',
        'beta',
        {name: 'alpha', prerelease: true},
      ],
    }
  }
}