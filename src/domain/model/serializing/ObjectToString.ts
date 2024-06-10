import type { StreamSerialization } from "./StreamSerialization";

export class ObjectToString implements StreamSerialization<object, string> {
    
    serialize(record: object): string {
        return JSON.stringify(record);
    }

}