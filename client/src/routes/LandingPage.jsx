import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const STEPS = [
  {
    number: "1",
    title: "Describe your incident",
    description:
      "Tell us what happened in your own words — no jargon, no forms to hunt through.",
  },
  {
    number: "2",
    title: "AI extracts the details",
    description:
      "Our AI reads your description, identifies key facts, and pre-fills every relevant field.",
  },
  {
    number: "3",
    title: "Review and submit",
    description:
      "Verify the pre-filled data, correct anything the AI flagged as uncertain, and submit.",
  },
];

export default function LandingPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      {/* ---- Hero section ---- */}
      <section style={{ textAlign: "center", padding: "56px 0 48px" }}>
        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "2.25rem",
            fontWeight: 800,
            color: "#111",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          File claims in plain&nbsp;English
        </h1>
        <p
          style={{
            margin: "0 auto 32px",
            maxWidth: 520,
            color: "#555",
            fontSize: "1.05rem",
            lineHeight: 1.6,
          }}
        >
          Describe an incident in your own words and let AI handle the
          paperwork. Forma&nbsp;AI pre-fills complex insurance forms so you
          can review, adjust, and submit in minutes&nbsp;— not hours.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section style={{ paddingBottom: 56 }}>
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#111",
            textAlign: "center",
          }}
        >
          How it works
        </h2>
        <p
          style={{
            margin: "0 auto 28px",
            color: "#555",
            fontSize: "0.95rem",
            textAlign: "center",
            maxWidth: 460,
          }}
        >
          Three simple steps from incident to submitted claim.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: 16,
          }}
        >
          {STEPS.map((step) => (
            <Card key={step.number}>
              <CardHeader>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9999,
                    background: "#111",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {step.number}
                </div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
