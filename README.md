# 🚀 Forma AI 

> **An AI-Augmented Dynamic Form Engine for InsurTech and Workflow Automation.**
---

## 📖 Abstract
**Forma AI** is a comprehensive full-stack web application designed to streamline complex data entry workflows in the InsurTech space. By leveraging Large Language Models (LLMs), the system allows users to describe a claim in plain language (e.g., *"I hit a deer on I-95 in my Honda, windshield shattered"*). An advanced extraction pipeline then processes this text to accurately pre-fill a dynamically rendered, branching React form. The form's structure, nested conditionals, and validation rules are entirely driven by a robust JSON schema managed via PostgreSQL and Prisma.

## 🎯 Problem Statement & Solution
- **The Problem:** Traditional insurance claim forms and enterprise data entry systems are rigid, excessively long, and time-consuming. Users often abandon forms or enter inaccurate data due to the cognitive load of navigating irrelevant fields.
- **The Solution:** Forma AI introduces a "Magic Input" paradigm. By allowing users to naturally describe their situation, the AI instantly structures the data. The UI then dynamically generates only the necessary follow-up fields based on a 3-level deep branching logic schema, significantly reducing friction and processing time.

## ✨ Key Features
*   **Intelligent Extraction Pipeline:** Utilizes LangChain and Gemini to parse unstructured narrative text into strict JSON matching the active form schema.
*   **Dynamic Form Engine:** Built with React Hook Form to dynamically render text, dates, dropdowns, and checkboxes based on database-driven schemas.
*   **Complex Branching Logic:** Evaluates nested `showIf` conditions on the fly to reveal or hide form sections dynamically, complete with Framer Motion UI animations.
*   **Smart Validation & Review:** Highlights low-confidence AI extractions with review banners and visual indicators, ensuring data integrity before submission.
*   **Resilient State Management:** Features debounced auto-saving capabilities to capture draft states seamlessly without overwhelming the database.

## 🛠 Tech Stack
- **Frontend:** React, React Hook Form, Zustand (State Management), Framer Motion, Vite
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL
- **AI / NLP:** Gemini API, LangChain (Structured Output)

## ⚙️ System Architecture
The backend is structured using enterprise-grade Node.js patterns to ensure high scalability and maintainability. 
*   **Decoupled Services:** Database query operations and LLM extraction logic are isolated into dedicated service layers (`/services`), moving away from tightly coupled monolithic controllers.
*   **Schema-Driven UI:** The frontend acts as a rendering engine, entirely agnostic of specific form fields until it receives the structured JSON configuration from the PostgreSQL database.

## 🔮 Future Scope
*   **Live Analytics Dashboard:** Implementation of real-time submission metrics and aggregation charts.
*   **Visual Drag-and-Drop Form Builder:** An administrative canvas utilizing `@dnd-kit/core` to visually design schemas and save custom form configurations.
*   **Interactive LLM Assistant Panel:** A contextual side-drawer chat interface to guide users through complex claim scenarios based on the active form state.
