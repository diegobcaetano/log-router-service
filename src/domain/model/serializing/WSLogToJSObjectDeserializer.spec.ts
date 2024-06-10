import { WSLogToJSObjectDeserializer } from './WSLogToJSObjectDeserializer';

test('deserialize parses a valid buffer list', () => {
    const rawList = [Buffer.from('127.0.0.1 - - [01/Jul/2024:17:20:00 +0000] "GET /api/data HTTP/1.1" 200 1024')];
    const deserializer = new WSLogToJSObjectDeserializer();
    const logs = deserializer.deserialize(rawList);

    expect(logs.length).toBe(1);
    expect(logs[0]).toEqual({
        ip: '127.0.0.1',
        date: expect.any(Date),
        method: 'GET',
        url: '/api/data',
        status: 200
    });
});

test('deserialize handles invalid log message', () => {
    
    jest.spyOn(console, 'error');

    const rawList = [
        Buffer.from('127.0.0.1 - - [invalid message] "GET /api/data HTTP/1.1" 200 1024'),
        Buffer.from('10.0.0.1 - - [01/Jul/2024:17:20:00 +0000] "POST /users HTTP/1.1" 201 512')
    ];
    const deserializer = new WSLogToJSObjectDeserializer();
    const logs = deserializer.deserialize(rawList);

    expect(logs.length).toBe(1);
    expect(logs[0]).toEqual({
        ip: '10.0.0.1',
        date: expect.any(Date),
        method: 'POST',
        url: '/users',
        status: 201
    });
    expect(console.error).toHaveBeenCalled();
});

test('deserialize handles empty buffer list', () => {
    const deserializer = new WSLogToJSObjectDeserializer();
    const logs = deserializer.deserialize([]);

    expect(logs.length).toBe(0);
});
