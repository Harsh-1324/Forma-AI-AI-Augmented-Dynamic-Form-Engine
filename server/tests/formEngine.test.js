import { evaluateShowIf, getVisibleFields } from "../src/services/formEngine/conditionEvaluator.js";

describe("evaluateShowIf", () => {
  it("returns true when there is no condition", () => {
    expect(evaluateShowIf(undefined, {})).toBe(true);
  });

  it("evaluates 'equals' correctly", () => {
    const showIf = { field: "incidentType", operator: "equals", value: "animal_collision" };
    expect(evaluateShowIf(showIf, { incidentType: "animal_collision" })).toBe(true);
    expect(evaluateShowIf(showIf, { incidentType: "theft" })).toBe(false);
  });
});

describe("getVisibleFields", () => {
  it("only returns fields whose showIf conditions are satisfied", () => {
    const schema = {
      sections: [
        {
          key: "s1",
          fields: [
            { key: "incidentType", label: "Incident Type" },
            {
              key: "animalType",
              label: "Animal Type",
              showIf: { field: "incidentType", operator: "equals", value: "animal_collision" },
            },
          ],
        },
      ],
    };

    const visible = getVisibleFields(schema, { incidentType: "animal_collision" });
    expect(visible.map((f) => f.key)).toEqual(["incidentType", "animalType"]);

    const hidden = getVisibleFields(schema, { incidentType: "theft" });
    expect(hidden.map((f) => f.key)).toEqual(["incidentType"]);
  });
});
