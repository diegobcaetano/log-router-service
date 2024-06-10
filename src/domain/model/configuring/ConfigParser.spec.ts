/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientConfigParse } from './ConfigParser';
import type { PathLike } from 'node:fs';

let readFile: (path: PathLike, ...optionalParams: any[]) =>  Promise<string>;


beforeEach( () => {
    readFile = () => {
        return Promise.resolve(JSON.stringify({
            "usecase": {
                "input": {
                    "type": "webserver-log",
                    "opts": {
                        "from": {
                            "type": "s3",
                            "name": "my-s3-bucket"
                        },
                        "compression-type": "tar.zip"
                    }
                },
                "output": {
                    "type": "json",
                    "opts": {
                        "to": {
                            "host": "localhost",
                            "port": 3002,
                            "type": "tcp-server"
                        }
                    }
                }
            },
            "filters": [
                {
                    "target": "status",
                    "operator": "equals",
                    "content": "500"
                }
            ]
        }));
    }
});


test(`Load a JSON config successfuly`, async () => {
    const configParser = new ClientConfigParse(readFile);
    const result = (await configParser.load(``)).parse();
    expect(result.filters).toBeDefined();
    expect(result.usecase).toBeDefined();
    expect(result.usecase.input.type).toBe("webserver-log");
});

test(`Fail to load because load() is not called`, async () => {
    const configParser = new ClientConfigParse(readFile);
    expect(() => configParser.parse()).toThrow(Error);
});