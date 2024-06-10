import type { StreamDeserialization } from './StreamDeserialization';
import BufferToJSObject from './BufferToJSObject';
import type { WSLog, IPAddress, HTTPMethod } from '../WSLog';

export class WSLogToJSObjectDeserializer extends BufferToJSObject implements StreamDeserialization<WSLog> {

    deserialize(rawList: Buffer[]): WSLog[] {
        return rawList
            .flatMap(this.parse)
            .filter(record => record !== null) as WSLog[];
    }

    private parse(buffer: Buffer): WSLog | null {

        const log = buffer.toString('utf-8');
        const logRegex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(\d{2})\/([A-Za-z]{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+-])(\d{3,4})\] "(\w+) ([^"]+)" (\d{3}) (\d+)/;

        const match = log.match(logRegex);

        if (!match) {
            console.error(`Invalid Log Message: ${log}`);
            return null
        }

        const ip = match[1] as IPAddress;
        const day = match[2].padStart(2, '0');
        const month = match[3];
        const year = match[4];
        const hours = match[5].padStart(2, '0');
        const minutes = match[6];
        const seconds = match[7];
        const timeZoneOffset = match[8];

        const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneOffset}`;

        const date = new Date(dateString);

        return {
            ip,
            date,
            method: match[10] as HTTPMethod,
            url: match[11].split(` `)[0],
            status: parseInt(match[12], 10)
        };
    }

}

export default WSLogToJSObjectDeserializer;
