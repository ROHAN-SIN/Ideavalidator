import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    idea: { type: String, required: true },
    industry: { type: String, default: "General" },
    targetUsers: { type: String, default: "" },
    region: { type: String, default: "India" },
    budget: { type: String, default: "Medium" },
    result: {
      score: {
        market: Number,
        feasibility: Number,
        innovation: Number,
        competition: String,
      },
      swot: {
        strengths: [String],
        weaknesses: [String],
        opportunities: [String],
        threats: [String],
      },
      businessModel: [String],
      mvpRoadmap: [
        {
          week: String,
          task: String,
        },
      ],
      competitors: [
        {
          name: String,
          strength: String,
          weakness: String,
        },
      ],
      pitch: {
        problem: String,
        solution: String,
        marketSize: String,
        revenueModel: String,
        whyNow: String,
      },
      techStack: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Idea", ideaSchema);
