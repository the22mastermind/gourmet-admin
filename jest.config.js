module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/**/*.js',
    '!**/cypress/**',
    '!**/node_modules/**',
    '!./src/reportWebVitals.js',
  ],
  coverageDirectory: './coverage/',
  coverageReporters: ['text', 'lcov'],
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testPathIgnorePatterns: [
    'node_modules',
    'cypress',
    'dist',
  ],
};
