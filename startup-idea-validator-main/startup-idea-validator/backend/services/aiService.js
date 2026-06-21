import fetch from "node-fetch";
import { buildIdeaPrompt } from "../utils/promptBuilder.js";

/**
 * Strips ```json fences etc. and safely parses the model's JSON output.
 */
function safeParseJSON(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("AI returned invalid JSON: " + err.message);
  }
}

/**
 * Realistic dummy response so the app is fully testable with ZERO API keys.
 * Switch AI_PROVIDER to "openai" or "gemini" in .env once you have a key.
 */
function getMockResult({ idea, industry, region }) {
  return {
    score: { market: 7.8, feasibility: 7, innovation: 6.5, competition: "Medium" },
    swot: {
      strengths: [
        `Clear value proposition for "${idea.slice(0, 40)}..."`,
        "Low initial infrastructure cost",
        "Addresses a recurring user pain point",
      ],
      weaknesses: [
        "No proprietary technology / easy to copy",
        "Requires trust-building in a new market",
      ],
      opportunities: [
        `Growing digital adoption in ${region || "the target region"}`,
        `Underserved niche within ${industry || "this industry"}`,
      ],
      threats: ["Well-funded competitors could enter quickly", "Regulatory changes"],
    },
    businessModel: ["Freemium", "Subscription", "Commission-based"],
    mvpRoadmap: [
      { week: "Week 1", task: "User auth + basic UI" },
      { week: "Week 2", task: "Core feature build" },
      { week: "Week 3", task: "Payment integration" },
      { week: "Week 4", task: "Testing + launch" },
    ],
    competitors: [
      { name: "Existing Player A", strength: "Strong brand trust", weakness: "Outdated UX" },
      { name: "Existing Player B", strength: "Large user base", weakness: "High pricing" },
    ],
    pitch: {
      problem: `Users in ${region || "this market"} lack an easy way to solve the core problem behind "${idea.slice(0, 60)}".`,
      solution: "A focused, mobile-first product that removes the friction in the current workflow.",
      marketSize: "Multi-billion dollar addressable market, growing with internet penetration.",
      revenueModel: "Subscription + transaction fees.",
      whyNow: "Smartphone and payment-rail adoption have hit a tipping point.",
    },
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "OpenAI API"],
  };
}

async function callOpenAI(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI API error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return safeParseJSON(data.choices[0].message.content);
}

async function callGemini(prompt) {
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  if (!res.ok) throw new Error(`Gemini API error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return safeParseJSON(data.candidates[0].content.parts[0].text);
}

/**
 * Main entry point used by the controller.
 */
export async function analyzeIdea(payload) {
  const provider = (process.env.AI_PROVIDER || "mock").toLowerCase();
  const prompt = buildIdeaPrompt(payload);

  if (provider === "openai" && process.env.OPENAI_API_KEY) {
    return callOpenAI(prompt);
  }
  if (provider === "gemini" && process.env.GEMINI_API_KEY) {
    return callGemini(prompt);
  }
  // Fallback: mock provider, or misconfigured keys
  return getMockResult(payload);
}
