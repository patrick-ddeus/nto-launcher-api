import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import { indexRouter } from './routes';
import { createServer } from 'node:http';

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

httpServer.listen(port, () =>
  console.log(`Aplicação inicada na porta ${port}`)
);
