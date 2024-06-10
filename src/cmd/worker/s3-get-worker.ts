import { S3 } from 'aws-sdk';
import { ClientConfigParse } from '../../domain/model/configuring/ConfigParser';
import { UsecaseFactory } from '../../domain/model/Usecase';
import { readFile } from 'node:fs/promises';

const s3 = new S3();
const POLLING_INTERVAL = 30000; // 30 seconds

interface S3Params {
    Bucket: string;
    Prefix?: string;
}

const processedFiles = new Set<string>();

async function listObjects(bucket: string, prefix?: string): Promise<S3.ObjectList> {
    const params: S3.ListObjectsV2Request = {
        Bucket: bucket,
        Prefix: prefix,
    };
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents || [];
}

async function streamAndUnzipFromS3(bucket: string, key: string) {
    try {

        const s3Stream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();

        //TODO: this must be done once, not every new polling
        const config = (await new ClientConfigParse(readFile).load(process.cwd() + `/cfg/server.config.json`)).parse();
        const usecase = new UsecaseFactory(config.usecase).build();

        usecase.setReadableStream(s3Stream).process(config);

        console.log(`File ${key} unzip and read successfully`);
    } catch (err) {
        console.error(`Error while unziping or reading the file ${key}:`, err);
    }
}

async function processNewFiles(params: S3Params) {
    try {
        const objects = await listObjects(params.Bucket, params.Prefix);

        for (const obj of objects) {
            if (obj.Key && !processedFiles.has(obj.Key)) {
                await streamAndUnzipFromS3(params.Bucket, obj.Key);
                processedFiles.add(obj.Key);
            }
        }
    } catch (err) {
        console.error('Error while processing new files:', err);
    }
}

export async function startPolling(params: S3Params) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        await processNewFiles(params);
        await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL));
    }
}