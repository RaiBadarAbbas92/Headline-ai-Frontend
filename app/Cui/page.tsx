
"use client";
import { useState, useEffect, SetStateAction } from 'react';
import Navbar from '../components/navbar';

const Home = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { id: 1, name: 'Conversation 1', messages: [] },
        { id: 2, name: 'Conversation 2', messages: [] }
    ]);
    const [currentChatId, setCurrentChatId] = useState(1);
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const currentChat = history.find(convo => convo.id === currentChatId);

    const handleSend = async () => {
        if (input.trim() && token) {
            setLoading(true);
            const newMessage = { user: input };
            try {
                const response = await fetch('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/ai/call_agent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ query: input })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data from backend');
                }
                
                const data = await response.json();

            // Extract only the current bot reply, without merging with previous ones
                const botReply = data.messages[data.messages.length - 1].content;  // Get the last message (current bot reply)


                const updatedHistory = history.map(convo =>
                   convo.id === currentChatId
                        ? {
                             ...convo,
                             messages: [
                              ...convo.messages,  // Keep the previous messages intact
                                { user: input, bot: botReply } ] }: convo);
const currentConvo = updatedHistory.find(convo => convo.id === currentChatId);
const latestResponse = currentConvo?.messages.slice(-1)[0].bot;  // Get the last bot reply in the conversation

// Print only the latest bot reply for the current query
console.log(latestResponse);

                setHistory(updatedHistory);
                setInput('');
                setIsChatStarted(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleNewChat = () => {
        const newChatId = history.length + 1;
        const newChat = { id: newChatId, name: `Conversation ${newChatId}`, messages: [] };
        setHistory([...history, newChat]);
        setCurrentChatId(newChatId);
        setIsChatStarted(false);
    };

    const handleConversationClick = (convoId: SetStateAction<number>) => {
        setCurrentChatId(convoId);
        setIsChatStarted(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex h-[90vh]">
                <div className="w-1/4 bg-gray-200 p-4">
                    <h2 className="text-lg font-semibold mb-4">Conversation History</h2>
                    {history.map(convo => (
                        <div
                            key={convo.id}
                            className={`mb-2 p-2 bg-white rounded shadow cursor-pointer ${convo.id === currentChatId ? 'bg-blue-100' : ''}`}
                            onClick={() => handleConversationClick(convo.id)}
                        >
                            <h3>{convo.name}</h3>
                        </div>
                    ))}
                    <button
                        onClick={handleNewChat}
                        className="mt-4 p-2 bg-zinc-900 text-white rounded w-full"
                    >
                        Start New Conversation
                    </button>
                </div>
                <div className="w-3/4 flex flex-col ">
                    {!isLoggedIn ? (
                        <div className="flex-grow flex justify-center items-center">
                            <h2 className="text-xl font-semibold">Please log in to chat with the CUI</h2>
                        </div>
                    ) : (
                        <>
                            {currentChat?.messages.length > 0 ? (
                                <div className="flex-grow p-4 overflow-y-scroll">
                                    {currentChat.messages.map((msg, index) => (
                                        <div key={index} className="mb-2">
                                            <p className="text-right"><strong>You:</strong> {msg.user}</p>
                                            <p><strong>Bot:</strong> {msg.bot}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-grow flex justify-center items-center">
                                </div>
                            )}
                            <div className={`p-4 bg-gray-100 flex ${!isChatStarted && currentChat?.messages.length === 0 ? 'justify-center items-center h-[90vh]' : ''}`}>
                                <input
                                    type="text"
                                    placeholder='How can I help you today?'
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-grow p-2 border rounded-full "
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-2 bg-zinc-500 text-white rounded"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;

