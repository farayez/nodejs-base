import { jest } from '@jest/globals';
const ITEM = { id: 12345 };

jest.unstable_mockModule('../../persistence', () => ({
    default: {
        removeItem: jest.fn(),
        getItem: jest.fn(),
    }
}));

const { default: db } = await import('../../persistence');
const { default: deleteItem } = await import('../../routes/deleteItem.js');

test('it removes item correctly', async () => {
    const req = { params: { id: 12345 } };
    const res = { sendStatus: jest.fn() };

    await deleteItem(req, res);

    expect(db.removeItem.mock.calls.length).toBe(1);
    expect(db.removeItem.mock.calls[0][0]).toBe(req.params.id);
    expect(res.sendStatus.mock.calls[0].length).toBe(1);
    expect(res.sendStatus.mock.calls[0][0]).toBe(200);
});
