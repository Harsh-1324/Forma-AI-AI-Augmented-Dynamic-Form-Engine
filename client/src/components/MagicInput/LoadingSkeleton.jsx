export default function LoadingSkeleton() {
  return (
    <div className="card">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: 14,
            borderRadius: 6,
            background: "#e5e7eb",
            marginBottom: 10,
            width: i === 3 ? "60%" : "100%",
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
