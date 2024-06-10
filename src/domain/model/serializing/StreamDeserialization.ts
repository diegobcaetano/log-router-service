export interface StreamDeserialization<T> {
    setBuffer(buffer: Buffer): this;
    split(delimiter: string): Buffer[]
    deserialize(rawList: Buffer[]): T[]
}

