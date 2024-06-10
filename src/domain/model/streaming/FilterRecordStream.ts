import type { DataTransformStream } from "./DataTransformStream";
import { Transform } from 'stream';
import type { StreamFilter } from "../filtering/StreamFilter";

export class FilterRecordStream<T> extends Transform implements DataTransformStream {

    private streamFilter: StreamFilter<T>;

    constructor(streamFilter: StreamFilter<T>) {
        super({ objectMode: true });

        this.streamFilter = streamFilter;   
    }
    
    _transform(record: T, encoding: string, callback: (error?: Error, data?: unknown[]) => void) {
        if (this.streamFilter.getRules().length == 0) {
            throw Error(`Rules not defined to filter records`);
        }

        if (this.streamFilter.filter(record)) {
            const result = this.push(record);
            if (!result) {
                console.error(`Failing to push from the FilterRecordStream to next one`);
            } 
        }
        callback();
    }
}