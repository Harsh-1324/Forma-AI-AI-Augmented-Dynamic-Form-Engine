import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next = {};
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    }
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      // TODO: Replace this timeout with an actual backend API call, e.g.:
      //   const res = await AuthAPI.login({ email: email.trim(), password });
      //   // store token, redirect, etc.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      alert("Login successful (placeholder).");
    } catch {
      setErrors({ form: "Login failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "48px 16px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "36px 28px",
        }}
      >
        <h1 style={{ margin: "0 0 6px", fontSize: "1.5rem", fontWeight: 700, color: "#111" }}>
          Sign in
        </h1>
        <p style={{ margin: "0 0 28px", color: "#555", fontSize: "0.95rem" }}>
          Enter your credentials to continue.
        </p>

        {errors.form && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 20,
              color: "#dc2626",
              fontSize: "0.9rem",
            }}
          >
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email field */}
          <div style={{ marginBottom: 20 }}>
            <Label htmlFor="login-email" className="mb-1.5 block">
              Email
            </Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: 4, marginBottom: 0 }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div style={{ marginBottom: 28 }}>
            <Label htmlFor="login-password" className="mb-1.5 block">
              Password
            </Label>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: 4, marginBottom: 0 }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p style={{ marginTop: 24, textAlign: "center", color: "#555", fontSize: "0.9rem" }}>
          Don&apos;t have an account?{" "}
          <Link to="/" style={{ color: "#111", fontWeight: 600, textDecoration: "none" }}>
            Get started
          </Link>
        </p>
      </div>
    </div>
  );
}