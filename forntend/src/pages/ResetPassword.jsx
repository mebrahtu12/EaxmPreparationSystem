import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Reset-password.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid reset link. Please request a new one.");
      return;
    }

    if (newPassword.length < 5) {
      setError("Password must contain at least 5 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset password.");
      }

      setMessage(data.message);

      setNewPassword("");
      setConfirmPassword("");

      // Give the user time to read the success message.
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-icon">🔐</div>

        <h1>Reset Password</h1>

        <p className="reset-description">
          Create a new password for your UniExam account.
        </p>

        {!token ? (
          <div className="reset-error">
            Invalid reset link. Please request a new password reset email.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="reset-input-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={5}
                autoFocus
                required
              />
            </div>

            <div className="reset-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={5}
                required
              />
            </div>

            {error && <div className="reset-error">{error}</div>}

            {message && <div className="reset-success">{message}</div>}

            <button type="submit" disabled={loading} className="reset-button">
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        <button
          type="button"
          className="reset-back-button"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
