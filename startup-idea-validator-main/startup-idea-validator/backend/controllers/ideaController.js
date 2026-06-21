import Idea from "../models/Idea.js";
import { analyzeIdea } from "../services/aiService.js";

export const analyze = async (req, res) => {
  try {
    const { idea, industry, targetUsers, region, budget } = req.body;

    if (!idea || !idea.trim()) {
      return res.status(400).json({ message: "Startup idea text is required." });
    }

    const result = await analyzeIdea({ idea, industry, targetUsers, region, budget });

    // Save to DB if connected (fails silently if MongoDB isn't configured)
    let savedId = null;
    try {
      const doc = await Idea.create({ idea, industry, targetUsers, region, budget, result });
      savedId = doc._id;
    } catch (dbErr) {
      console.warn("Could not save idea to DB:", dbErr.message);
    }

    res.status(200).json({ id: savedId, ...result });
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ message: "Failed to analyze idea.", error: err.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history.", error: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const doc = await Idea.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch idea.", error: err.message });
  }
};
