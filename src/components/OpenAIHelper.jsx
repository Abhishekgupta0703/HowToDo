import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {  FileQuestion} from 'lucide-react'

const genAI = new GoogleGenerativeAI("AIzaSyAo9nKNiHeLLY0g0szgTWNesu-pP0aeuW0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const OpenAIHelper = ({ taskText, taskId, updateAdvice, handleError }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [advice, setAdvice] = useState("");

    const getAdvice = async () => {
        try {
            setLoading(true);
            setError(""); // Clear any previous errors
            const prompt = `How to complete this task: ${taskText}. Write in simple and short steps`;
            const result = await model.generateContent(prompt);
            const formattedAdvice = formatAdvice(result.response.text());
            setAdvice(formattedAdvice);
            updateAdvice(taskId, formattedAdvice);  // Update the task with the generated advice

            // Clear the error once the advice is fetched
            handleError(taskId, ""); // Reset the error for this task
        } catch (err) {
            setError("Failed to fetch advice. Please try again later.");
            handleError(taskId, "Failed to fetch advice. Please try again later."); // Pass the error to the parent
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatAdvice = (text) => {
        // Format the advice text with appropriate HTML structure (headings, bullet points, etc.)
        return text;
    };

    return (
        <div>
            <button
                onClick={getAdvice}
                className="py-1.5 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? "..." : <FileQuestion size={20} className="text-white"/>}
            </button>
            
        </div>
    );
};

export default OpenAIHelper;
