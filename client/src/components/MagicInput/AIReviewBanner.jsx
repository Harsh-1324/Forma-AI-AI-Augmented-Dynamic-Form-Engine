export default function AIReviewBanner({ lowConfidenceFields }) {
  if (!lowConfidenceFields || lowConfidenceFields.size === 0) return null;

  return (
    <div
      className="card"
      style={{ background: "#fffbeb", borderColor: "#f59e0b", color: "#92400e" }}
    >
      <strong>Please double-check {lowConfidenceFields.size} field(s):</strong>{" "}
      {Array.from(lowConfidenceFields).join(", ")} — the AI wasn't fully confident about these.
    </div>
  );
}
