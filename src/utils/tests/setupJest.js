// import { jest } from '@jest/globals';
import { syncDatabase } from '#utils/tests/setupTestDatabase.js';
import { default as matchers } from 'jest-extended';
expect.extend(matchers);

afterEach(() => {
    // jest.resetAllMocks(); // Reset mock implementation
    // jest.clearAllMocks(); // Reset mock usage
    // jest.restoreAllMocks(); // Restore original implementation of mock
    // jest.useRealTimers();
});

beforeAll(() => {
    return syncDatabase();
});

expect.extend({
    toContainObject(received, argument) {
        const pass = this.equals(
            received,
            expect.arrayContaining([expect.objectContaining(argument)]),
        );

        if (pass) {
            return {
                message: () =>
                    `expected ${this.utils.printReceived(
                        received,
                    )} not to contain object ${this.utils.printExpected(
                        argument,
                    )}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${this.utils.printReceived(
                        received,
                    )} to contain object ${this.utils.printExpected(argument)}`,
                pass: false,
            };
        }
    },
});
