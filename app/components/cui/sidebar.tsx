"use client";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const ConversationHistory = ({ history, currentChatId, onConversationClick, onNewChat }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState(null);

    return (
        <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
            <button onClick={onNewChat} className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4">New Chat</button>
            {history.map((convo) => (
                <div
                    key={convo.id}
                    onClick={() => onConversationClick(convo.id)}
                    className={`p-2 cursor-pointer rounded-lg ${currentChatId === convo.id ? 'bg-gray-200' : 'hover:bg-gray-300'}`}
                >
                    {convo.name || `Conversation ${convo.id}`}
                </div>
            ))}
        </div>
    );
};

export default ConversationHistory;
