/**
 * AI Service - Multiple providers (DeepSeek, OpenAI, Gemini) with fallback
 * DeepSeek: free tier, generous limits. OpenAI/Gemini as fallbacks.
 */

// ============ Types ============

export interface ResumeContent {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  experience: Array<{ title: string; company: string; dates: string; bullets: string[] }>;
  education: Array<{ degree: string; institution: string; year: string }>;
}

// Token-optimized: compact JSON structure, no extra prose
const RESUME_JSON_SCHEMA = `{name,email,phone,summary,skills:string[],experience:[{title,company,dates,bullets:string[]}],education:[{degree,institution,year}]}`;

// ============ Skill Extraction (Low tokens) ============

const SKILL_EXTRACT_PROMPT = (jobDescs: string[]) =>
  `Extract ALL technical & soft skills from these job descriptions. Return ONLY a JSON array of unique skills, no explanation.
Jobs: ${jobDescs.map((j) => j.slice(0, 800)).join(' | ')}
Output: ["skill1","skill2",...]`;

// ============ Resume Generation (Token-optimized) ============

const RESUME_PROMPT = (
  userContext: string,
  skills: string[],
  jobContext: string
) => `Create an ATS-optimized single-page resume as valid JSON. Rules:
- Single page, concise bullet points (max 2 lines each)
- Include ALL skills: ${skills.slice(0, 40).join(', ')}
- Use standard section order: Summary, Skills, Experience, Education
- No extra text, only valid JSON matching schema: ${RESUME_JSON_SCHEMA}
- ATS-friendly: simple formatting, keywords, action verbs

User context: ${userContext.slice(0, 1500)}
Job context (skills to emphasize): ${jobContext.slice(0, 600)}

Return ONLY the JSON object.`;

// ============ OpenAI Provider ============

async function generateWithOpenAI(
  prompt: string,
  isJson = false
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const { default: OpenAI } = await import('openai');
  const openai = new OpenAI({ apiKey });

  const res = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an ATS resume expert. Output only valid JSON when asked for JSON. Be concise.',
      },
      { role: 'user', content: prompt },
    ],
    max_tokens: isJson ? 1200 : 800,
    temperature: 0.4,
  });

  const text = res.choices[0]?.message?.content?.trim();
  if (!text) throw new Error('OpenAI returned empty response');
  return text;
}

// ============ DeepSeek Provider (OpenAI-compatible, free tier) ============

async function generateWithDeepSeek(
  prompt: string,
  isJson = false
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY not configured');

  const { default: OpenAI } = await import('openai');
  const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.deepseek.com',
  });

  const res = await client.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content: 'You are an ATS resume expert. Output only valid JSON when asked for JSON. Be concise.',
      },
      { role: 'user', content: prompt },
    ],
    max_tokens: isJson ? 1200 : 800,
    temperature: 0.4,
  });

  const text = res.choices[0]?.message?.content?.trim();
  if (!text) throw new Error('DeepSeek returned empty response');
  return text;
}

// ============ Gemini Provider ============

async function generateWithGemini(
  prompt: string,
  isJson = false
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    generationConfig: {
      maxOutputTokens: isJson ? 1200 : 800,
      temperature: 0.4,
    },
  });

  const result = await model.generateContent([
    'You are an ATS resume expert. Output only valid JSON when asked for JSON. Be concise.',
    prompt,
  ]);
  const response = result.response;
  const text = response.text()?.trim();
  if (!text) throw new Error('Gemini returned empty response');
  return text;
}

// ============ Public API ============

export type AIProvider = 'deepseek' | 'openai' | 'gemini';

function getProviders(preferred?: AIProvider): AIProvider[] {
  const available: AIProvider[] = [];
  if (process.env.DEEPSEEK_API_KEY) available.push('deepseek');
  if (process.env.OPENAI_API_KEY) available.push('openai');
  if (process.env.GEMINI_API_KEY) available.push('gemini');
  if (preferred && available.includes(preferred)) {
    const rest = available.filter((p) => p !== preferred);
    return [preferred, ...rest];
  }
  return available;
}

