"use client";

import React, { useState } from "react";
import { MdMessage } from "react-icons/md";
import ChatWindow from "./ChatWindow";

export default function Chatbot() {
    const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input } as { role: "user" | "bot"; text: string };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.text }),
            });

            const data = await res.json();

            // Declare splitMessages BEFORE using it
            const splitMessages: { role: "user" | "bot"; text: string }[] = data.reply
                .split("\n")
                .filter((text: string) => text.trim() !== "")
                .map((text: string) => ({ role: "bot", text }));

            // Type prev explicitly to fix TS error
            setMessages((prev: { role: "user" | "bot"; text: string }[]) => [
                ...prev,
                ...splitMessages,
            ]);
        } catch (err) {
            console.error(err);
            setMessages((prev: { role: "user" | "bot"; text: string }[]) => [
                ...prev,
                { role: "bot", text: "⚠️ Error fetching response" },
            ]);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* Floating chat button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full cursor-pointer transition duration-[0.7s] bg-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white/30 hover:scale-110"
            >
                <MdMessage size={24} />
            </button>

            {/* Chat window */}
            {open && (
                <ChatWindow
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    loading={loading}
                    closeWindow={() => setOpen(false)}
                />
            )}
        </>
    );
}
