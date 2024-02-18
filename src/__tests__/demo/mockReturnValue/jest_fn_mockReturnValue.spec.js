import { jest } from '@jest/globals';
const myMock = jest.fn();

describe('before mocking return value', () => {
    test('it does not return mocked value', async () => {
        expect(myMock()).toBe(undefined);
    });
})

describe('after mocking return value', () => {
    beforeEach(() => {
        myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
    })

    test('it returns mocked value', async () => {
        expect(myMock()).toBe(10);
        expect(myMock()).toBe('x');
        expect(myMock()).toBe(true);
        expect(myMock()).toBe(true);
    });
})
