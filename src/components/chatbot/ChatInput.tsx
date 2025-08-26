"use client";

import React from "react";
import { IoMdSend } from "react-icons/io";
interface ChatInputProps {
    input: string;
    setInput: (val: string) => void;
    sendMessage: () => void;
    loading: boolean;
}

export default function ChatInput({ input, setInput, sendMessage, loading }: ChatInputProps) {
    return (
        <div className="p-3 border-gray-700 flex items-center gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about Ikechukwu..."
                className="flex-1 bg-white/30 font-thin  text-sm text-white rounded-full px-4 py-2 focus:outline-none"
            />


            <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-white/50 grid place-content-center p-2 rounded-full hover:bg-white/70 disabled:opacity-50"
            >
                <IoMdSend />
            </button>
        </div>
    );
}
