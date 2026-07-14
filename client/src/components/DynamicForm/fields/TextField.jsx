export default function TextField({ field, register, error, isAiFlagged }) {
  return (
    <div className="card">
      <label className="field-label" htmlFor={field.key}>
        {field.label}
      </label>
      <input
        id={field.key}
        type={field.type === "number" ? "number" : "text"}
        className={isAiFlagged ? "ai-flagged" : ""}
        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #d1d5db" }}
        {...register(field.key)}
      />
      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
}
