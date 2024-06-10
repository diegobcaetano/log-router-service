import type { WritableOutputStreamPort } from "../../domain/port/WritableOutputStreamPort";
import type {Socket} from 'node:net';
import type {EventEmitter} from 'node:events';

export class GenericWritableStreamClient implements WritableOutputStreamPort {

    private connection: Socket

    constructor(connection: Socket) {
        this.connection = connection
    }
    
    write(record: string | Buffer | Uint8Array): boolean {
        return this.connection.write(record);
    }

    getConnection(): EventEmitter {
        return this.connection;
    }

    destroy(error?: Error | undefined): EventEmitter {
        return this.connection.destroy(error);
    }
    
}