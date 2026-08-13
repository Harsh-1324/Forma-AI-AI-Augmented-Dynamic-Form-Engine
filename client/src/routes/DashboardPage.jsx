import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AnalyticsAPI } from "../services/api.js";

// static chart fallback data
const CHART_DATA = [
  { day: "Mon", submissions: 4 },
  { day: "Tue", submissions: 6 },
  { day: "Wed", submissions: 3 },
  { day: "Thu", submissions: 8 },
  { day: "Fri", submissions: 5 },
  { day: "Sat", submissions: 2 },
  { day: "Sun", submissions: 1 },
];

const STATUS_STYLES = {
  draft: {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#a1a1aa",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  in_review: {
    background: "rgba(245, 158, 11, 0.1)",
    color: "#f59e0b",
    border: "1px solid rgba(245, 158, 11, 0.2)",
  },
  submitted: {
    background: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
    border: "1px solid rgba(16, 185, 129, 0.2)",
  },
};

const STATUS_LABELS = {
  draft: "Draft",
  in_review: "In Review",
  submitted: "Submitted",
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.draft;
  const label = STATUS_LABELS[status] || status;
  return (
    <span
      style={{
        ...style,
        padding: "2px 10px",
        borderRadius: 9999,
        fontSize: "0.8rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch stats from the server on load
  useEffect(() => {
    AnalyticsAPI.getStats()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load dashboard metrics");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ color: "#a1a1aa", textAlign: "center", marginTop: 40 }}>
        Loading dashboard metrics...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "#f43f5e", textAlign: "center", marginTop: 40 }}>
        {error}
      </div>
    );
  }

  const { totalSubmissions, stats = {}, recentSubmissions = [] } = data || {};

  const summaryCards = [
    { label: "Total Submissions", value: totalSubmissions, accent: "#fafaf9" },
    { label: "Submitted", value: stats.submitted || 0, accent: "#10b981" },
    { label: "In Review", value: stats.in_review || 0, accent: "#f59e0b" },
    { label: "Drafts", value: stats.draft || 0, accent: "#a1a1aa" },
  ];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <h1
        style={{
          margin: "0 0 6px",
          fontSize: "1.75rem",
          fontWeight: 800,
          color: "#fafaf9",
          letterSpacing: "-0.02em",
        }}
      >
        Dashboard
      </h1>
      <p
        style={{
          margin: "0 0 28px",
          color: "#a1a1aa",
          fontSize: "0.95rem",
        }}
      >
        Organization-wide form and claims analytics.
      </p>

      {/* ---- Summary stat cards ---- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {summaryCards.map((stat) => (
          <Card
            key={stat.label}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <CardHeader>
              <CardDescription style={{ color: "#a1a1aa" }}>
                {stat.label}
              </CardDescription>
              <CardTitle
                className="text-2xl"
                style={{ color: stat.accent, fontWeight: 700 }}
              >
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* ---- Submissions chart ---- */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 12,
          padding: "24px 20px",
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#fafaf9",
          }}
        >
          Submissions — Last 7 Days
        </h2>
        <p
          style={{
            margin: "0 0 20px",
            color: "#a1a1aa",
            fontSize: "0.875rem",
          }}
        >
          Daily submission volume across all forms.
        </p>

        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={CHART_DATA}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 13, fill: "#a1a1aa" }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.08)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 13, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#09090b",
                  borderRadius: 8,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "0.875rem",
                  color: "#fafaf9",
                }}
              />
              <Bar
                dataKey="submissions"
                fill="#818cf8"
                radius={[6, 6, 0, 0]}
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---- Recent activity table ---- */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 12,
          padding: "24px 20px",
        }}
      >
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#fafaf9",
          }}
        >
          Recent Activity
        </h2>
        <p
          style={{
            margin: "0 0 20px",
            color: "#a1a1aa",
            fontSize: "0.875rem",
          }}
        >
          Last 5 form submissions across your organization.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "8px 12px", fontWeight: 600, color: "#a1a1aa" }}>
                  Submitter
                </th>
                <th style={{ padding: "8px 12px", fontWeight: 600, color: "#a1a1aa" }}>
                  Form Type
                </th>
                <th style={{ padding: "8px 12px", fontWeight: 600, color: "#a1a1aa" }}>
                  Status
                </th>
                <th style={{ padding: "8px 12px", fontWeight: 600, color: "#a1a1aa" }}>
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map((row) => {
                const dateFormatted = row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A";

                return (
                  <tr
                    key={row.id}
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
                  >
                    <td style={{ padding: "10px 12px", color: "#fafaf9", fontWeight: 500 }}>
                      {row.user?.name || row.user?.email || "Anonymous"}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#d4d4d8" }}>
                      {row.formSchema?.name || "Unknown Form"}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <StatusBadge status={row.status} />
                    </td>
                    <td style={{ padding: "10px 12px", color: "#a1a1aa" }}>
                      {dateFormatted}
                    </td>
                  </tr>
                );
              })}
              {recentSubmissions.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#a1a1aa",
                    }}
                  >
                    No recent activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
