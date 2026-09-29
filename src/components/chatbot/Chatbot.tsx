"use client";

import React, { useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
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

            const splitMessages: { role: "user" | "bot"; text: string }[] = data.reply
                .split("\n")
                .filter((text: string) => text.trim() !== "")
                .map((text: string) => ({ role: "bot", text }));

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
            {/* Junca-style Minimal Floating Trigger */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle interactive AI portfolio assistant"
                className="fixed bottom-6 right-6 z-50 px-3.5 py-2 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)] hover:bg-[var(--surface-hover)] shadow-lg flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
                <span>{open ? "Close AI" : "AI Agent"}</span>
                {open ? <FiX className="w-3.5 h-3.5 text-[var(--fg)]" /> : <FiMessageSquare className="w-3.5 h-3.5 text-[var(--fg-3)]" />}
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
