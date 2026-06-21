/**
 * Builds the prompt sent to the LLM. Keeping this in one place makes it easy
 * to tune the AI's behaviour without touching controller/service logic.
 */
export function buildIdeaPrompt({ idea, industry, targetUsers, region, budget }) {
  return `You are a sharp, realistic startup analyst and venture capitalist who has evaluated thousands of pitches.

Analyze the following startup idea critically and honestly (do not be overly positive):

Idea: ${idea}
Industry: ${industry || "Not specified"}
Target Users: ${targetUsers || "Not specified"}
Region: ${region || "India"}
Budget Level: ${budget || "Medium"}

Return ONLY valid JSON (no markdown fences, no commentary) matching EXACTLY this shape:

{
  "score": {
    "market": <number 1-10>,
    "feasibility": <number 1-10>,
    "innovation": <number 1-10>,
    "competition": "<Low|Medium|High>"
  },
  "swot": {
    "strengths": ["...", "..."],
    "weaknesses": ["...", "..."],
    "opportunities": ["...", "..."],
    "threats": ["...", "..."]
  },
  "businessModel": ["...", "..."],
  "mvpRoadmap": [
    { "week": "Week 1", "task": "..." },
    { "week": "Week 2", "task": "..." },
    { "week": "Week 3", "task": "..." },
    { "week": "Week 4", "task": "..." }
  ],
  "competitors": [
    { "name": "...", "strength": "...", "weakness": "..." }
  ],
  "pitch": {
    "problem": "...",
    "solution": "...",
    "marketSize": "...",
    "revenueModel": "...",
    "whyNow": "..."
  },
  "techStack": ["...", "..."]
}

Give 3-4 items for each list field. Be specific to the idea given, not generic.`;
}
