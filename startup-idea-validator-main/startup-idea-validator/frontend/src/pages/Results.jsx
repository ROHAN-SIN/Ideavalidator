import { useLocation, useNavigate, Link } from "react-router-dom";
import VerdictGauge from "../components/VerdictGauge.jsx";
import ScoreCard from "../components/ScoreCard.jsx";
import SwotPanel from "../components/SwotPanel.jsx";
import ChipList from "../components/ChipList.jsx";
import MvpRoadmap from "../components/MvpRoadmap.jsx";
import Competitors from "../components/Competitors.jsx";
import InvestorPitch from "../components/InvestorPitch.jsx";
import Section from "../components/Section.jsx";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.result) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="text-muted mb-4">No analysis to show yet.</p>
        <Link to="/" className="text-accent hover:underline">
          Go submit an idea →
        </Link>
      </div>
    );
  }

  const { input, result } = state;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <p className="eyebrow text-accent2 mb-2">Verdict for</p>
          <h1 className="font-display text-2xl font-semibold max-w-2xl">{input?.idea}</h1>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="border border-border hover:border-accent text-sm rounded-lg px-4 py-2 transition-colors"
          >
            Export as PDF
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-accent text-ink text-sm font-medium rounded-lg px-4 py-2 hover:bg-accent/90 transition-colors"
          >
            Analyze another
          </button>
        </div>
      </div>

      <Section title="The verdict">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-center">
          <VerdictGauge {...result.score} />
          <ScoreCard score={result.score} />
        </div>
      </Section>

      <Section number="02" title="SWOT analysis">
        <SwotPanel swot={result.swot} />
      </Section>

      <Section number="03" title="Business model suggestions">
        <ChipList items={result.businessModel} tone="accent" />
      </Section>

      <Section number="04" title="MVP roadmap">
        <MvpRoadmap roadmap={result.mvpRoadmap} />
      </Section>

      <Section number="05" title="Competitor analysis">
        <Competitors competitors={result.competitors} />
      </Section>

      <Section number="06" title="Investor pitch">
        <InvestorPitch pitch={result.pitch} />
      </Section>

      <Section number="07" title="Suggested tech stack">
        <ChipList items={result.techStack} tone="mint" />
      </Section>
    </div>
  );
}
