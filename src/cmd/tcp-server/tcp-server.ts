import net from 'net';
import { UsecaseFactory } from '../../domain/model/Usecase';
import { getConfig } from '../../helper/configHelper';

export const tcpServer = net.createServer(async (socket: net.Socket) => {
  
  console.log(`A new client has been conected: ${socket.address()}`);
  const config = await getConfig();
  const usecase = new UsecaseFactory(config.usecase).build();
  usecase.setReadableStream(socket).process(config);
});
