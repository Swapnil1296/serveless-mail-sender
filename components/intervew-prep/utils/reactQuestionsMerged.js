/**
 * Merged React Interview Questions
 * Combines original reacQuestiondata with enhanced theoretical explanations
 * and new questions from react-interview-questions-enhanced.json
 *
 * Usage: Import reactQuestionsMerged in PrepLandingPage.jsx and use instead of reactQuesionData
 */

import { reactQuesionData } from './reacQuestiondata';
import enhancedData from './react-interview-questions-enhanced.json';

// Normalize enhanced questions to match the app's expected structure
const normalizeQuestion = (q) => ({
  id: q.id,
  topic: q.topic || 'reactJs',
  question: q.question,
  answer: q.answer,
  tags: q.tags || [],
  keyFeatures: q.keyFeatures || [],
  actionWords: q.actionWords || [],
  codeExample: q.codeExample || '',
});

// Get max numeric ID from existing data for consistent ordering
const maxExistingId = Math.max(
  ...reactQuesionData
    .filter((q) => typeof q.id === 'number')
    .map((q) => q.id),
  0
);

// Convert enhanced and new question IDs to numeric for consistency
let newIdCounter = maxExistingId + 1;
const enhancedQuestions = (enhancedData.enhancedQuestions || []).map((q) =>
  normalizeQuestion({ ...q, id: newIdCounter++ })
);
const newQuestions = (enhancedData.newQuestions || []).map((q) =>
  normalizeQuestion({ ...q, id: newIdCounter++ })
);

// Merge: original + enhanced (theoretical deep-dives) + new questions
export const reactQuestionsMerged = [
  ...reactQuesionData,
  ...enhancedQuestions,
  ...newQuestions,
];

// Also export original for backward compatibility
export { reactQuesionData };
