# API Spec (v1)

Base URL: `http://localhost:5000/api`

## Auth
| Method | Path | Body | Description |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | Create a user |
| POST | `/auth/login` | `{ email, password }` | Returns `{ token }` |

## Form Schemas
| Method | Path | Description |
|---|---|---|
| GET | `/form-schemas` | List active schemas (name/version/description only) |
| GET | `/form-schemas/:id` | Full schema incl. sections/fields/showIf rules |
| POST | `/form-schemas` | Create a new schema |
| PUT | `/form-schemas/:id` | Update a schema |
| DELETE | `/form-schemas/:id` | Soft-delete (sets `isActive: false`) |

## Extraction
| Method | Path | Body | Description |
|---|---|---|---|
| POST | `/extract` | `{ formSchemaId, text }` | Runs the LangChain extraction chain, returns `{ extractedFields, lowConfidenceFields, model }` |

## Form Submissions
| Method | Path | Body | Description |
|---|---|---|---|
| POST | `/form-submissions` | `{ formSchemaId, userId }` | Start a new draft |
| GET | `/form-submissions/:id` | — | Resume an existing draft |
| PATCH | `/form-submissions/:id` | `{ data }` | Autosave partial progress |
| POST | `/form-submissions/:id/submit` | — | Validates visible fields, marks `submitted` |
