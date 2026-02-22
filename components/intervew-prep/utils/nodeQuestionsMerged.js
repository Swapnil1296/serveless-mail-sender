/**
 * Merged Node.js Interview Questions
 * Combines original nodeJS data with enhanced theoretical explanations
 * (internal mechanisms, how & why, real-world use cases, pitfalls) and new questions from:
 * - nodejs-interview-questions-enhanced.json
 *
 * Usage: Import nodeQuestionsMerged in PrepLandingPage.jsx and use instead of nodeJS
 */

import { nodeJS } from './nodeJs';
import enhancedData from './nodejs-interview-questions-enhanced.json';

const normalizeQuestion = (q, id) => ({
  id: id ?? q.id,
  topic: q.topic || 'nodeJs',
  question: q.question,
  answer: q.answer,
  tags: Array.isArray(q.tags) ? q.tags : [],
  keyFeatures: Array.isArray(q.keyFeatures) ? q.keyFeatures : [],
  actionWords: Array.isArray(q.actionWords) ? q.actionWords : [],
  codeExample: q.codeExample || '',
});

// Get max numeric ID from existing data (handle string IDs like ":r0:81")
const numericIds = nodeJS
  .filter((q) => typeof q.id === 'number')
  .map((q) => q.id);
const maxExistingId = numericIds.length ? Math.max(...numericIds, 0) : 0;

let newIdCounter = maxExistingId + 1;
const enhancedQuestions = (enhancedData.enhancedQuestions || []).map((q) =>
  normalizeQuestion(q, newIdCounter++)
);
const newQuestions = (enhancedData.newQuestions || []).map((q) =>
  normalizeQuestion(q, newIdCounter++)
);

// Merge: original + enhanced + new questions
export const nodeQuestionsMerged = [
  ...nodeJS,
  ...enhancedQuestions,
  ...newQuestions,
];

export { nodeJS };
