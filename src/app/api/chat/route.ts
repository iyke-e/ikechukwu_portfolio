import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import fs from "fs";
import path from "path";

const client = new InferenceClient(process.env.HF_API_KEY || "");

// Load portfolio content
const portfolioPath = path.join(process.cwd(), "/pfcontent.json");
const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, "utf-8"));

// Predefined casual replies
const casualReplies: Record<string, string> = {
  okay: "👍 Got it!",
  ok: "👍 Got it!",
  alright: "👌 Sure thing!",
  thanks: "You're welcome! 😊",
  "thank you": "You're welcome! 😊",
  "got it": "Great! ✅",
  "i'll get back to you": "No problem, take your time!",
  "that's all": "Alright! Glad I could help.",
  "sounds good": "👍 Sounds good!",
  cool: "😎 Cool!",
  great: "Awesome! 🎉",
  nice: "Thanks! 😊",
  sure: "Sure thing! 👍",
  perfect: "Perfect! ✅",
  yep: "Got it! 👍",
  yeah: "Alright! 😊",
  "no worries": "No worries! 👍",
  "okay then": "Okay! 👌",
  "thanks a lot": "You're very welcome! 😊",
  "thank you very much": "Anytime! 😄",
  awesome: "Glad you think so! 😃",
  "alright then": "Alright! 👍",
  understood: "Understood! ✅",
  roger: "Roger that! 👍",
  "cool thanks": "You're welcome! 😎",
  "ok thanks": "Anytime! 😊",
  "thanks ok": "Sure thing! 👍",
  gotcha: "Got it! ✅",
  "oh okay": "👌 Got it!",
  fine: "Alright! 😊",
  good: "Glad to hear! 😄",
  "great job": "Thank you! 😊",
  "well done": "Thanks! 😃",
  alrighty: "Alrighty! 👍",
  "sounds fine": "Sounds good! 👍",
  "thanks friend": "You're welcome, friend! 😊",
  okie: "Okie! 👍",
  "ok then": "Alright then! ✅",
  "no problem": "No problem at all! 😄",
  "thanks mate": "You're welcome! 😎",
  "appreciate it": "Glad to help! 😊",
  "thanks much": "Anytime! 👍",
  "thank you mate": "You're very welcome! 😃",
  "ok sure": "Ok sure! 👍",
  "ok cool": "Cool! 😎",
  "got it thanks": "Great! ✅",
  "alright thanks": "You're welcome! 😊",
  "thanks ok then": "Sure thing! 👍",
  "ok got it": "Got it! ✅",
};

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const normalized = message.trim().toLowerCase();

    // Check if message matches casual remarks
    for (const key in casualReplies) {
      if (normalized.includes(key)) {
        return NextResponse.json({ reply: casualReplies[key] });
      }
    }

    // Flatten all skill categories into a single array
    const allSkills = Object.values(portfolioData.skills).flat();

    // Construct the system message for the AI
    const systemMessage = {
      role: "system",
      content: `
You are a chatbot that ONLY answers questions about Ikechukwu's portfolio.
Use the following information to answer:

About: ${portfolioData.about}

Projects:
${portfolioData.projects
  .map((p: any) => `${p.name}: ${p.description}`)
  .join("\n")}

Skills: ${allSkills.join(", ")}

Contact:
${
  portfolioData.contact
    ? `
Email: ${portfolioData.contact.email}
Phone: ${portfolioData.contact.phone}
LinkedIn: ${portfolioData.contact.linkedin}
GitHub: ${portfolioData.contact.github}
Twitter: ${portfolioData.contact.twitter}
`
    : "No contact info provided."
}

Rules:
- Only answer questions about Blessing and his portfolio.
- If asked unrelated questions, reply: "I can only answer questions about Blessing."
`,
    };

    // AI chat completion call
    const res = await client.chatCompletion({
      model: "meta-llama/Llama-3.3-70B-Instruct",
      messages: [systemMessage, { role: "user", content: message }],
    });

    return NextResponse.json({
      reply: res.choices?.[0]?.message?.content || "No reply",
    });
  } catch (error: any) {
    console.error("HF API Error:", error);
    return NextResponse.json(
      { reply: "Error generating response" },
      { status: 500 }
    );
  }
}
