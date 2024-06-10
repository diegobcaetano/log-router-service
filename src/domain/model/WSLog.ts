export type IPAddress = `${number}.${number}.${number}.${number}`;
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface WSLog {
    ip: IPAddress;
    date: Date;
    method: HTTPMethod;
    url: string;
    status: number;
}