async function generateWith(provider: AIProvider, prompt: string, isJson: boolean): Promise<string> {
  switch (provider) {
    case 'deepseek':
      return generateWithDeepSeek(prompt, isJson);
    case 'openai':
      return generateWithOpenAI(prompt, isJson);
    case 'gemini':
      return generateWithGemini(prompt, isJson);
  }
}

async function runWithFallback<T>(
  providers: AIProvider[],
  fn: (p: AIProvider) => Promise<T>,
  stepName: string
): Promise<T> {
  let lastError: Error | null = null;
  for (const provider of providers) {
    try {
      const result = await fn(provider);
      return result;
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      console.warn(`[AI] ${provider} ${stepName} failed (token/rate/API):`, lastError.message);
      const next = providers.find((p) => p !== provider);
      if (next) console.warn(`[AI] Falling back to ${next}...`);
    }
  }
  throw lastError || new Error(`${stepName} failed`);
}

export async function extractSkillsFromJobs(
  jobDescriptions: string[],
  preferredProvider?: AIProvider
): Promise<string[]> {
  const prompt = SKILL_EXTRACT_PROMPT(jobDescriptions);
  const providers = getProviders(preferredProvider);
  if (providers.length === 0) throw new Error('No AI provider configured (DEEPSEEK_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY)');

  return runWithFallback(providers, async (provider) => {
    const text = await generateWith(provider, prompt, true);
    const parsed = JSON.parse(extractJsonArray(text));
    return Array.isArray(parsed)
      ? [...new Set(parsed.map((s: unknown) => String(s).trim()))]
      : [];
  }, 'skill extraction');
}

export async function generateATSResume(
  userContext: string,
  skills: string[],
  jobContext: string,
  preferredProvider?: AIProvider
): Promise<ResumeContent> {
  const prompt = RESUME_PROMPT(userContext, skills, jobContext);
  const providers = getProviders(preferredProvider);
  if (providers.length === 0) throw new Error('No AI provider configured');

  return runWithFallback(providers, async (provider) => {
    const text = await generateWith(provider, prompt, true);
    const json = extractJsonObject(text);
    const data = JSON.parse(json) as ResumeContent;
    if (data.name && data.skills && Array.isArray(data.skills)) {
      return data;
    }
    throw new Error('Invalid resume structure from model');
  }, 'resume generation');
}

/** Full pipeline: extract skills then generate resume. If one step fails with provider A, the other takes over. */
export async function generateResumePipeline(
  jobDescriptions: string[],
  userContext: string,
  preferredProvider?: AIProvider
): Promise<ResumeContent> {
  const providers = getProviders(preferredProvider);
  if (providers.length === 0) throw new Error('No AI provider configured (DEEPSEEK_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY)');

  const skills = await runWithFallback(providers, async (provider) => {
    const prompt = SKILL_EXTRACT_PROMPT(jobDescriptions);
    const text = await generateWith(provider, prompt, true);
    const parsed = JSON.parse(extractJsonArray(text));
    return Array.isArray(parsed)
      ? [...new Set(parsed.map((s: unknown) => String(s).trim()))]
      : [];
  }, 'skill extraction');

  const jobContext = jobDescriptions
    .map((d) => d.slice(0, 400))
    .join(' ')
    .slice(0, 1500);

  return runWithFallback(providers, async (provider) => {
    const prompt = RESUME_PROMPT(userContext, skills, jobContext);
    const text = await generateWith(provider, prompt, true);
    const json = extractJsonObject(text);
    const data = JSON.parse(json) as ResumeContent;
    if (data.name && data.skills && Array.isArray(data.skills)) {
      return data;
    }
    throw new Error('Invalid resume structure from model');
  }, 'resume generation');
}

function extractJsonArray(text: string): string {
  const match = text.match(/\[[\s\S]*\]/);
  return match ? match[0] : `[]`;
}

function extractJsonObject(text: string): string {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : `{}`;
}
