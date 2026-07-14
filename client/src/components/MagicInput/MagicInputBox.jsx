import { useState } from "react";
import Button from "../common/Button.jsx";
import LoadingSkeleton from "./LoadingSkeleton.jsx";
import { useAIStore } from "../../store/useAIStore.js";

export default function MagicInputBox({ onExtract }) {
  const [text, setText] = useState("");
  const isExtracting = useAIStore((s) => s.isExtracting);
  const error = useAIStore((s) => s.error);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await onExtract(text);
  };

  return (
    <div className="card">
      <label className="field-label" htmlFor="magic-input">
        Describe what happened, in your own words
      </label>
      <textarea
        id="magic-input"
        rows={4}
        placeholder='e.g. "I hit a deer on I-95 yesterday in my Honda, and the windshield shattered."'
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #d1d5db" }}
        disabled={isExtracting}
      />
      <div style={{ marginTop: 10 }}>
        <Button onClick={handleSubmit} disabled={isExtracting}>
          {isExtracting ? "Analyzing..." : "Fill form with AI"}
        </Button>
      </div>

      {isExtracting && (
        <div style={{ marginTop: 16 }}>
          <LoadingSkeleton />
        </div>
      )}

      {error && <p className="field-error">Couldn't parse that — please try again or fill the form manually.</p>}
    </div>
  );
}
