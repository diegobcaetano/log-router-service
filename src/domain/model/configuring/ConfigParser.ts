/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from "./ConfigFile";
import { ConfigSchema } from './ConfigSchema';
import type { PathLike } from 'node:fs';

export interface ConfigParser {

    load(path: string): Promise<this>;
    parse(): Config;
}

export class ClientConfigParse implements ConfigParser {
    
    private jsonString: string = '';
    private readFileHandler: (path: PathLike, ...optionalParams: any[]) =>  Promise<string>;

    constructor( readFileHandler: (path: PathLike, ...optionalParams: any[]) =>  Promise<string>) {
        this.readFileHandler = readFileHandler;
    }
    
    async load(path: string): Promise<this> {
        this.jsonString = await this.readFileHandler(path, 'utf-8'); 
        return this;
    }

    parse(): Config {

        if (this.jsonString === '') {
            throw Error("Unable to load the config file. Be sure you load the file using the method load()");
        }

        const json = JSON.parse(this.jsonString);
        return ConfigSchema.parse(json);
    }
}