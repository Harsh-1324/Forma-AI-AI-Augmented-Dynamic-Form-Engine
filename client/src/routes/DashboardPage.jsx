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

// ---------- Mock data ----------

// TODO: Replace with real API call to fetch summary statistics
const SUMMARY_STATS = [
  { label: "Total Submissions", value: "1,248", accent: "#111" },
  { label: "AI Success Rate", value: "87%", accent: "#16a34a" },
  { label: "Avg. Completion Time", value: "4.2 min", accent: "#2563eb" },
  { label: "Pending Review", value: "23", accent: "#d97706" },
];

// TODO: Replace with real API call to fetch submissions-over-time data
const CHART_DATA = [
  { day: "Mon", submissions: 42 },
  { day: "Tue", submissions: 58 },
  { day: "Wed", submissions: 35 },
  { day: "Thu", submissions: 71 },
  { day: "Fri", submissions: 64 },
  { day: "Sat", submissions: 28 },
  { day: "Sun", submissions: 19 },
];

// TODO: Replace with real API call to fetch recent submissions
const RECENT_ACTIVITY = [
  {
    id: 1,
    submitter: "Alice Johnson",
    formType: "Insurance Claim",
    status: "Completed",
    date: "Jul 21, 2026",
  },
  {
    id: 2,
    submitter: "Bob Martinez",
    formType: "Onboarding Form",
    status: "Pending",
    date: "Jul 21, 2026",
  },
  {
    id: 3,
    submitter: "Carol Lee",
    formType: "Expense Report",
    status: "Flagged",
    date: "Jul 20, 2026",
  },
  {
    id: 4,
    submitter: "David Kim",
    formType: "Insurance Claim",
    status: "Completed",
    date: "Jul 20, 2026",
  },
  {
    id: 5,
    submitter: "Eva Chen",
    formType: "Feedback Survey",
    status: "Pending",
    date: "Jul 19, 2026",
  },
];

// ---------- Helpers ----------

const STATUS_STYLES = {
  Completed: {
    background: "#f0fdf4",
    color: "#16a34a",
    border: "1px solid #bbf7d0",
  },
  Pending: {
    background: "#fffbeb",
    color: "#d97706",
    border: "1px solid #fde68a",
  },
  Flagged: {
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
  },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || {};
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
      {status}
    </span>
  );
}

// ---------- Component ----------

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <h1
        style={{
          margin: "0 0 6px",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#111",
        }}
      >
        Dashboard
      </h1>
      <p
        style={{
          margin: "0 0 28px",
          color: "#555",
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
        {SUMMARY_STATS.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
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
          background: "#fff",
          border: "1px solid #e5e7eb",
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
            color: "#111",
          }}
        >
          Submissions — Last 7 Days
        </h2>
        <p
          style={{
            margin: "0 0 20px",
            color: "#555",
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 13, fill: "#555" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 13, fill: "#555" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                }}
              />
              <Bar
                dataKey="submissions"
                fill="#111"
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
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "24px 20px",
        }}
      >
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#111",
          }}
        >
          Recent Activity
        </h2>
        <p
          style={{
            margin: "0 0 20px",
            color: "#555",
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
                  borderBottom: "1px solid #e5e7eb",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "8px 12px", fontWeight: 600, color: "#555" }}>
                  Submitter
                </th>
                <th style={{ padding: "8px 12px", fontWeight: 600, color: "#555" }}>
                  Form Type
                </th>
                <th style={{ padding: "8px 12px", fontWeight: 600, color: "#555" }}>
                  Status
                </th>
                <th style={{ padding: "8px 12px", fontWeight: 600, color: "#555" }}>
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ACTIVITY.map((row) => (
                <tr
                  key={row.id}
                  style={{ borderBottom: "1px solid #f3f4f6" }}
                >
                  <td style={{ padding: "10px 12px", color: "#111", fontWeight: 500 }}>
                    {row.submitter}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#333" }}>
                    {row.formType}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <StatusBadge status={row.status} />
                  </td>
                  <td style={{ padding: "10px 12px", color: "#555" }}>
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
