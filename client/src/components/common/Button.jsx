export default function Button({ children, variant = "primary", className = "", ...props }) {
  const variantClass = variant === "secondary" ? "btn-secondary" : "btn-primary";

  return (
    <button
      {...props}
      className={`btn ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}
