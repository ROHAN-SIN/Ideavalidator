const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function analyzeIdea(payload) {
  const res = await fetch(`${BASE_URL}/idea/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Something went wrong while analyzing the idea.");
  }
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/idea/history`);
  if (!res.ok) throw new Error("Could not load history.");
  return res.json();
}
