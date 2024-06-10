import { Duplex } from 'stream';

function createTestDuplex() {
    const duplexStream = new Duplex({
        read() { },
        write(chunk, encoding, callback) {
            this.push("Hello City");
            callback();
        }
    });

    return duplexStream;
}

test('DuplexStream should produce expected output from the second push',  done => {
    
    const expectedOutput = 'Hello, world!';
    const duplexStream = createTestDuplex();
    let actualOutput = '';
    duplexStream.on('data', chunk => {
        actualOutput += chunk;
    });

    const timeout = setTimeout(() => {

        done.fail('Timed out waiting for "end" event');
    }, 1000);

    duplexStream.on('end', () => {
        clearTimeout(timeout);
        done();
        expect(actualOutput).toBe(expectedOutput);
    });

    duplexStream.push("Hello, world!");
    duplexStream.push(null);
});
