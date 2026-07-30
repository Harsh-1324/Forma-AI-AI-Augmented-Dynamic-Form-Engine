# Forma AI — AI-Augmented Dynamic Form Engine

InsurTech / Workflow Automation project. Users describe a claim in plain
language ("I hit a deer on I-95 in my Honda, windshield shattered") and an
LLM extraction pipeline pre-fills a dynamically-rendered, branching React
form whose structure and validation rules live entirely in a MongoDB/PostgreSQL (prisma)
JSON schema.

## Repo name
`forma-ai`

## Stack
- **Frontend:** React, React Hook Form, Zustand (state), Vite
- **Backend:** Node.js, Express, LangChain, PostgreSQL/MongoDB (Mongoose)
- **AI:** Gemini (or local model) via LangChain structured output

## Monorepo layout
```
forma-ai/
├── server/     # Node.js + LangChain + MongoDB/PostgreSQL API
├── client/     # React + React Hook Form dynamic form engine
└── docs/       # architecture notes, sample schemas, API spec
```

## Quick start

### 1. Backend
```bash
cd server
cp .env.example .env      # fill in PostgreSQL/MONGO_URI and gemini_API_KEY
npm install
npm run seed               # loads docs/sample-form-schema.json into Mongo
npm run dev                 # http://localhost:5000
```

### 2. Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173
```

### 3. Docker (optional, runs Mongo + both services)
```bash
docker compose up --build
```

## Week-wise mapping

| Week | Backend | Frontend |
|------|---------|----------|
| 1 | `models/FormSchema.model.js`, `services/formEngine/conditionEvaluator.js` | `components/DynamicForm/DynamicFormRenderer.jsx`, `FieldFactory.jsx` |
| 2 | `services/langchain/*` | `components/MagicInput/*` |
| 3 | `controllers/extraction.controller.js`, `utils/mergeAIResultIntoForm` | `validation/buildYupSchema.js`, `AIReviewBanner.jsx` |
| 4 | `routes/formSubmission.routes.js` (save/resume) | `hooks/useAutosave.js`, `ConditionalSection.jsx` animations |

See `docs/architecture.md` and `docs/sample-form-schema.json` for the
3-level branching schema example used in the mid-project review.
