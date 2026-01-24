// import React, { useEffect, useState } from 'react';
// import { Emoji } from 'react-emoji-render';

// const FormattedText = ({ text }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkIfMobile();
//     window.addEventListener("resize", checkIfMobile);
//     return () => window.removeEventListener("resize", checkIfMobile);
//   }, []);

//   const numberEmojis = {
//     "0": "0️⃣",
//     "1": "1️⃣",
//     "2": "2️⃣",
//     "3": "3️⃣",
//     "4": "4️⃣",
//     "5": "5️⃣",
//     "6": "6️⃣",
//     "7": "7️⃣",
//     "8": "8️⃣",
//     "9": "9️⃣",
//   };

//   const formatText = (text) => {
//     if (/[0-9]️⃣/.test(text)) return text;

//     return text.replace(/\b(\d)\b/g, (match, digit) => {
//       if (isMobile) {
//         return `<span class="inline-flex items-center justify-center w-6 h-6 text-sm font-semibold bg-cyan-500/20 text-cyan-400 rounded-full mx-1">${digit}</span>`;
//       } else {
//         return numberEmojis[digit] || match;
//       }
//     });
//   };

//   const processLine = (line, key) => {
//     // Check for decorative tags (b, i, u, em, strong, mark, etc.)
//     const decorativeTagPattern = /<(b|i|u|em|strong|mark|sub|sup|strike|s|del|small)>.*?<\/\1>/i;
//     const containsDecorativeTags = decorativeTagPattern.test(line);
//   // <b> - Bold
//   // <strong> - Strong emphasis (semantic bold)
//   // <i> - Italic
//   // <em> - Emphasis (semantic italic)
//   // <mark> - Highlighted text
//   // <u> - Underlined text
//   // <s> - Strikethrough (semantic removed text)
//   // <del> - Deleted text (semantic)
//   // <ins> - Inserted text (semantic underline)
//   // <sub> - Subscript
//   // <sup> - Superscript
//   // <small> - Smaller text

//     // If the line contains HTML tags but they're not just decorative, return as raw HTML
//     if (/<[^>]*>/g.test(line) && !containsDecorativeTags) {
//       return line;
//     }

//     // Format the line with emoji processing
//     const formattedLine = formatText(line);
//     const isHeading = line.trim().endsWith(":");

//     return (
//       <p
//         key={key}
//         className={`mb-3 ${isHeading ? "font-medium mt-4 text-cyan-500" : "text-cyan-200"}`}
//         dangerouslySetInnerHTML={{ __html: formattedLine.trim() }}
//       />
//     );
//   };

//   const processText = (text) => {
//     if (!text) return null;

//     const paragraphs = text.split(/\n\n+/);

//     return paragraphs.map((paragraph, index) => {
//       if (paragraph.includes("\n")) {
//         const lines = paragraph.split("\n");
//         return (
//           <div key={index} className="mb-4">
//             {lines.map((line, lineIndex) => line.trim() && processLine(line, `${index}-${lineIndex}`))}
//           </div>
//         );
//       }
//       return paragraph.trim() && processLine(paragraph, index);
//     });
//   };

//   return <div className="space-y-2">{processText(text)}</div>;
// };

// export default FormattedText;

import React, { useEffect, useState } from "react";
import CodeBlock from './CodeBlock';


// const FormattedText = ({ text }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkIfMobile();
//     window.addEventListener("resize", checkIfMobile);
//     return () => window.removeEventListener("resize", checkIfMobile);
//   }, []);

//   const numberEmojis = {
//     0: "0️⃣",
//     1: "1️⃣",
//     2: "2️⃣",
//     3: "3️⃣",
//     4: "4️⃣",
//     5: "5️⃣",
//     6: "6️⃣",
//     7: "7️⃣",
//     8: "8️⃣",
//     9: "9️⃣",
//   };

//   const formatText = (text) => {
//     if (/[0-9]️⃣/.test(text)) return text;

