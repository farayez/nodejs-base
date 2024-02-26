const { default: getError } = await import('../errorTest.js');

describe('errorTest controller should work properly', () => {
    it('getError method should throw generic error', async () => {
        await expect(async () => await getError()).rejects.toThrow(Error);
        await expect(async () => await getError()).rejects.toThrow(
            'This is a generic error',
        );
    });
});
