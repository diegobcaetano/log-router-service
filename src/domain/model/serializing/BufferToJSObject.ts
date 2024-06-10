import type { StreamDeserialization } from './StreamDeserialization';

export class BufferToJSObject implements StreamDeserialization<object> {

    protected buffer: Buffer = Buffer.alloc(0);

    setBuffer(buffer: Buffer): this {
        this.buffer = Buffer.concat([this.buffer, buffer])
        return this
    }

    split(delimiter: string): Buffer[] {
        const parts: Buffer[] = [];
        const delimiterBuffer = Buffer.from(delimiter);
        const delimiterLength = delimiterBuffer.length;
        let start = 0;
        let index;

        while ((index = this.buffer.indexOf(delimiterBuffer, start)) !== -1) {
            parts.push(this.buffer.subarray(start, index));
            start = index + delimiterLength;
        }

        if (start < this.buffer.length) {
            parts.push(this.buffer.subarray(start));
        }

        return parts;
    }

    deserialize(rawList: Buffer[]): object[] {
        return rawList.flatMap(rawObject => {
            try {
                return JSON.parse(rawObject.toString())
            } catch (e) {
                console.error(e)
                return []
            }
        })
    }
}

export default BufferToJSObject;