//     return text.replace(/\b(\d)\b/g, (match, digit) => {
//       if (isMobile) {
//         return `<span class="inline-flex items-center justify-center w-6 h-6 text-sm font-semibold bg-cyan-500/20 text-cyan-400 rounded-full mx-1">${digit}</span>`;
//       } else {
//         return numberEmojis[digit] || match;
//       }
//     });
//   };

//   const processLine = (line, key) => {
//     const decorativeTagPattern =
//       /<(b|i|u|em|strong|mark|sub|sup|strike|s|del|small)>.*?<\/\1>/i;
//     const containsDecorativeTags = decorativeTagPattern.test(line);

//     if (/<[^>]*>/g.test(line) && !containsDecorativeTags) {
//       return line;
//     }

//     const formattedLine = formatText(line);
//     const isHeading = line.trim().endsWith(":");

//     return (
//       <p
//         key={key}
//         className={`mb-3 ${
//           isHeading ? "font-medium mt-4 text-cyan-500" : "text-cyan-200"
//         }`}
//         dangerouslySetInnerHTML={{ __html: formattedLine.trim() }}
//       />
//     );
//   };

//   const processText = (text) => {
//     if (!text) return null;

//     const parts = text.split("```");
//     return parts.map((part, index) => {
//       if (index % 2 === 0) {
//         // Regular text part
//         const paragraphs = part.split(/\n\n+/);
//         return paragraphs.map((paragraph, pIndex) => {
//           if (paragraph.includes("\n")) {
//             const lines = paragraph.split("\n");
//             return (
//               <div key={`${index}-${pIndex}`} className="mb-4">
//                 {lines.map(
//                   (line, lineIndex) =>
//                     line.trim() &&
//                     processLine(line, `${index}-${pIndex}-${lineIndex}`)
//                 )}
//               </div>
//             );
//           } else {
//             return (
//               paragraph.trim() && processLine(paragraph, `${index}-${pIndex}`)
//             );
//           }
//         });
//       } else {
//         // Code block part
//         const lines = part.split("\n");
//         let language = "javascript"; // Default language
//         let code = part;

//         if (lines.length > 1 && lines[0].trim().split(" ").length === 1) {
//           language = lines[0].trim();
//           code = lines.slice(1).join("\n");
//         }

//         return (
//           <SyntaxHighlighter
//             key={index}
//             language={language}
//             style={atomDark}
//             className="rounded-xl shadow-lg border border-gray-700 p-6"
//             wrapLongLines
//             customStyle={{
//               // overflowX: "auto",
//               whiteSpace: "pre-wrap",
//               overflowWrap: "break-word",
//               wordBreak: "normal",
//             }}
//             lineProps={{
//               style: {
//                 whiteSpace: "pre-wrap",
//                 overflowWrap: "break-word",
//                 wordBreak: "normal",
//               },
//             }}
//           >
//             {code.trim()}
//           </SyntaxHighlighter>
//         );
//       }
//     });
//   };

//   return <div className="space-y-2">{processText(text)}</div>;
// };

