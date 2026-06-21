# Verdict — AI Startup Idea Validator (MERN Stack)

A full-stack SaaS app where a user submits a startup idea and an AI (acting as
a venture analyst) returns a market score, SWOT analysis, business model
suggestions, an MVP roadmap, competitor analysis, an investor pitch, and a
suggested tech stack.

**Stack:** MongoDB · Express · React (Vite + Tailwind) · Node.js · OpenAI/Gemini (optional)

---

## 1. What's inside

```
startup-idea-validator/
├── backend/         Express API + MongoDB models + AI service
└── frontend/         React app (Vite + Tailwind CSS)
```

The AI layer has **3 modes**, controlled by `AI_PROVIDER` in `backend/.env`:

| Mode     | Needs an API key? | Behaviour                                   |
|----------|--------------------|----------------------------------------------|
| `mock`   | No                 | Returns realistic dummy analysis instantly. Use this to demo/test the whole app with zero setup. |
| `openai` | Yes (`OPENAI_API_KEY`) | Calls OpenAI's chat completions API.    |
| `gemini` | Yes (`GEMINI_API_KEY`) | Calls Google's Gemini API.              |

The app ships configured in `mock` mode, so it is **fully runnable immediately** — no API key, even no MongoDB, required to see it working end-to-end (you just won't get saved history without MongoDB).

---

## 2. Prerequisites

- Node.js 18+ and npm
- (Optional) MongoDB running locally, or a free MongoDB Atlas connection string — only needed if you want submitted ideas saved to a history
- (Optional) An OpenAI or Gemini API key — only needed for real AI responses instead of mock data

---

## 3. Setup — Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and adjust if needed:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/idea-validator
AI_PROVIDER=mock          # change to "openai" or "gemini" once you have a key
OPENAI_API_KEY=
GEMINI_API_KEY=
CLIENT_URL=http://localhost:5173
```

Run it:

```bash
npm run dev      # uses nodemon, auto-restarts
# or
npm start
```

You should see:

```
🚀 Server running on http://localhost:5000
   AI provider: mock
```

Test it directly:

```bash
curl http://localhost:5000/api/health
```

---

## 4. Setup — Frontend

In a **second terminal**:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`). Fill the idea form
and click **"Get the verdict"** — you'll be taken to a results page with the
full breakdown.

---

## 5. Switching on real AI (optional)

1. Get an API key:
   - OpenAI: https://platform.openai.com/api-keys
   - Gemini: https://aistudio.google.com/apikey
2. In `backend/.env`, set `AI_PROVIDER=openai` (or `gemini`) and paste the key.
3. Restart the backend (`npm run dev`).

No frontend changes needed — the React app doesn't know or care which AI
provider is being used.

---

## 6. Switching on MongoDB (optional, for saved history)

1. Install MongoDB locally, or create a free cluster at https://www.mongodb.com/cloud/atlas
2. Put the connection string in `backend/.env` as `MONGO_URI`.
3. Restart the backend. Every analyzed idea is now saved.
4. `GET /api/idea/history` returns the last 20 analyzed ideas;
   `GET /api/idea/:id` returns one specific saved analysis.

If MongoDB isn't reachable, the app still works fully — it just logs a
warning and skips saving (each analysis still renders normally).

---

## 7. API reference

### `POST /api/idea/analyze`
```json
{
  "idea": "AI based food delivery app for rural India",
  "industry": "FoodTech",
  "targetUsers": "Rural households",
  "region": "India",
  "budget": "Medium"
}
```
Returns the full analysis object (score, swot, businessModel, mvpRoadmap, competitors, pitch, techStack).

### `GET /api/idea/history`
Returns the last 20 saved analyses (requires MongoDB).

### `GET /api/idea/:id`
Returns one saved analysis by id.

---

## 8. Deployment

- **Backend:** Render, Railway, or any Node host. Set the same env vars as `.env`.
- **Frontend:** Vercel or Netlify. Set `VITE_API_URL` to your deployed backend's `/api` URL.
- **Database:** MongoDB Atlas free tier works well for both demo and small-scale production.

---

## 9. Notes for presenting this project

This project is intentionally structured the way a real SaaS product would
be: separated concerns (controllers/services/models), an AI layer that's
swappable between providers (and mockable for development), structured JSON
output from the LLM, and a UI that maps 1:1 to that JSON. That structure is
worth explaining out loud if you're presenting or interviewing with this
project — it's the part that shows engineering judgment, not just that "AI
was called."
