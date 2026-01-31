import React, { useState, memo } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';

const CodeBlock = memo(({ language, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden shadow-2xl border border-cyan-500/20 bg-[#011627] my-6 group transition-all duration-300 hover:shadow-cyan-500/10 hover:border-cyan-500/40">
            {/* Code Header / Window Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#011627] border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-3 text-xs font-mono text-cyan-400 opacity-60 uppercase">{language}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md text-gray-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                    title="Copy code"
                >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
            </div>

            <Highlight
                theme={themes.nightOwl}
                code={code}
                language={language || 'javascript'}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={`${className} p-5 overflow-x-auto custom-scrollbar`}
                        style={{
                            ...style,
                            backgroundColor: 'transparent', // Let container bg shine through
                            fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
                            fontSize: '15px',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-wrap',       // Wrap text
                            overflowWrap: 'break-word',   // Break long words
                            wordBreak: 'break-word',      // Ensure wrapping
                            maxWidth: '100%',
                        }}
                    >
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })} className="table-row">
                                <span className="table-cell text-right pr-6 select-none opacity-30 text-xs font-mono w-8">
                                    {i + 1}
                                </span>
                                <span className="table-cell">
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </span>
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
}, (prevProps, nextProps) => {
    // Only re-render if language or code changes
    return prevProps.language === nextProps.language && prevProps.code === nextProps.code;
});

export default CodeBlock;
