/**
 * Converts markdown/rich-text input to FormattedText.jsx compatible format
 * Used by the Format Converter UI
 */

export interface ConvertedQuestion {
  id: number;
  topic: string;
  question: string;
  answer: string;
  tags: string[];
  actionWords: string[];
  codeExample: string;
}

/**
 * Extract question from input: first line/paragraph ending with ?
 */
function extractQuestionFromInput(input: string): { question: string | null; textWithoutQuestion: string } {
  const lines = input.split(/\r?\n/);
  let question: string | null = null;
  const rest: string[] = [];
  let questionFound = false;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    // First meaningful line ending with ? becomes the question
    if (!questionFound && trimmed.length > 3 && trimmed.endsWith('?')) {
      question = trimmed;
      questionFound = true;
      continue; // omit from answer
    }
    rest.push(lines[i]);
  }

  return { question, textWithoutQuestion: rest.join('\n').replace(/^\n+|\n+$/g, '') };
}

/**
 * Convert markdown-style input to FormattedText format
 */
export function convertToFormattedText(input: string): { question?: string; answer: string; codeExample: string } {
  const { question, textWithoutQuestion } = extractQuestionFromInput(input);
  let text = textWithoutQuestion;
  const codeBlocks: string[] = [];

  // 1. Extract code blocks first (preserve order)
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const trimmed = code.trim();
    codeBlocks.push(lang ? `${lang}\n${trimmed}` : trimmed);
    return `\n__CODE_BLOCK__${codeBlocks.length - 1}__\n`;
  });

  // 2. Convert **bold** to <b>bold</b>
  text = text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

  // 3. Convert emoji numbers (1️⃣, 2️⃣, etc.) to plain numbers at line start
  text = text.replace(/^([\s]*)([1-9])️⃣\s*/gm, '$1$2. ');

  // 4. Split into lines for line-by-line processing
  const lines = text.split(/\r?\n/);
  const result: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Restore code block placeholder - will add to codeExample
    const codeMatch = line.match(/__CODE_BLOCK__(\d+)__/);
    if (codeMatch) {
      const idx = parseInt(codeMatch[1], 10);
      if (codeBlocks[idx]) {
        result.push(''); // paragraph break before code
        result.push(`\`\`\`\n${codeBlocks[idx]}\n\`\`\``);
      }
      continue;
    }

    // Skip markdown table separators (|---|)
    if (/^\s*\|?\s*-+\s*\|/.test(line) && inTable) {
      continue;
    }

    // Parse markdown table rows
    const tableRowMatch = line.match(/^\s*\|(.+)\|\s*$/);
    if (tableRowMatch) {
      const cells = tableRowMatch[1].split('|').map((c) => c.trim()).filter(Boolean);
      if (cells.length >= 2 && !inTable) {
        inTable = true;
        tableRows = [cells];
      } else if (cells.length >= 2 && inTable) {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable && tableRows.length > 0) {
      // Flush table to result
      result.push('');
      for (let r = 1; r < tableRows.length; r++) {
        const row = tableRows[r];
        const label = row[0] || '';
        const desc = row.slice(1).join(' | ') || '';
        if (label && desc) {
          result.push(`   -   ${label}  : ${desc}`);
        } else if (label) {
          result.push(`   - ${label}`);
        }
      }
      tableRows = [];
      inTable = false;
    }

    // # Header, ## Header, ### Header → Section header (avoid double colon)
    const hMatch = line.match(/^#{1,3}\s+(.+)$/);
    if (hMatch) {
      let content = hMatch[1].trim();
      if (!content.endsWith(':')) content += ':';
      result.push('');
      result.push(`       ${content}`);
      continue;
    }

    // --- horizontal rule → blank line
    if (/^-{3,}\s*$/.test(line.trim())) {
      result.push('');
      continue;
    }

    // > Blockquote
    const blockquoteMatch = line.match(/^>\s*(.*)$/);
    if (blockquoteMatch) {
      result.push(`   - ${blockquoteMatch[1].trim()}`);
      continue;
    }

    // Numbered list: 1. Label or 1. Label: desc
    const numMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) {
      const num = numMatch[1];
      const rest = numMatch[2];
      if (rest.includes(':')) {
        const [label, ...descParts] = rest.split(':');
        const desc = descParts.join(':').trim();
        result.push(`${num}.   ${label.trim()}  :${desc ? ' ' + desc : ''}`);
      } else {
        result.push(`${num}.   ${rest.trim()}  :`);
      }
      continue;
    }

    // Bullet: * Label: desc or * Label
    const bulletMatch = line.match(/^\*\s+(.+)$/);
    if (bulletMatch) {
      const rest = bulletMatch[1];
      if (rest.includes(':') && /^[A-Za-z\s]+:/.test(rest)) {
        const [label, ...descParts] = rest.split(':');
        const desc = descParts.join(':').trim();
        result.push(`   -   ${label.trim()}  :${desc ? ' ' + desc : ''}`);
      } else {
        result.push(`   - ${rest}`);
      }
      continue;
    }

    // Line that looks like "Section Name (Subtitle)" at paragraph start - make section header (avoid double colon)
    const trimmed = line.trim();
    if (
      result.length > 0 &&
      result[result.length - 1] === '' &&
      /^[A-Za-z][^.!#?]*(\([^)]+\))?\s*:?\s*$/.test(trimmed) &&
      trimmed.length > 3 &&
      !trimmed.endsWith('.')
    ) {
      const header = trimmed.endsWith(':') ? trimmed : `${trimmed}:`;
      result.push(`       ${header}`);
      continue;
    }

    // Convert *italic* to <i>italic</i> for non-bullet lines
    if (line.trim() && !line.trim().startsWith('* ')) {
      line = line.replace(/\*([^*\n]+)\*/g, '<i>$1</i>');
    }

    // Plain paragraph - ensure proper line structure
    if (line.trim()) {
      result.push(line);
    } else {
      result.push('');
    }
  }

  // Flush any remaining table
  if (inTable && tableRows.length > 1) {
    result.push('');
    for (let r = 1; r < tableRows.length; r++) {
      const row = tableRows[r];
      const label = row[0] || '';
      const desc = row.slice(1).join(' | ') || '';
      if (label && desc) {
        result.push(`   -   ${label}  : ${desc}`);
      } else if (label) {
        result.push(`   - ${label}`);
      }
    }
  }

  // Build answer and codeExample
  const fullText = result.join('\n').replace(/\n{3,}/g, '\n\n').trim();

  // Extract code blocks for codeExample (last one, or first if only one)
  const codeInAnswer = fullText.match(/```[\s\S]*?```/g) || [];
  let answerClean = fullText;
  let codeExample = '';

  if (codeInAnswer.length > 0) {
    codeExample = codeInAnswer.map((c) => c.replace(/^```\w*\n?/, '').replace(/\n?```$/, '')).join('\n\n');
    answerClean = fullText.replace(/```\w*\n?[\s\S]*?\n?```/g, '[See code example below]').replace(/\n{3,}/g, '\n\n').trim();
  }

  const output: { question?: string; answer: string; codeExample: string } = { answer: answerClean, codeExample };
  if (question) output.question = question;
  return output;
}

