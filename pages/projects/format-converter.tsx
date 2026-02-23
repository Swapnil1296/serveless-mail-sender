import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { convertToQuestionFormat } from '@/components/intervew-prep/utils/formatConverter';
import FormattedText from '@/components/intervew-prep/components/helpers/FormattedText';
import { Copy, RefreshCw, FileCode } from 'lucide-react';

const DEFAULT_INPUT = `What is Idempotency (Core Definition)

An **idempotent operation** is one where **performing the same operation multiple times produces the same final state as performing it once**.

> **Key idea:**
> *"Retrying should not change the outcome beyond the first successful execution."*

This is **state-based**, not response-based.

Why Idempotency Matters (Senior Perspective)

In real production systems:

* Networks fail
* Clients retry requests
* Load balancers resend requests
* Users double-click

Without idempotency:

* Duplicate DB records
* Double payments
* Corrupted state

Idempotency is **not optional** in scalable systems.

HTTP & REST Semantics

1. GET: Read-only, idempotent
2. PUT: Replaces resource completely, idempotent
3. DELETE: Deleting twice = still deleted, idempotent
4. POST: Creates new resource each time, NOT idempotent

Idempotency Key Solution

Client sends:

\`\`\`http
POST /pay
Idempotency-Key: 9f3c-uuid
\`\`\`

Server logic:

1. Check if key already processed
2. If yes: return previous result
3. If no: process and store result`;

export default function FormatConverterPage() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [question, setQuestion] = useState('What is Idempotency?');
  const [topic, setTopic] = useState('system-design');
  const [tags, setTags] = useState('idempotency, HTTP, REST, reliability');
  const [actionWords, setActionWords] = useState('idempotency key, retry, Idempotency-Key');
  const [autoExtract, setAutoExtract] = useState(true);
  const [output, setOutput] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(() => {
    try {
      const result = convertToQuestionFormat(input, {
        question: autoExtract ? undefined : (question || undefined),
        topic: topic || undefined,
        tags: autoExtract ? undefined : (tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined),
        actionWords: autoExtract ? undefined : (actionWords ? actionWords.split(',').map((a) => a.trim()).filter(Boolean) : undefined),
      });
      setOutput(JSON.stringify(result, null, 2));
      setPreview(result.answer);
      if (autoExtract) {
        setQuestion(result.question);
        setTags(result.tags.join(', '));
        setActionWords(result.actionWords.join(', '));
      }
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : 'Conversion failed'}`);
      setPreview(null);
    }
  }, [input, question, topic, tags, actionWords, autoExtract]);

  const handleCopy = useCallback(() => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const handleReset = useCallback(() => {
    setInput(DEFAULT_INPUT);
    setQuestion('What is Idempotency?');
    setTopic('system-design');
    setTags('idempotency, HTTP, REST, reliability');
    setActionWords('idempotency key, retry, Idempotency-Key');
    setOutput(null);
    setPreview(null);
  }, []);

  return (
    <>
      <Head>
        <title>Format Converter - Interview Prep</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950/30 to-slate-950 text-cyan-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
                <FileCode className="w-8 h-8 text-cyan-500" />
                FormattedText Converter
              </h1>
              <p className="text-cyan-300/80 text-sm mt-1">
                Convert markdown/rich text → nextJs.js / FormattedText compatible format
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleConvert}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Convert
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Metadata inputs */}
          <div className="flex items-center gap-2 mb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoExtract}
                onChange={(e) => setAutoExtract(e.target.checked)}
                className="w-4 h-4 rounded border-cyan-500/50 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
              />
              <span className="text-sm text-cyan-400">Auto-extract question, tags & action words from content</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-cyan-400 mb-1">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What is Idempotency?"
                className="w-full px-3 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cyan-400 mb-1">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. system-design, next"
                className="w-full px-3 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cyan-400 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="idempotency, HTTP, REST"
                className="w-full px-3 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cyan-400 mb-1">Action Words (comma-separated)</label>
              <input
                type="text"
                value={actionWords}
                onChange={(e) => setActionWords(e.target.value)}
                placeholder="idempotency key, retry"
                className="w-full px-3 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
          </div>

          {/* Main content: Input | Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-400">Input (Markdown / Rich Text)</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={22}
                className="w-full px-4 py-3 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-cyan-100 font-mono text-sm placeholder-cyan-500/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-y"
                placeholder="Paste your content here. Supports **bold**, *italic*, # headers, > blockquotes, * bullets, 1. numbered lists, ``` code blocks"
              />
              <p className="text-xs text-cyan-500/70">
                Supports: <code className="text-cyan-400">**bold**</code>, <code className="text-cyan-400">*italic*</code>, <code className="text-cyan-400"># Header</code>, <code className="text-cyan-400">1. Label: desc</code>, <code className="text-cyan-400">* bullet</code>, <code className="text-cyan-400">```code```</code>
              </p>
            </div>

            {/* Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-cyan-400">Output (nextJs.js format)</label>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 rounded transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Copied!' : 'Copy JSON'}
                  </button>
                )}
              </div>
              <textarea
                value={output || ''}
                readOnly
                rows={22}
                className="w-full px-4 py-3 bg-slate-900/80 border border-emerald-500/30 rounded-lg text-emerald-200 font-mono text-sm resize-y"
                placeholder="Click Convert to generate output..."
              />
            </div>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-8 p-6 bg-slate-900/60 border border-cyan-500/20 rounded-xl">
              <h2 className="text-lg font-semibold text-cyan-400 mb-4">Preview (FormattedText render)</h2>
              <div className="prose prose-invert max-w-none bg-slate-800/50 p-6 rounded-lg border border-cyan-500/10">
                <FormattedText text={preview} contentType={undefined} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
