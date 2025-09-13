
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function reviewCode(code: string, language: string): Promise<string> {
    const prompt = `
        Act as an expert senior software engineer and a meticulous code reviewer.
        Provide a detailed, constructive code review for the following ${language} code.
        Your feedback should be professional, insightful, and helpful for a developer looking to improve their skills.

        Structure your review in Markdown format with the following sections:
        - **Overall Impression:** A brief summary of the code's quality.
        - **Bugs & Potential Issues:** Identify any bugs, logic errors, or edge cases that might not be handled.
        - **Best Practices & Code Smell:** Point out deviations from best practices, code smells, or anti-patterns.
        - **Suggestions for Improvement:** Offer specific, actionable suggestions for refactoring and improving the code. Provide corrected code snippets where helpful.
        - **Clarity & Readability:** Comment on the code's readability and maintainability.

        Here is the code to review:
        \`\`\`${language.toLowerCase()}
        ${code}
        \`\`\`
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
}
