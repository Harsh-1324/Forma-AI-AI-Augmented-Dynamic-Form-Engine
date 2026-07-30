import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next = {};
    if (!fullName.trim()) {
      next.fullName = "Full name is required.";
    }
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      next.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      next.confirmPassword = "Passwords do not match.";
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
      //   const res = await AuthAPI.signup({ fullName: fullName.trim(), email: email.trim(), password });
      //   // store token, redirect, etc.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      alert("Signup successful (placeholder).");
    } catch {
      setErrors({ form: "Signup failed. Please try again." });
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
          Create an account
        </h1>
        <p style={{ margin: "0 0 28px", color: "#555", fontSize: "0.95rem" }}>
          Fill in your details to get started.
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
          {/* Full name field */}
          <div style={{ marginBottom: 20 }}>
            <Label htmlFor="signup-fullname" className="mb-1.5 block">
              Full name
            </Label>
            <Input
              id="signup-fullname"
              type="text"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={submitting}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: 4, marginBottom: 0 }}>
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email field */}
          <div style={{ marginBottom: 20 }}>
            <Label htmlFor="signup-email" className="mb-1.5 block">
              Email
            </Label>
            <Input
              id="signup-email"
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
          <div style={{ marginBottom: 20 }}>
            <Label htmlFor="signup-password" className="mb-1.5 block">
              Password
            </Label>
            <Input
              id="signup-password"
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

          {/* Confirm password field */}
          <div style={{ marginBottom: 28 }}>
            <Label htmlFor="signup-confirm-password" className="mb-1.5 block">
              Confirm password
            </Label>
            <Input
              id="signup-confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={submitting}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: 4, marginBottom: 0 }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p style={{ marginTop: 24, textAlign: "center", color: "#555", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#111", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
