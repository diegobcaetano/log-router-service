import { tcpServer } from "./tcp-server/tcp-server";
import { startPolling } from "./worker/s3-get-worker";

interface S3Params {
    Bucket: string;
    Prefix?: string;
}

function startS3PollingService() {
    const params: S3Params = {
        Bucket: process.env.S3_BUCKET_NAME || ``,
        Prefix: process.env.S3_BUCKET_PREFIX,
    };
    startPolling(params);
}

function startTcpServer() {
    const PORT = Number(process.env.TCP_SERVER_PORT) || 3000;
    const HOST = process.env.TCP_SERVER_HOST || 'localhost';
    tcpServer.listen(PORT, HOST, () => {
        console.log(`TCP Server started at: ${HOST}:${PORT}`);
    });
}

switch (process.env.DATA_SOURCE) {
    case `s3`:
        startS3PollingService();
        break;
    case `tcp-client`:
    default:
        startTcpServer();
}