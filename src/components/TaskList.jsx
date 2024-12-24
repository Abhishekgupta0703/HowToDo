import React, { useState } from 'react';
import OpenAIHelper from './OpenAIHelper';
import { motion, AnimatePresence } from "framer-motion"
import { Check, Trash2,  CircleX} from 'lucide-react'

const TaskList = ({ tasks, toggleComplete, deleteTask, updateAdvice }) => {
    const [taskErrors, setTaskErrors] = useState({});  // State to track errors for each task

    const formatAdvice = (advice) => {
        // 1. Bold (replace **text** with <strong>text</strong>)
        advice = advice.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        // 2. Italics (replace *text* with <em>text</em>)
        advice = advice.replace(/\*(.*?)\*/g, "<em>$1</em>");

        // 3. Headings (replace # Heading with <h1>Heading</h1>)
        advice = advice.replace(/^(#{1,6})\s*(.*)$/gm, (match, hashes, heading) => {
            const level = hashes.length;
            return `<h${level}>${heading}</h${level}>`;
        });

        // 4. Lists (unordered - replace - Item with <ul><li>Item</li></ul>)
        advice = advice.replace(/^\s*-\s+(.*)$/gm, "<ul><li>$1</li></ul>");

        // 5. Ordered Lists (replace 1. Item with <ol><li>Item</li></ol>)
        advice = advice.replace(/^\s*\d+\.\s+(.*)$/gm, "<ol><li>$1</li></ol>");

        // 6. Links (replace [text](url) with <a href="url">text</a>)
        advice = advice.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2">$1</a>');

        // 7. Paragraphs (wrap remaining plain text in <p> tags)
        advice = advice.replace(/([^\n]+(?:\n|$))/g, "<p>$1</p>");

        return advice;
    };

    // Update the task error state when error occurs
    const handleError = (taskId, errorMessage) => {
        setTaskErrors(prevState => ({
            ...prevState,
            [taskId]: errorMessage
        }));
    };

    return (
        <AnimatePresence>
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <motion.li
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        key={task.id}
                        className={`flex flex-col items-center bg-white bg-opacity-50 rounded-lg px-2 py-1 mb-2 ${task.completed ? 'bg-green-100' : 'bg-white'
                            }`}
                    >
                        <div className='flex justify-between items-center w-full'>
                            <div className="flex items-start gap-2">
                                <button
                                    type="checkbox"

                                    onClick={() => toggleComplete(task.id)}
                                    className={`mr-2 py-1.5 px-2 rounded-md ${task.completed ? 'bg-gray-300 hover:bg-gray-400' : ' bg-green-500 hover:bg-green-600'}`}
                                ><Check size={20} className="text-white " /></button>
                                <span
                                    className={`flex-grow items-center m-auto text-md text-black ${task.completed ? 'line-through text-gray-500' : ''
                                        }`}
                                >
                                    {task.text}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="bg-red-500 hover:bg-red-600 py-1.5 px-2 rounded-md"
                                >
                                    <Trash2 size={20} className="text-white" />
                                </button>
                                <OpenAIHelper
                                    taskText={task.text}
                                    updateAdvice={updateAdvice}
                                    taskId={task.id}
                                    handleError={handleError}  // Pass the handleError function down
                                />
                            </div>
                        </div>

                        {/* Error message for this specific task */}
                        {taskErrors[task.id] && (
                            <div className="mt-4 text-red-500">
                                <p>{taskErrors[task.id]}</p>
                            </div>
                        )}

                        {task.advice && (
                            <div className="w-full mt-2 bg-indigo-200 py-2 px-3 rounded text-slate-700">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold mb-2">Advice:</h3>
                                    <button
                                        onClick={() => updateAdvice(task.id, "")} // Clear the advice for the task
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                                    >
                                        <CircleX size={20}/>
                                    </button>
                                </div>
                                <div
                                    className="advice-content"
                                    dangerouslySetInnerHTML={{ __html: formatAdvice(task.advice) }}
                                ></div>
                            </div>
                        )}

                    </motion.li>
                ))}
            </ul>
        </AnimatePresence>
    );
};

export default TaskList;
