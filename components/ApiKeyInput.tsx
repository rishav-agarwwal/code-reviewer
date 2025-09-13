
import React, { useState } from 'react';

interface ApiKeyInputProps {
    onKeySubmit: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onKeySubmit }) => {
    const [apiKey, setApiKey] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKey.trim()) {
            onKeySubmit(apiKey.trim());
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-lg p-8 m-4">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h2 className="mt-4 text-2xl font-bold text-slate-100">Enter Your Gemini API Key</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        To use the code reviewer, please provide your Gemini API key. Your key is stored securely in your browser's local storage and is never sent to our servers.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="api-key" className="sr-only">Gemini API Key</label>
                        <input
                            id="api-key"
                            name="api-key"
                            type="password"
                            autoComplete="off"
                            required
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 font-mono text-sm text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                            placeholder="Enter your key here"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-all duration-300"
                        >
                            Save and Continue
                        </button>
                    </div>
                </form>
                 <div className="text-center mt-4">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-cyan-400 transition">
                        Don't have a key? Get one from Google AI Studio
                    </a>
                </div>
            </div>
        </div>
    );
};
