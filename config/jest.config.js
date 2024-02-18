/** @type {import('jest').Config} */
const config = {
  rootDir: '../',
  testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
  testEnvironment: 'jest-environment-node',
  // verbose: true,
  forceExit: true,
  clearMocks: true,
  // resetMocks: true,
  restoreMocks: true,
  transform: {},
  coverageDirectory: 'storage/coverage'
};

export default config;
