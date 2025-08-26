"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
    role: "user" | "bot";
    text: string;
}

export default function MessageBubble({ role, text }: MessageBubbleProps) {
    return (
        <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
            <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm break-words whitespace-pre-wrap ${role === "user"
                    ? "bg-white/20 rounded-br-none"
                    : "bg-white/10 rounded-bl-none"
                    }`}
            >
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    );
}
