
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { ApiKeyInput } from './components/ApiKeyInput';
import { reviewCode } from './services/geminiService';
import { LANGUAGES } from './constants';

const API_KEY_STORAGE_KEY = 'gemini-api-key';

const App: React.FC = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>(LANGUAGES[0]);
    const [review, setReview] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedKey) {
            setApiKey(storedKey);
        }
    }, []);

    const handleApiKeySubmit = (key: string) => {
        setApiKey(key);
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
    };

    const handleClearApiKey = () => {
        setApiKey(null);
        localStorage.removeItem(API_KEY_STORAGE_KEY);
    };

    const handleReview = useCallback(async () => {
        if (!apiKey) {
            setError("API Key is not set. Please enter your API key.");
            return;
        }
        if (!code.trim()) {
            setError("Please enter some code to review.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setReview('');

        try {
            const result = await reviewCode(code, language, apiKey);
            setReview(result);
        } catch (err) {
            if (err instanceof Error) {
                 if (err.message.includes('API key not valid')) {
                     setError(`Your API key is not valid. Please check it and try again. You can change it using the button in the header.`);
                } else {
                     setError(`An error occurred: ${err.message}.`);
                }
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [code, language, apiKey]);

    const renderContent = () => {
        if (!apiKey) {
            return <ApiKeyInput onKeySubmit={handleApiKeySubmit} />;
        }
        return (
            <main className="flex-grow container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <CodeInput
                    code={code}
                    setCode={setCode}
                    language={language}
                    setLanguage={setLanguage}
                    handleReview={handleReview}
                    isLoading={isLoading}
                />
                <ReviewOutput
                    review={review}
                    isLoading={isLoading}
                    error={error}
                />
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <Header hasApiKey={!!apiKey} onClearApiKey={handleClearApiKey} />
            {renderContent()}
        </div>
    );
};

export default App;
