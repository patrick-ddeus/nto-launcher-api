import { Request, Response } from 'express';
import { readFile } from 'fs/promises';
import path from 'path';

const serverInfo = process.env.serverInfoFile

export default async (req: Request, res: Response) => {
  try {
    const filePath = path.join(process.cwd(), serverInfo);
    console.log("🚀 ~ filePath:", filePath)
    const fileContent = await readFile(filePath, 'utf-8');
    const emails = JSON.parse(fileContent);

    res.json(emails);
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
    res.status(500).json({ error: 'Erro ao carregar os dados' });
  }
};
