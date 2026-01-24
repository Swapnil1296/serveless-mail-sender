import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = ({ darkMode }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    error: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, handle form submission to backend
    // For demo purposes, simulate success
    setFormState({
      ...formState,
      submitted: true,
      name: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2
          id="contact"
          className={`text-2xl font-bold pb-2 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Get in Touch
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {formState.submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                darkMode ? "bg-blue-400 bg-opacity-20" : "bg-blue-100"
              }`}
            >
              <svg
                className={`w-8 h-8 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <button
              onClick={() => setFormState({ ...formState, submitted: false })}
              className={`mt-6 px-4 py-2 rounded-md text-sm font-medium ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:border-blue-400 text-white"
                    : "bg-white border-gray-300 focus:border-blue-600"
                } border focus:ring-2 focus:ring-opacity-50 outline-none transition-colors duration-300`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:border-blue-400 text-white"
                    : "bg-white border-gray-300 focus:border-blue-600"
                } border focus:ring-2 focus:ring-opacity-50 outline-none transition-colors duration-300`}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-4 py-2 rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:border-blue-400 text-white"
                    : "bg-white border-gray-300 focus:border-blue-600"
                } border focus:ring-2 focus:ring-opacity-50 outline-none transition-colors duration-300`}
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full px-6 py-3 rounded-md font-medium ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Send Message
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;
