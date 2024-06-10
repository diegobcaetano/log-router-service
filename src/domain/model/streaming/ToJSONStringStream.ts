import { Transform } from 'stream';
import type { DataTransformStream } from './DataTransformStream';
import type { StreamSerialization } from '../serializing/StreamSerialization';

export class ToJSONStringStream<T> extends Transform implements DataTransformStream {

    private streamSerialization: StreamSerialization<T, string>
    
    constructor(streamEncoder: StreamSerialization<T, string>) {

        super({ objectMode: true });
        this.streamSerialization = streamEncoder;
    }

    _transform(chunk: T, encoding: string, callback: (error?: Error, data?: unknown[]) => void) {
    
        if(this.push(this.streamSerialization.serialize(chunk))) {
            callback();
        }else {
            callback(new Error("ToJSONStringStream can not push data to the next stream"));
        }
        
    }
}

export default ToJSONStringStream;
