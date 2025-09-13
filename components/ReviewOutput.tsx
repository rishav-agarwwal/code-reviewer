
import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';

interface ReviewOutputProps {
    review: string;
    isLoading: boolean;
    error: string | null;
}

const WelcomeMessage: React.FC = () => (
    <div className="text-center text-slate-400 flex flex-col items-center justify-center h-full">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-lg font-semibold text-slate-300">Ready for Review</h3>
        <p>Paste your code on the left, select the language, and click "Review Code" to get started.</p>
    </div>
);


export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        if(review) {
            navigator.clipboard.writeText(review);
            setCopied(true);
        }
    }

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }
        if (error) {
            return (
                <div className="text-center text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
                    <p>{error}</p>
                </div>
            );
        }
        if (review) {
            return (
                <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-pre:bg-slate-900/70 prose-pre:rounded-md prose-pre:p-4">
                   <div dangerouslySetInnerHTML={{ __html: review.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="language-$1"><code>$2</code></pre>').replace(/\n/g, '<br />') }} />
                </div>
            );
        }
        return <WelcomeMessage />;
    };

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 relative min-h-[300px] lg:min-h-0 lg:h-full flex flex-col">
            {review && !isLoading && (
                 <button 
                    onClick={handleCopy}
                    className="absolute top-4 right-4 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-mono px-3 py-1.5 rounded-md transition"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            )}
            <div className="flex-grow overflow-y-auto pr-2">
                 {renderContent()}
            </div>
        </div>
    );
};
