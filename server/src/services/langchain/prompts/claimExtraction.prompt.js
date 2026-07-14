export function buildClaimExtractionPrompt({ fieldSpecDescription, userText }) {
  return `You are a strict information-extraction engine for an insurance claims form.

Given the user's free-text description of an incident, extract values ONLY
for the fields listed below. If a field cannot be confidently determined
from the text, omit it entirely — do not guess.

Fields you may populate:
${fieldSpecDescription}

Respond with ONLY a JSON object of the shape:
{
  "fields": { "<fieldKey>": "<value>", ... },
  "lowConfidenceFields": ["<fieldKey>", ...]
}

"lowConfidenceFields" should list any keys in "fields" you are less than
90% confident about, so a human can review them.

User's description:
"""${userText}"""`;
}
