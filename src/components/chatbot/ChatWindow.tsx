"use client";

import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
    messages: { role: "user" | "bot"; text: string }[];
    input: string;
    setInput: (val: string) => void;
    sendMessage: () => void;
    loading: boolean;
    closeWindow: () => void;
}

export default function ChatWindow({
    messages,
    input,
    setInput,
    sendMessage,
    loading,
    closeWindow,
}: ChatWindowProps) {
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="fixed bottom-20 right-6 w-80 h-[450px] border border-white/30 bg-black/10 backdrop-blur-[12px] text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
            {/* Header */}
            <div className="px-4 pt-3 pb-8 flex justify-between items-center rounded-lg">
                <span className="text-xs">✨IYKE's AI PORTFOLIO ASSIST</span>
                <button onClick={closeWindow} className="text-gray-400 cursor-pointer hover:text-white">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {messages.map((msg, i) => (
                    <MessageBubble key={i} role={msg.role} text={msg.text} />
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="px-4 py-2 bg-white/10 rounded-2xl rounded-bl-none  text-sm text-gray-400/70 animate-pulse">
                            Typing...
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} loading={loading} />
        </div>
    );
}
