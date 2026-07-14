export default function CheckboxField({ field, register, error, isAiFlagged }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <input
        id={field.key}
        type="checkbox"
        className={isAiFlagged ? "ai-flagged" : ""}
        {...register(field.key)}
      />
      <label className="field-label" htmlFor={field.key} style={{ marginBottom: 0 }}>
        {field.label}
      </label>
      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
}
