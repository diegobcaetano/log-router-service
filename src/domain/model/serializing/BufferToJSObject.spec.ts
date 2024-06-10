import {BufferToJSObject} from './BufferToJSObject'

test('Splits a single JSON string',  () => {
    const stringToJSObjectEncoder = new BufferToJSObject();
    const originalString = '{"hello": "world"}';
    const receivedChunk = Buffer.from(originalString, 'utf8');
    stringToJSObjectEncoder.setBuffer(receivedChunk);
    const result = stringToJSObjectEncoder.split('\\n');
    expect(result.length).toBe(1);
    expect(result[0].toString()).toBe(originalString);
});

test('Splits more than one JSON string',  () => {
    const stringToJSObjectEncoder = new BufferToJSObject();
    const originalString = '{"hello": "world"}\\n{"hello": "city"}';
    const receivedChunk = Buffer.from(originalString, 'utf8');
    stringToJSObjectEncoder.setBuffer(receivedChunk);
    const result = stringToJSObjectEncoder.split('\\n')
    expect(result.length).toBe(2);
    expect(result[0].toString()).toBe(`{"hello": "world"}`);
    expect(result[1].toString()).toBe(`{"hello": "city"}`);
});

test('Encode only one JSON string',  () => {
    const stringToJSObjectEncoder = new BufferToJSObject();
    const originalString = '{"hello": "world"}';
    const result = stringToJSObjectEncoder.deserialize([Buffer.from(originalString)]);
    const jsObject = result[0] as { hello: string };
    expect(jsObject[`hello`]).toBe(`world`)
});