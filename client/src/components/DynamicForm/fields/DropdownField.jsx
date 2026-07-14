export default function DropdownField({ field, register, error, isAiFlagged }) {
  return (
    <div className="card">
      <label className="field-label" htmlFor={field.key}>
        {field.label}
      </label>
      <select
        id={field.key}
        className={isAiFlagged ? "ai-flagged" : ""}
        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #d1d5db" }}
        defaultValue=""
        {...register(field.key)}
      >
        <option value="" disabled>
          Select...
        </option>
        {(field.options || []).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
}
