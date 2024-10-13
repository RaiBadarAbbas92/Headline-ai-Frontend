"use client";
import { useState } from 'react';
import Navbar from '../components/navbar';

const Home = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{ user: 'Welcome to Copilot Chat!', bot: 'Hello!' }]);
    const [history, setHistory] = useState([{ id: 1, name: 'Conversation 1', messages: [{ user: 'What is Copilot?', bot: 'Your AI sidekick!' }] }]);
    const [currentChatId, setCurrentChatId] = useState(1);

    // Function to handle sending messages
    const handleSend = () => {
        if (input.trim()) {
            const newMessage = { user: input, bot: `Bot's reply to: ${input}` };
            setMessages([...messages, newMessage]);
            setInput('');
        }
    };

    // Function to handle starting a new conversation
    const handleNewChat = () => {
        const newChatId = history.length + 1;
        const newChat = { id: newChatId, name: `Conversation ${newChatId}`, messages: [] };

        // Add the new chat to the history and reset current messages
        setHistory([...history, newChat]);
        setMessages([]);
        setCurrentChatId(newChatId);  // Set the current chat to the new one
    };

    return (
        <>
        <Navbar/>
        <div className="flex h-[90vh]">
            {/* Conversation History Section */}
            <div className="w-1/4 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold mb-4">Conversation History</h2>
                {history.map(convo => (
                    <div 
                        key={convo.id} 
                        className={`mb-2 p-2 bg-white rounded shadow ${convo.id === currentChatId ? 'bg-blue-100' : ''}`}
                    >
                        <h3>{convo.name}</h3>
                    </div>
                ))}
                {/* New Chat Button */}
                <button 
                    onClick={handleNewChat} 
                    className="mt-4 p-2 bg-zinc-900 text-white rounded w-full"
                >
                    Start New Conversation
                </button>
            </div>

            {/* Main Chat Section */}
            <div className="w-3/4 flex flex-col">
                <div className="flex-grow p-4 overflow-y-scroll">
                    {messages.length === 0 ? (
                        <p className="text-center text-gray-500">No messages yet. Start a conversation!</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <p className="text-right"><strong>You:</strong> {msg.user}</p>
                                <p><strong>Bot:</strong> {msg.bot}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="p-4 bg-gray-100 flex">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-2 border rounded mr-2"
                    />
                    <button 
                        onClick={handleSend} 
                        className="p-2 bg-zinc-500 text-white rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div></>
    );
};

export default Home;


















