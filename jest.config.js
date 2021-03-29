module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/**/*.js',
    '!**/cypress/**',
    '!**/node_modules/**',
    '!./src/reportWebVitals.js',
    '!./src/index.js',
  ],
  coverageDirectory: './coverage/',
  coverageReporters: ['text', 'lcov'],
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testPathIgnorePatterns: [
    'node_modules',
    'cypress',
    'dist',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg|webm)$': '<rootDir>/src/__mocks__/imageMock.js',
  },
  moduleDirectories: [
    'node_modules',
    './src',
  ],
};
