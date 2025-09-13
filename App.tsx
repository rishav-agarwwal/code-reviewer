
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';
import { LANGUAGES } from './constants';

const App: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>(LANGUAGES[0]);
    const [review, setReview] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleReview = useCallback(async () => {
        if (!code.trim()) {
            setError("Please enter some code to review.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setReview('');

        try {
            const result = await reviewCode(code, language);
            setReview(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(`An error occurred: ${err.message}. Please check your API key and try again.`);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [code, language]);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <Header />
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
        </div>
    );
};

export default App;
