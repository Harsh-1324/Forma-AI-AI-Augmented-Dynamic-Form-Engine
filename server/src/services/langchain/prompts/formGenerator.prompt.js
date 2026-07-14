export function buildFormGeneratorPrompt(description) {
  return `You are a form-schema architect. Given a plain-language description
of a form, output a MongoDB-style JSON form schema matching this shape:

{
  "name": "snake_case_form_name",
  "description": "one line description",
  "sections": [
    {
      "key": "section_key",
      "title": "Section Title",
      "showIf": null,
      "fields": [
        {
          "key": "fieldKey",
          "label": "Field Label",
          "type": "text | number | date | dropdown | checkbox | textarea | radio",
          "required": true,
          "aiExtractable": true,
          "options": [{ "label": "...", "value": "..." }],
          "showIf": null
        }
      ]
    }
  ]
}

Rules:
- Infer sensible field types and 3-6 dropdown/radio options where relevant.
- Use "showIf" ({ "field": "<key>", "operator": "equals", "value": "<val>" })
  to branch follow-up sections off earlier answers, wherever the description
  implies conditional questions.
- Respond with ONLY the JSON object, no prose, no markdown fences.

Form description:
"""${description}"""`;
}
