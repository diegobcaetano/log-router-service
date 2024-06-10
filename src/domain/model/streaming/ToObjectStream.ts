import { Transform } from 'stream';
import type { DataTransformStream } from './DataTransformStream';
import type { StreamDeserialization } from '../serializing/StreamDeserialization';

export class ToObjectStream<T> extends Transform implements DataTransformStream {

    private streamDeserialization: StreamDeserialization<T>
    private delimiter: string;

    constructor(
        streamEncoder: StreamDeserialization<T>,
        delimiter: string = '\n') {

        super({ objectMode: true });
        this.streamDeserialization = streamEncoder;
        this.delimiter = delimiter;
    }

    _transform(chunk: Buffer, encoding: string, callback: (error?: Error, data?: unknown[]) => void) {

        try {
            this.streamDeserialization.setBuffer(chunk);
            const stringRecords = this.streamDeserialization.split(this.delimiter);
            const deserializedRecords = this.streamDeserialization.deserialize(stringRecords);
            deserializedRecords.forEach(record => this.push(record));
            callback();
        } catch (err) {
            if (err instanceof Error) {
                callback(err);
            } else {
                throw new Error(`Unkown error type in ToObjectStream:\n ${err}`);
            }
        }
    }
}

export default ToObjectStream;
