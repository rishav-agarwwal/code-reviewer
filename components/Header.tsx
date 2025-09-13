
import React from 'react';

interface HeaderProps {
    hasApiKey: boolean;
    onClearApiKey: () => void;
}

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ hasApiKey, onClearApiKey }) => {
    return (
        <header className="bg-slate-900/70 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <CodeIcon />
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">Gemini Code Reviewer</h1>
                        <p className="text-sm text-slate-400">Your AI-powered pair programmer for expert code analysis.</p>
                    </div>
                </div>
                {hasApiKey && (
                    <button
                        onClick={onClearApiKey}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-mono px-3 py-1.5 rounded-md transition whitespace-nowrap"
                    >
                        Change API Key
                    </button>
                )}
            </div>
        </header>
    );
};
