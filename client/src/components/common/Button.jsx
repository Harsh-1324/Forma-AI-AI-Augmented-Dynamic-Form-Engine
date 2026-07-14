export default function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary: { background: "#111", color: "#fff" },
    secondary: { background: "#fff", color: "#111", border: "1px solid #d1d5db" },
  };

  return (
    <button
      {...props}
      style={{
        padding: "10px 16px",
        borderRadius: 8,
        border: "none",
        fontWeight: 600,
        cursor: "pointer",
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}
