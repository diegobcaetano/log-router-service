import { ClientConfigParse } from '../domain/model/configuring/ConfigParser';
import type { Config } from '../domain/model/configuring/ConfigFile';
import { readFile } from 'fs/promises';

let cachedConfig: Config;

export async function getConfig() {
    if (!cachedConfig) {
        const configPath = process.cwd() + `/cfg/server.config.json`;
        const configData = await new ClientConfigParse(readFile).load(configPath);
        cachedConfig = configData.parse();
    }
    return cachedConfig;
}
