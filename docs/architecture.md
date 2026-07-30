# Architecture

## Data flow

1. User opens a claim form → client fetches `GET /api/form-schemas/:id`.
2. `DynamicFormRenderer` walks `schema.sections[].fields[]` and renders
   inputs via `FieldFactory`, hiding fields whose `showIf` condition
   (evaluated client-side by `evaluateShowIf.js`) isn't met.
3. User types a free-text story into `MagicInputBox` →
   `POST /api/extract { formSchemaId, text }`.
4. Backend `extraction.controller.js` loads the schema, builds a field
   spec (`schemaToPrompt.js`), and calls `runExtractionChain` (LangChain +
   GeminiAI) to get back strict JSON matching the schema's field keys.
5. Client merges the returned `extractedFields` into React Hook Form via
   `mergeAIResultIntoForm.js`, and highlights `lowConfidenceFields` using
   `AIReviewBanner`.
6. As the user edits fields, `ConditionalSection` smoothly expands/collapses
   newly-revealed branches; `useAutosave` periodically calls
   `PATCH /api/form-submissions/:id` to persist progress to MongoDB.
7. On submit, the server re-validates only the *visible* fields
   (`schemaValidator.js` + `conditionEvaluator.js`) before marking the
   submission `submitted`.

## Why validation logic exists on both client and server

- **Client (`evaluateShowIf.js` + RHF resolver):** instant UX feedback,
  hides/shows sections without a round trip.
- **Server (`conditionEvaluator.js` + `schemaValidator.js`):** source of
  truth — never trust the client's view of which fields were "required".
  Both implementations follow the same `showIf` rule shape so schema
  authors only write branching logic once.

## Extending to a new form type

Add a new document to the `formschemas` collection (see
`docs/sample-form-schema.json` for the shape) — no frontend code changes
are needed since the renderer is 100% schema-driven.
