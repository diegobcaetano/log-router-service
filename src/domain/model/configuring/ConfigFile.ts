type InputType = 'webserver-log' | 'json';
type OutputType = 'webserver-log' | 'json';

export interface S3Connector {
    type: 's3';
    name: string;
}

export interface TcpServerConnector {
    type: 'tcp-server';
    host: string;
    port: number;
}

type Connector = S3Connector | TcpServerConnector;

export interface InputOptions {
    from: Connector;
    'compression-type'?: 'tar.zip' | 'gzip' | 'none';
}

export interface OutputOptions {
    to: Connector;
}

export interface Input {
    type: InputType;
    opts: InputOptions;
}

export interface Output {
    type: OutputType;
    opts: OutputOptions;
}

export interface UsecaseDefinition {
    input: Input;
    output: Output;
}

export interface FilterRule {
    target: string;
    operator: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'in';
    content: string | number;
}

export interface Config {
    usecase: UsecaseDefinition;
    filters: FilterRule[];
}