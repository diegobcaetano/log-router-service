import type {EventEmitter} from 'node:events'

export interface WritableOutputStreamPort {
    write(record: string | Buffer | Uint8Array): boolean
    getConnection(): EventEmitter
    destroy(error?: Error | undefined): EventEmitter
}