import React, { useState } from "react";
import { Download } from "lucide-react";
import { marked } from "marked"; // For markdown to HTML conversion
import { topics } from "./helpers/Topics";

const AddQuestionForm = ({ dataSources }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [actionWords, setActionWords] = useState("");
  const [tags, setTags] = useState("");
  const [codeExample, setCodeExample] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null
  const [downloadUrl, setDownloadUrl] = useState("");

  // Define available topics


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!selectedTopic || !question || !answer) {
      setSubmissionStatus("error");
      return;
    }

    // Get existing data for the selected topic
    const existingData = dataSources[selectedTopic] || [];
    const maxId =
      existingData.length > 0
        ? Math.max(...existingData.map((item) => item.id))
        : 0;
    const newId = maxId + 1;

    // Convert markdown answer to HTML
    const htmlAnswer = marked(answer, {
      breaks: true, // Convert newlines to <br> tags
      gfm: true, // Use GitHub-flavored markdown
    });

    // Create new question object
    const newQuestion = {
      id: newId,
      topic: topics.find((t) => t.dataSource === selectedTopic).id,
      contentType: "html",
      question,
      answer: htmlAnswer,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      keyFeatures: [],
      actionWords: actionWords
        .split(",")
        .map((word) => word.trim())
        .filter((word) => word),
      codeExample,
    };
    console.log("newQuestion==>", newQuestion);
    // Append to existing data
    const updatedData = [...existingData, newQuestion];

    try {
      // Generate JSON file
      const blob = new Blob([JSON.stringify(updatedData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setSubmissionStatus("success");

      // Reset form
      setQuestion("");
      setAnswer("");
      setActionWords("");
      setTags("");
      setCodeExample("");
    } catch (error) {
      console.error("Error generating JSON:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add New Question
      </h2>

      {/* Topic Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-800 mb-2">
          Select Topic
        </label>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.dataSource)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTopic === topic.dataSource
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Question Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter the question here"
            required
          />
        </div>

        {/* Answer Area */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Answer (use markdown: **bold**, *italic*)
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="6"
            placeholder="Enter the answer here. Use markdown like **bold** or *italic*."
            required
          />
        </div>

        {/* Action Words */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Action Words (comma-separated)
          </label>
          <input
            type="text"
            value={actionWords}
            onChange={(e) => setActionWords(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="e.g., control, modify, useful"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="e.g., HOC, React"
          />
        </div>

        {/* Code Example */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Code Example
          </label>
          <textarea
            value={codeExample}
            onChange={(e) => setCodeExample(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-mono"
            rows="10"
            placeholder="Enter code example here"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Question
        </button>
      </form>

      {/* Submission Status */}
      {submissionStatus === "success" && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-center justify-between">
          <p className="text-green-700">Question added successfully!</p>
          <a
            href={downloadUrl}
            download={`${selectedTopic}.json`}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Download className="w-5 h-5" />
            <span>Download Updated JSON</span>
          </a>
        </div>
      )}
      {submissionStatus === "error" && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg">
          <p className="text-red-700">
            Error: Please select a topic and fill in the required fields.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddQuestionForm;
