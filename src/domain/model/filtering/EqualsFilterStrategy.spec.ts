import { EqualsFilterStrategy } from './EqualsFilterStrategy';

test('Filter returns false because the status is different than what is expected',  () => {
    const target = `status`;
    const content = 200;

    const filterStrategy = new EqualsFilterStrategy(target, content);
    const result = filterStrategy.filter({foo: `bar`, status: 400});
    expect(result).toBe(false);
});

test('Filter returns true because the status is equals what is expected',  () => {
    const target = `status`;
    const content = 200;

    const filterStrategy = new EqualsFilterStrategy(target, content);
    const result = filterStrategy.filter({foo: `bar`, status: 200});
    expect(result).toBe(true);
});

test('Filter returns true because the status is equals what is expected, even when the content type is diffent',  () => {
    const target = `status`;
    const content = "200";

    const filterStrategy = new EqualsFilterStrategy(target, content);
    const result = filterStrategy.filter({foo: `bar`, status: 200});
    expect(result).toBe(true);
});

test('Filter throws an Exception because the property does not exists in the object',  () => {
    const target = `dummy`;
    const content = `value`;

    const filterStrategy = new EqualsFilterStrategy(target, content);
    expect(() => filterStrategy.filter({foo: `bar`, status: 200})).toThrow(Error);
});