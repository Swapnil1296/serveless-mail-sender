import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

const LINKEDIN_PDF = path.join(
  process.cwd(),
  'public',
  'resumes',
  'Linkedin-profile.pdf'
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!fs.existsSync(LINKEDIN_PDF)) {
      return res.status(200).json({ text: null, source: 'none' });
    }

    const buffer = fs.readFileSync(LINKEDIN_PDF);
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();

    const text = (result?.text || '').trim().slice(0, 2000);
    return res.status(200).json({ text: text || null, source: 'linkedin-pdf' });
  } catch (error) {
    console.error('[parse-linkedin-pdf]', error);
    return res.status(200).json({ text: null, source: 'error' });
  }
}
