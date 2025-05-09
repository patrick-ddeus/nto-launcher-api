import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import path from 'path';
import { webSocket } from '../../app';
const serverInfo = process.env.serverInfoFile;

export default async (req: Request, res: Response) => {
  try {
    const filePath = path.join(process.cwd(), serverInfo);
    const data = req.body;

    if (!data) {
      res.status(400).json({ error: 'Nenhum dado fornecido' });
      return;
    }

    data.last_update = new Date();

    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    webSocket.notifyClient(1, 'true');
    res.status(200).json({ message: 'Dados salvos com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).json({ error: 'Erro ao salvar os dados' });
  }
};
