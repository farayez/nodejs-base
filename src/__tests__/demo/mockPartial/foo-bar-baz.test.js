import { jest } from '@jest/globals';
const originalModule = await import('./foo-bar-baz.js');

jest.unstable_mockModule('./foo-bar-baz.js', () => {
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
} = await import('./foo-bar-baz.js');

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
