import type { WritableOutputStreamPort } from "../../port/WritableOutputStreamPort";
import type { DataTransformStream } from "./DataTransformStream";
import { Transform } from 'stream';

export class WriteToOutputStream extends Transform implements DataTransformStream {

    private destination: WritableOutputStreamPort;
    private buffer: string[] = [];

    constructor(outputStreamClient: WritableOutputStreamPort) {
        super();
        this.destination = outputStreamClient;
    }

    error(err: Error): void {
        console.error('Erro no WritableStream:', err);
    }

    private async flush(): Promise<void> {
        while (this.buffer.length > 0) {
            const chunk = this.buffer.shift();
            try {
                await this.destination.write(chunk as string);
            } catch (err) {
                this.error(err as Error);
                return;
            }
        }
    }

    close(): Promise<void> {
        this.flush();
        return new Promise(() => { })
    }

    destroy(err?: Error | undefined): this {
        this.error(err as Error);
        this.destination.destroy(err);
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    write(chunk: string, encoding?: unknown, callback?: Function): boolean {
        const result = this.destination.write(chunk);
        if (callback !== undefined) {
            callback();
        }
        return result;
    }
}