const FormattedText = ({ text, contentType }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle HTML content with code blocks
  if (contentType === "html") {
    const codeBlockRegex = /<code class="language-(\w+)">([\s\S]*?)<\/code>/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before the code block
      if (match.index > lastIndex) {
        parts.push(
          <div
            key={`text-${lastIndex}`}
            className="text-cyan-200"
            dangerouslySetInnerHTML={{
              __html: text.slice(lastIndex, match.index),
            }}
          />
        );
      }

      // Extract just the code content
      const language = match[1];
      const codeContent = match[2].trim(); // Only the content between tags

      parts.push(
        <CodeBlock
          key={`code-${match.index}`}
          language={language}
          code={codeContent}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < text.length) {
      parts.push(
        <div
          key={`text-${lastIndex}`}
          className="text-cyan-200"
          dangerouslySetInnerHTML={{ __html: text.slice(lastIndex) }}
        />
      );
    }

    return <div className="space-y-2">{parts}</div>;
  }

  // Existing formatting logic for non-HTML content
  const numberEmojis = {
    0: "0️⃣",
    1: "1️⃣",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣",
  };

  const formatText = (text) => {
    if (/[0-9]️⃣/.test(text)) return text;

    return text.replace(/\b(\d)\b/g, (match, digit) => {
      if (isMobile) {
        return `<span class="inline-flex items-center justify-center w-6 h-6 text-sm font-semibold bg-cyan-500/20 text-cyan-400 rounded-full mx-1">${digit}</span>`;
      } else {
        return numberEmojis[digit] || match;
      }
    });
  };

  const processLine = (line, key) => {
    const decorativeTagPattern =
      /<(b|i|u|em|strong|mark|sub|sup|strike|s|del|small)>.*?<\/\1>/i;
    const containsDecorativeTags = decorativeTagPattern.test(line);

    if (/<[^>]*>/g.test(line) && !containsDecorativeTags) {
      return line;
    }

    const trimmedLine = line?.trim() || "";
    const formattedLine = formatText(trimmedLine);

    // Pattern for numbered subtopics
    const subtopicPattern = /^(\d+\.)(\s*)([^:]+)(:)(.*)/;
    const subtopicMatch = trimmedLine.match(subtopicPattern);

    // Pattern for bullet point subtopics
    const bulletSubtopicPattern = /^(-\s*)([a-zA-Z\s]+)(:)(.*)/;
    const bulletSubtopicMatch = trimmedLine.match(bulletSubtopicPattern);

    const isHeading = trimmedLine.endsWith(":");
    const isQuestion = trimmedLine.endsWith("?");

    // Handle bullet point subtopics
    if (bulletSubtopicMatch) {
      const formattedLine =
        `${formatText(bulletSubtopicMatch[1])}<span class="italic  text-emerald-500">${bulletSubtopicMatch[2]}</span>${formatText(bulletSubtopicMatch[3] + bulletSubtopicMatch[4])}`;

      return (
        <p
          key={key}
          className="mb-3 text-cyan-200"
          dangerouslySetInnerHTML={{ __html: formattedLine.trim() }}
        />
      );
    }

    // Handle numbered subtopics
    if (subtopicMatch) {
      const formattedLine =
        `${formatText(subtopicMatch[1] + subtopicMatch[2])}<span class="italic text-green-400">${subtopicMatch[3]}</span>${formatText(subtopicMatch[4] + subtopicMatch[5])}`;

      return (
        <p
          key={key}
          className="mb-3 text-cyan-200"
          dangerouslySetInnerHTML={{ __html: formattedLine.trim() }}
        />
      );
    }

    return (
      <p
        key={key}
        className={`mb-3 ${isHeading ? "font-semibold font-mono    mt-4 text-cyan-600" :
          isQuestion ? "font-medium mt-4 text-amber-500" :
            "text-cyan-300 font-sans"
          }`}
        dangerouslySetInnerHTML={{ __html: formattedLine.trim() }}
      />
    );
  };

  const processText = (text) => {
    if (!text) return null;

    const parts = text.split("```");
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        const paragraphs = part.split(/\n\n+/);
        return paragraphs.map((paragraph, pIndex) => {
          if (paragraph.includes("\n")) {
            const lines = paragraph.split("\n");
            return (
              <div key={`${index}-${pIndex}`} className="mb-4">
                {lines.map(
                  (line, lineIndex) =>
                    line.trim() &&
                    processLine(line, `${index}-${pIndex}-${lineIndex}`)
                )}
              </div>
            );
          } else {
            return (
              paragraph.trim() && processLine(paragraph, `${index}-${pIndex}`)
            );
          }
        });
      } else {
        const lines = part.split("\n");
        let language = "javascript";
        let code = part;

        if (lines.length > 1 && lines[0].trim().split(" ").length === 1) {
          language = lines[0].trim();
          code = lines.slice(1).join("\n");
        }

        return (
          <CodeBlock
            key={index}
            language={language}
            code={code.trim()}
          />
        );
      }
    });
  };

  return <div className="space-y-2">{processText(text)}</div>;
};

export default FormattedText;
