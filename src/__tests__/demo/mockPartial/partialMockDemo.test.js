import { jest } from '@jest/globals';
const originalModule = await import('./partialMockDemo.js');

jest.unstable_mockModule('./partialMockDemo.js', () => {
    //Mock the default export and named exports 'mockableFoo', 'mockableBar'
    return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => 'mocked baz'),
        mockableFoo: 'mocked foo',
        mockableBar: jest.fn((number) => 'mocked bar ' + number),
    };
});

const {
    default: defaultExport,
    foo,
    mockableFoo,
    bar,
    mockableBar,
} = await import('./partialMockDemo.js');

test('should work without mock', () => {
    expect(originalModule.default()).toBe('baz');
    expect(originalModule.foo).toBe('foo');
    expect(originalModule.mockableFoo).toBe('foo');
    expect(originalModule.bar(3)).toBe('bar 3');
    expect(originalModule.mockableBar(4)).toBe('bar 4');
});

test('should do a partial mock', () => {
    const defaultExportResult = defaultExport();
    expect(defaultExportResult).toBe('mocked baz');
    expect(defaultExport).toHaveBeenCalled();

    expect(foo).toBe('foo');
    expect(mockableFoo).toBe('mocked foo');
    expect(bar(3)).toBe('bar 3');
    expect(mockableBar(4)).toBe('mocked bar 4');

    expect(mockableBar.mock.calls).toHaveLength(1);
    expect(mockableBar.mock.calls[0][0]).toBe(4);
    expect(mockableBar.mock.results[0].value).toBe('mocked bar 4');
});
