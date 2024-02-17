/** @type {import('jest').Config} */
const config = {
  rootDir: '../',
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  coverageDirectory: 'storage/coverage'
};

export default config;
