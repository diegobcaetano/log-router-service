import { z } from 'zod';

const InputTypeSchema = z.enum(['webserver-log', 'json']);
const OutputTypeSchema = z.enum(['webserver-log', 'json']);

const S3ConnectorSchema = z.object({
    type: z.literal('s3'),
    name: z.string(),
});

const TcpServerConnectorSchema = z.object({
    type: z.literal('tcp-server'),
    host: z.string(),
    port: z.number(),
});

const ConnectorSchema = z.union([S3ConnectorSchema, TcpServerConnectorSchema]);

const InputOptionsSchema = z.object({
    from: ConnectorSchema,
    'compression-type': z.enum(['tar.zip', 'gzip', 'none']).optional(),
});

const OutputOptionsSchema = z.object({
    to: ConnectorSchema,
});

const InputSchema = z.object({
    type: InputTypeSchema,
    opts: InputOptionsSchema,
});

const OutputSchema = z.object({
    type: OutputTypeSchema,
    opts: OutputOptionsSchema,
});

const UsecaseDefinitionSchema = z.object({
    input: InputSchema,
    output: OutputSchema,
});

const FilterRuleSchema = z.object({
    target: z.string(),
    operator: z.enum(['equals', 'notEquals', 'greaterThan', 'lessThan']),
    content: z.union([z.string(), z.number()]),
});

export const ConfigSchema = z.object({
    usecase: UsecaseDefinitionSchema,
    filters: z.array(FilterRuleSchema),
});

export type Config = z.infer<typeof ConfigSchema>;
