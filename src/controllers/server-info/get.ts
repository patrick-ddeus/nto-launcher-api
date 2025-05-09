import { Request, Response } from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const serverInfo = process.env.SERVER_INFO_FILE;

export default async (req: Request, res: Response) => {
  try {
    const filePath = path.join(process.cwd(), serverInfo);
    const json = JSON.parse(await readFile(filePath, 'utf-8'));

    const now = Date.now();
    const EXPIRES_IN = 1000 * 60 * 30;
    const linkExpirado =
      !json.last_resolved_at || now - json.last_resolved_at > EXPIRES_IN;

    if (linkExpirado) {
      json.download_link = json.original_mediafire_link;
      json.last_resolved_at = now;
      await writeFile(filePath, JSON.stringify(json, null, 2));
    }

    res.json(json);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Arquivo JSON não encontrado:',path.join(process.cwd(), serverInfo));
      res.status(404).json({ error: 'Arquivo de versão não encontrado. Certifique-se de ter criado um através do endpoint de POST' });
      return;
    }
    console.error('Erro ao ler o arquivo JSON:', error);
    res.status(500).json({ error: `Erro ao carregar os dados ` });
  }
};
