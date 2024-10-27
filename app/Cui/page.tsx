
"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ConversationHistory from "../components/cui/sidebar";
import ChatInterface from "../components/cui/cui";
import Navbar from '../components/Landingpage/navbar';

const Home = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            fetchUserId();
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
    });

    const fetchUserId = async () => {
        try {
            const response = await axiosInstance.get('http://127.0.0.1:8080/user/get_current_user_details/');
            const { id } = response.data;
            setUserId(id);
            fetchUserConversations(id);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const fetchUserConversations = async (userId) => {
        try {
            const response = await axiosInstance.get(`http://127.0.0.1:8080/history/get_all_user_conversations/${userId}`);
            
            const conversations = response.data.map((conversation, index) => ({
                id: conversation.conversation_id,
                name: `Conversation ${index + 1}`,
                isActive: conversation.is_active,
                createdAt: conversation.created_at,
                messages: [] // Initialize with an empty messages array
            }));
    
            setHistory(conversations);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };
    
    const fetchConversationHistory = async (conversationId) => {
        try {
            const response = await axiosInstance.get(`http://127.0.0.1:8080/history/get_conversation_history/${conversationId}`);
            console.log(`Fetched history for conversation ID: ${conversationId}`, response.data); // Log the full response
            
            // Extract messages from the response and format them
            const messages = response.data.messages.map(message => ({
                role: message.role,
                content: message.content,
                createdAt: message.created_at
            }));

            return messages;
        } catch (error) {
            console.error(`Error fetching history for conversation ${conversationId}:`, error);
            return [];
        }
    };
    
    const handleSend = async (message) => {
        if (message.trim() && token) {
            setLoading(true);

            try {
                const response = await axiosInstance.post(
                    "http://127.0.0.1:8080/ai/call_agent",
                    { query: message }
                );
                const aiMessage = response.data.messages[response.data.messages.length - 1];

                if (aiMessage?.role === "ai") {
                    const formattedMessage = formatResponse(aiMessage.content);
                    const updatedHistory = history.map((convo) =>
                        convo.id === currentChatId
                            ? {
                                ...convo,
                                messages: [
                                    ...convo.messages,
                                    { role: "user", content: message },
                                    { role: "ai", content: formattedMessage },
                                ],
                            }
                            : convo
                    );

                    setHistory(updatedHistory);
                    setInput("");
                    await saveMessage("user", message);
                    await saveMessage("ai", formattedMessage);
                    console.log("Message sent successfully:", message); // Success log
                    console.log(`Message saved in conversation ID: ${currentChatId}`); // Log the conversation ID
                }
            } catch (error) {
                console.error("Error fetching data:", error); // Error log
            } finally {
                setLoading(false);
            }
        }
    };

    const formatResponse = (response) => {
        return response
            .replace(/### (.+)/g, '<h2 class="font-bold text-lg mt-4 mb-2">$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
    };

    const handleNewChat = async () => {
        if (!userId) {
            console.error("User ID is not available. Cannot start a new conversation.");
            return;
        }

        try {
            const response = await axiosInstance.post('https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/history/start_new_conversation/', { userId });
            const { conversation_id } = response.data;

            const newConversation = {
                id: conversation_id,
                name: `Conversation ${history.length + 1}`,
                messages: []
            };

            setHistory(prev => [...prev, newConversation]);
            setCurrentChatId(conversation_id);
            console.log("New conversation started successfully:", newConversation); // Success log
        } catch (error) {
            console.error('Error starting a new conversation:', error); // Error log
        }
    };

    const handleConversationClick = async (id) => {
        setCurrentChatId(id);
        console.log(`Opening conversation ID: ${id}`); // Log the conversation ID being opened
        
        // Fetch the conversation history when the conversation is clicked
        const conversationHistory = await fetchConversationHistory(id);
        
        // Update the current conversation with fetched messages
        setHistory(prevHistory =>
            prevHistory.map(convo =>
                convo.id === id ? { ...convo, messages: conversationHistory } : convo
            )
        );
    };
    
    const saveMessage = async (role, content) => {
        try {
            await axiosInstance.post(`http://127.0.0.1:8080/history/add_message/${currentChatId}`, { role, content });
            console.log("Message saved successfully:", content); // Success log
            console.log(`Message saved in conversation ID: ${currentChatId}`); // Log the conversation ID
        } catch (error) {
            console.error("Error saving message:", error.response?.data || error.message); // Error log
        }
    };

    const currentChat = history.find((convo) => convo.id === currentChatId);

    return (
        <>
        <div className="flex h-screen">
            <ConversationHistory 
                history={history}
                currentChatId={currentChatId}
                onConversationClick={handleConversationClick}
                onNewChat={handleNewChat}
            />
            <ChatInterface
                currentChat={currentChat}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                loading={loading}
                isLoggedIn={isLoggedIn}
            />
        </div></>
    );
};

export default Home;
