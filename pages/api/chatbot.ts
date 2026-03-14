import type { NextApiRequest, NextApiResponse } from 'next';

const PORTFOLIO_CONTEXT = `You are a friendly portfolio assistant for Swapnil Landage, a Full Stack Developer specializing in MERN stack. 
Answer questions concisely (2-4 sentences) about:
- Swapnil: Full Stack Developer, creates digital experiences, frontend & backend expertise
- Skills: React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Tailwind, AWS, Docker
- Projects: SBI General Insurance portal, Alkem Marketplace, Connect2Clinic (healthcare), Ageas Federal Insurance, plus personal tools like Email Sender, Interview Prep, Resume Creator, Naukri Scraper
- Contact: Use the contact form or scroll to the COMMS_LINK section on the page
Be helpful, professional, and match the cyberpunk/tech tone of the site.`;

// Rule-based fallback when no AI is configured
function getRuleBasedReply(message: string): string {
  const m = message.toLowerCase().trim();

  if (/^(hi|hey|hello|sup|yo)/.test(m)) {
    return "Hi! I'm the assistant. Ask me about Swapnil's skills, projects, or how to get in touch.";
  }
  if (/skill|tech|stack|technolog|react|node|mern/.test(m)) {
    return "Swapnil specializes in the MERN stack: React, Next.js, TypeScript, Node.js, Express, MongoDB. He also uses Tailwind, PostgreSQL, AWS, Docker, and tools like Strapi.";
  }
  if (/project|work|experience|built/.test(m)) {
    return "His projects include SBI General Insurance portal, Alkem Marketplace, Connect2Clinic (healthcare), Ageas Federal Insurance, plus tools: Email Sender, Interview Prep Kit, Resume Creator, Naukri Scraper.";
  }
  if (/contact|hire|reach|email|message|get in touch/.test(m)) {
    return "Use the contact form on this page or scroll to COMMS_LINK. You can also download his resume (SYNC_RESUME.pdf button).";
  }
  if (/who|what.*swapnil|about/.test(m)) {
    return "Swapnil Landage is a Full Stack Developer who creates scalable digital experiences. He has expertise in both frontend and backend technologies.";
  }
  if (/resume|cv|download/.test(m)) {
    return "Click the SYNC_RESUME.pdf button on the landing page to download his resume.";
  }

  return "I can help with questions about Swapnil's skills, projects, or contact info. Try asking something like: What are his skills? or How can I contact him?";
}

async function getAIReply(message: string): Promise<string | null> {
  try {
    const apiKey =
      process.env.DEEPSEEK_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.GEMINI_API_KEY;
    if (!apiKey) return null;

    // Prefer DeepSeek (free tier), then OpenAI, then Gemini
    if (process.env.DEEPSEEK_API_KEY) {
      const { default: OpenAI } = await import('openai');
      const client = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com',
      });
      const res = await client.chat.completions.create({
        model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
        messages: [
          { role: 'system', content: PORTFOLIO_CONTEXT },
          { role: 'user', content: message },
        ],
        max_tokens: 200,
        temperature: 0.6,
      });
      return res.choices[0]?.message?.content?.trim() ?? null;
    }

    if (process.env.OPENAI_API_KEY) {
      const { default: OpenAI } = await import('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const res = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: PORTFOLIO_CONTEXT },
          { role: 'user', content: message },
        ],
        max_tokens: 200,
        temperature: 0.6,
      });
      return res.choices[0]?.message?.content?.trim() ?? null;
    }

    if (process.env.GEMINI_API_KEY) {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
        generationConfig: { maxOutputTokens: 200, temperature: 0.6 },
      });
      const result = await model.generateContent([
        PORTFOLIO_CONTEXT,
        message,
      ]);
      return result.response.text()?.trim() ?? null;
    }
  } catch (e) {
    console.warn('[chatbot] AI provider failed:', (e as Error).message);
  }
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const aiReply = await getAIReply(message);
  const reply = aiReply ?? getRuleBasedReply(message);

  return res.status(200).json({ reply });
}
