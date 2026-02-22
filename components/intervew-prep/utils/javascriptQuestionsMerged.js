/**
 * Merged JavaScript Interview Questions
 * Combines original javascriptQuestionData with enhanced theoretical explanations
 * (how & why mechanism) and new questions from:
 * - javascript-interview-questions-enhanced.json
 * - javascript-interview-questions-comprehensive.json (40 deep theoretical questions)
 *
 * Usage: Import javascriptQuestionsMerged in PrepLandingPage.jsx and use instead of javascriptQuestionData
 */

import { javascriptQuestionData } from './javascriptQuestionData';
import enhancedData from './javascript-interview-questions-enhanced.json';
import comprehensiveData from './javascript-interview-questions-comprehensive.json';

// Normalize questions to match the app's expected structure
const normalizeQuestion = (q, id) => ({
  id: id ?? q.id,
  topic: q.topic || 'javascript',
  question: q.question,
  answer: q.answer,
  tags: q.tags || [],
  keyFeatures: q.keyFeatures || [],
  actionWords: q.actionWords || [],
  codeExample: q.codeExample || '',
});

// Get max numeric ID from existing data for consistent ordering
const maxExistingId = Math.max(
  ...javascriptQuestionData
    .filter((q) => typeof q.id === 'number')
    .map((q) => q.id),
  0
);

// Convert enhanced and new question IDs to numeric for consistency
let newIdCounter = maxExistingId + 1;
const enhancedQuestions = (enhancedData.enhancedQuestions || []).map((q) =>
  normalizeQuestion(q, newIdCounter++)
);
const newQuestions = (enhancedData.newQuestions || []).map((q) =>
  normalizeQuestion(q, newIdCounter++)
);

// Comprehensive questions (40 deep theoretical Q&As)
const comprehensiveQuestions = (comprehensiveData.questions || []).map((q) =>
  normalizeQuestion(q, newIdCounter++)
);

// Merge: original + enhanced + new + comprehensive (deep theoretical questions)
export const javascriptQuestionsMerged = [
  ...javascriptQuestionData,
  ...enhancedQuestions,
  ...newQuestions,
  ...comprehensiveQuestions,
];

// Also export original for backward compatibility
export { javascriptQuestionData };
