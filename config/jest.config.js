/** @type {import('jest').Config} */
const config = {
    rootDir: '../src/',
    testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
    testEnvironment: 'jest-environment-node',
    // verbose: true,
    forceExit: true,
    clearMocks: true,
    // resetMocks: true,
    restoreMocks: true,
    transform: {},
    coverageDirectory: 'storage/coverage',
    setupFilesAfterEnv: ['<rootDir>/utils/tests/setupJest.js'],
};

export default config;
