import { WSLogToJsonInTcpServerUsecase } from "../usecase/WSLogToJsonInTCPServerUsecase";
import type { Config, UsecaseDefinition } from "./configuring/ConfigFile";
import type { Readable } from 'stream';

export interface Usecase {
    setReadableStream(readableStream: Readable): this;
    process(config: Config): void;
}

export interface UsecaseConstructor {
    build(): Usecase
}

export class UsecaseFactory implements UsecaseConstructor {

    private usecaseDefinition: UsecaseDefinition;
    
    constructor(usecaseDefinition: UsecaseDefinition) {
        this.usecaseDefinition = usecaseDefinition;
    }
    
    build(): Usecase {

        if (
            this.usecaseDefinition.input.type === `webserver-log` 
                && this.usecaseDefinition.output.type === `json`
                && this.usecaseDefinition.output.opts.to.type === `tcp-server`) {
            return new WSLogToJsonInTcpServerUsecase();
        }

        throw new Error("This use case is not available yet");
    }
    
}