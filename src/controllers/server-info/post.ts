import { Request, Response } from 'express';
import axios from 'axios';

const GITHUB_OWNER = 'patrick-ddeus';
const GITHUB_REPO = 'nto-launcher-api';
const FILE_PATH = 'client_info.json';
const BRANCH = 'main';

export default async (req: Request, res: Response) => {
  const githubToken = process.env.GITHUB_TOKEN;
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;

  try {
    const data = req.body;
    if (!data) {
      res.status(400).json({ error: 'Nenhum dado fornecido' });
      return
    }

    data.last_update = new Date();

    const { data: fileData } = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github+json',
      },
      params: { ref: BRANCH },
    });

    const updatedContent = Buffer.from(JSON.stringify(data, null, 2)).toString(
      'base64'
    );

    await axios.put(
      apiUrl,
      {
        message: 'update client_info.json via API',
        content: updatedContent,
        sha: fileData.sha,
        branch: BRANCH,
      },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    res.status(200).json({ message: 'Arquivo atualizado com sucesso' });
    return;
  } catch (error) {
    console.error('Erro ao salvar os dados:', error?.response?.data || error);
    res.status(500).json({ error: 'Erro ao salvar os dados' });
    return;
  }
};
