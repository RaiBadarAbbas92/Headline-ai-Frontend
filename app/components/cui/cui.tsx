"use client";
import { FaEdit } from "react-icons/fa";

const ChatInterface = ({ currentChat, input, setInput, handleSend, loading, isLoggedIn }) => {
    const predefinedQuestions = [
        "What is the latest news in technology?",
        "What’s happening in world politics?",
        "Tell me about the latest sports news.",
        "What are today’s top headlines?",
    ];

    const handlePredefinedQuestionClick = async (question) => {
        setInput(question);
        await handleSend(question);
    };

    return (
        <div className="w-3/4 flex flex-col">
            {!isLoggedIn ? (
                <div className="flex-grow flex justify-center items-center">
                    <h2 className="text-xl font-semibold">Please log in to chat with the CUI</h2>
                </div>
            ) : (
                <>
                    {currentChat?.messages?.length > 0 ? (
                        <div className="flex-grow p-4 overflow-y-scroll">
                            {currentChat.messages.map((msg, index) => (
                                <div key={index} className="mb-2">
                                    {msg.role === "user" ? (
                                        <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 mb-2">
                                            <p><strong>You:</strong> {msg.content}</p>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
                                            <p dangerouslySetInnerHTML={{ __html: msg.content }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-grow flex justify-center items-center">
                            <h2 className="text-lg font-semibold">No messages yet. Start the conversation!</h2>
                        </div>
                    )}
                    {currentChat?.messages?.length === 0 && (
                        <div className="p-4 flex space-x-4 justify-center">
                            {predefinedQuestions.map((question, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 border border-gray-300 rounded-full p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handlePredefinedQuestionClick(question)}
                                >
                                    {question}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex p-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-grow border border-gray-300 rounded-lg p-2"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={() => handleSend(input)}
                            className="bg-gray-500 text-white rounded-lg px-4 ml-2"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatInterface;
