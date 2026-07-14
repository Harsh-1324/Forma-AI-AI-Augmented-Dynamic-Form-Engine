import { describe, it, expect } from "vitest";
import { evaluateShowIf } from "../src/utils/evaluateShowIf.js";

describe("evaluateShowIf (client)", () => {
  it("shows a field with no condition", () => {
    expect(evaluateShowIf(undefined, {})).toBe(true);
  });

  it("hides a field when its dependency doesn't match", () => {
    const showIf = { field: "damageArea", operator: "equals", value: "windshield" };
    expect(evaluateShowIf(showIf, { damageArea: "front_bumper" })).toBe(false);
    expect(evaluateShowIf(showIf, { damageArea: "windshield" })).toBe(true);
  });
});
