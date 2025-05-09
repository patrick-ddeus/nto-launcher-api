import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import { indexRouter } from './routes';
import { createServer } from 'node:http';
import { SocketService } from './services/websocket/socket-service';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('common'));
app.use(indexRouter);

const port = process.env.PORT || 3000;

const httpServer = createServer(app);

export const webSocket = new SocketService();
webSocket.initialize(httpServer);

httpServer.listen(port, () =>
  console.log(`Aplicação inicada na porta ${port}`)
);
