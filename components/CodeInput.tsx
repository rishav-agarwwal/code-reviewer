
import React from 'react';
import { LANGUAGES } from '../constants';

interface CodeInputProps {
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (language: string) => void;
    handleReview: () => void;
    isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
    code,
    setCode,
    language,
    setLanguage,
    handleReview,
    isLoading
}) => {
    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col gap-4 h-full">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <label htmlFor="language-select" className="text-slate-300 font-medium whitespace-nowrap">
                    Programming Language:
                </label>
                <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full sm:w-auto bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                >
                    {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>
            
            <div className="flex-grow flex flex-col">
                <label htmlFor="code-textarea" className="sr-only">Code Input</label>
                <textarea
                    id="code-textarea"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here..."
                    className="w-full flex-grow bg-slate-900 border border-slate-700 rounded-md p-4 font-mono text-sm text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none transition"
                    spellCheck="false"
                />
            </div>
            
            <button
                onClick={handleReview}
                disabled={isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-all duration-300"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Reviewing...
                    </>
                ) : (
                    "Review Code"
                )}
            </button>
        </div>
    );
};
