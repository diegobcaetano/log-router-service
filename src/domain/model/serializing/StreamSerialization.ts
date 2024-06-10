export interface StreamSerialization<T, D> {
    serialize(record: T): D
}