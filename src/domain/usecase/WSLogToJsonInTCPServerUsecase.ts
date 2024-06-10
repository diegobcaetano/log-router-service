import type { Readable } from "stream";
import type { Config, TcpServerConnector } from "../model/configuring/ConfigFile";
import type { Usecase } from "../model/Usecase";
import ToObjectStream from "../model/streaming/ToObjectStream";
import WSLogToJSObjectDeserializer from "../model/serializing/WSLogToJSObjectDeserializer";
import { WSLogFilter } from "../model/filtering/WSLogFilter";
import { FilterRecordStream } from "../model/streaming/FilterRecordStream";
import ToJSONStringStream from "../model/streaming/ToJSONStringStream";
import { ObjectToString } from "../model/serializing/ObjectToString";
import { WriteToOutputStream } from "../model/streaming/WriteToOutputStream";
import { GenericWritableStreamClient } from "../../infrastructure/stream-client/GenericWritableStreamClient";
import * as net from 'node:net';
import { FilterStrategyFactory } from "../model/filtering/FilterStrategy";

export class WSLogToJsonInTcpServerUsecase implements Usecase {

    readableStream: Readable | undefined;

    setReadableStream(readableStream: Readable): this {

        this.readableStream = readableStream;
        return this;
    }

    process(config: Config) {

        this.validateConfig(config);
        const destination = config.usecase.output.opts.to as TcpServerConnector;

        if (this.readableStream === undefined) {
            throw Error(`Readable stream is not defined`);
        }

        const client = net.connect({ host: destination.host, port: destination.port });

        this.readableStream.pipe(new ToObjectStream(new WSLogToJSObjectDeserializer()))
            .pipe(new FilterRecordStream(new WSLogFilter(new FilterStrategyFactory(), config.filters)))
            .pipe(new ToJSONStringStream(new ObjectToString()))
            .pipe(new WriteToOutputStream(new GenericWritableStreamClient(client)));
    }

    private validateConfig(config: Config) {

        if (config === undefined) {
            throw Error(`Config is not defined`);
        }

        if (config.usecase.input.type !== 'webserver-log') {
            throw Error("Invalid Configuration: Input should be `webserver-log` for this usecase");
        }

        if (config.usecase.output.type !== 'json') {
            throw Error("Invalid Configuration: Output data format should be JSON for this usecase");
        }

        if (config.usecase.output.opts.to.type !== 'tcp-server') {
            throw Error("Invalid Configuration: Output destination should be `tcp-server` for this usecase");
        }
    }
}