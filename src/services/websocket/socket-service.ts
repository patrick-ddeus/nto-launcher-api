import { Server, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';

export class SocketService {
  private io: Server;
  public clients = new Map<string, string>();

  constructor() {}

  public initialize(httpServer: HTTPServer): void {
    this.io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connection', (socket: Socket) => {
      console.log(`Socket conectado: ${socket.id}`);

      socket.on('register', (clientId: string) => {
        socket.join(clientId?.toString());

        console.log(`Cliente registrado com ID: ${clientId}`);
        if (clientId) this.clients.set(clientId.toString(), socket.id);
      });

      socket.on('disconnect', () => {
        console.log(`Socket desconectado: ${socket.id}`);
        for (const [clientId, socketId] of this.clients.entries()) {
          if (socketId === socket.id) {
            this.clients.delete(clientId);
            break;
          }
        }
      });
    });
  }

  public notifyClient(clientId: number, message: string): void {
    const socketId = this.clients.get(clientId?.toString());
    if (socketId) {
      this.io.to(clientId?.toString()).emit('update_notification', true);
    }
  }

  public notifyLoadingPayment(
    clientId: number,
    message: string | object
  ): void {
    const socketId = this.clients.get(clientId?.toString());
    if (socketId) {
      this.io.to(clientId?.toString()).emit('paymentNotification', message);
    }
  }
}
