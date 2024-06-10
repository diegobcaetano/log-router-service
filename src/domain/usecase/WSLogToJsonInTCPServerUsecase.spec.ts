import type { Config } from '../model/configuring/ConfigFile';
import { WSLogToJsonInTcpServerUsecase } from './WSLogToJsonInTCPServerUsecase';

test('process throws error for invalid input type', () => {
    const usecase = new WSLogToJsonInTcpServerUsecase();
    const invalidConfig = { usecase: { input: { type: 'invalid-type' } } };

    expect(() => usecase.process(invalidConfig as Config)).toThrow(Error);
});