/**
 * Auto-extract tags from content (bold terms, capitalized phrases)
 */
export function extractTags(text: string, maxTags = 5): string[] {
  const tags = new Set<string>();
  const boldMatches = text.match(/<b>([^<]+)<\/b>/g) || [];
  boldMatches.forEach((m) => {
    const t = m.replace(/<\/?b>/g, '').trim().toLowerCase();
    if (t.length > 2 && t.length < 30) tags.add(t);
  });
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const techTerms = ['idempotency', 'hydration', 'ssr', 'api', 'http', 'rest', 'retry', 'payment', 'distributed', 'database', 'kafka', 'redis', 'react', 'concurrent', 'useSyncExternalStore', 'redux', 'zustand', 'mobx', 'tearing', 'snapshot'];
  techTerms.forEach((term) => {
    if (text.toLowerCase().includes(term)) tags.add(term);
  });
  return Array.from(tags).slice(0, maxTags);
}

/**
 * Auto-extract action words
 */
export function extractActionWords(text: string, maxWords = 5): string[] {
  const words = new Set<string>();
  const patterns = [
    /\b(Idempotency-Key|idempotency key|suppressHydrationWarning|useSyncExternalStore|getSnapshot|getServerSnapshot)\b/gi,
    /\b(Idempotent|idempotent|non-idempotent)\b/gi,
    /<b>([^<]+)<\/b>/g,
    /\*\*([^*]+)\*\*/g,
  ];
  patterns.forEach((p) => {
    let m;
    while ((m = p.exec(text)) !== null) {
      const w = m[1]?.trim();
      if (w && w.length > 2 && w.length < 40) words.add(w);
    }
  });
  return Array.from(words).slice(0, maxWords);
}

/**
 * Full conversion: input text + metadata → nextJs.js format object
 */
export function convertToQuestionFormat(
  input: string,
  options: { question?: string; topic?: string; id?: number; tags?: string[]; actionWords?: string[] }
): ConvertedQuestion {
  const { question: extractedQuestion, answer, codeExample } = convertToFormattedText(input);

  // Prefer: options.question → extracted question (text ending with ?) → extractFirstHeading → fallback
  const question = options.question?.trim() || extractedQuestion || extractFirstHeading(input) || 'Untitled Question';
  const topic = options.topic?.trim() || 'system-design';
  const tags = options.tags?.length
    ? options.tags
    : extractTags(input + question);
  const actionWords = options.actionWords?.length
    ? options.actionWords
    : extractActionWords(input + question);

  return {
    id: options.id ?? Math.floor(Math.random() * 100000),
    topic,
    question,
    answer,
    tags,
    actionWords,
    codeExample,
  };
}

function extractFirstHeading(text: string): string {
  // First line that looks like a question (What is X?, Explain X, etc.)
  const firstLine = text.split(/\r?\n/).find((l) => l.trim().length > 10);
  if (firstLine) {
    const q = firstLine.trim();
    if (/^(What is|Explain|How does|Why does|When should|Describe)\s+.+\?/.test(q) || q.endsWith('?')) {
      return q.replace(/\s*\([^)]+\)\s*$/, '').trim();
    }
  }
  const m = text.match(/#{1,3}\s+(.+?)(?:\n|$)/) || text.match(/^([^\n#*>-]+?)(?:\s*\([^)]+\))?\s*$/m);
  return m ? m[1].trim() : '';
}
