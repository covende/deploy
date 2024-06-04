module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverageFrom: [
  //   '<rootDir>/src/**/*.{ts,tsx}',
  //   '!<rootDir>/src/main/**/*',
  //   '!<rootDir>/src/**/index.ts',
  //   '!**/*.d.ts'
  // ],
  // coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./jest-setup.js'],
  // testPathIgnorePatterns: [
  //   '<rootDir>/node_modules/',
  //   '<rootDir>/src/main/test/cypress'
  // ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(js|jsx)$': 'babel-jest',
  },
  // moduleNameMapper: {
  //   '@/(.*)': '<rootDir>/src/$1',
  //   '\\.scss$': 'identity-obj-proxy'
  // }
};
