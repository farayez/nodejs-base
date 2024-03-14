process.loadEnvFile('.env.test');

/** @type {import('jest').Config} */
const config = {
    rootDir: '../',
    testRegex: '((\\.|/)foreign\\.(test|spec))\\.[jt]sx?$',
    testEnvironment: 'jest-environment-node',
    verbose: true,
    forceExit: true,
    clearMocks: true,
    // resetMocks: true,
    restoreMocks: true,
    transform: {},
    detectOpenHandles: true,
    forceExit: true,
    coverageDirectory: 'storage/coverage',
    setupFilesAfterEnv: ['<rootDir>/utils/tests/setupJest.js'],
};

export default config;
