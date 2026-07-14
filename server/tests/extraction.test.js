import { schemaToFieldSpec } from "../src/services/langchain/schemaToPrompt.js";

describe("schemaToFieldSpec", () => {
  it("flattens sections into a field spec, skipping non-AI-extractable fields", () => {
    const schema = {
      sections: [
        {
          key: "incident",
          fields: [
            { key: "incidentType", label: "Incident Type", type: "dropdown", aiExtractable: true, options: [] },
            { key: "internalNotes", label: "Internal Notes", type: "text", aiExtractable: false },
          ],
        },
      ],
    };

    const spec = schemaToFieldSpec(schema);
    expect(spec).toHaveLength(1);
    expect(spec[0].key).toBe("incidentType");
  });
});
