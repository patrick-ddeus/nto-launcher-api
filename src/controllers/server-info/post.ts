import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import path from 'path';
const serverInfo = process.env.serverInfoFile

export default async (req: Request, res: Response) => {
  try {
    const filePath = path.join(process.cwd(), serverInfo);
    const data = req.body;
    data.last_update = new Date();

    if (!data) {
      res.status(400).json({ error: 'Nenhum dado fornecido' });
      return
    }

    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(200).json({ message: 'Dados salvos com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).json({ error: 'Erro ao salvar os dados' });
  }
};
