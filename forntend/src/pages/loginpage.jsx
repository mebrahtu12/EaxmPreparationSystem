import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./auth.css";
import applogo from "../assets/images/Study Smarter Not Harder.png";

const API_URL = "http://localhost:3000";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = Array.isArray(data.message)
          ? data.message.join(" ")
          : data.message;

        throw new Error(message || "Login failed. Please try again.");
      }

      // Save the JWT for subsequent API requests.
      sessionStorage.setItem("access_token", data.access_token);
      // Keep the authenticated user's non-sensitive information.
      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/naturalHome");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to connect to the server.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-brand">
          <img className="brand-icon" src={applogo} />
          <span>UniExam</span>
        </Link>

        <div className="auth-heading">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Let's get you back on track.</h1>
          <p>Sign in to continue your exam preparation.</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <label htmlFor="login-email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <div className="label-row">
            <label htmlFor="login-password">Password</label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Logging in ..." : "Login  ->"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/create-account">Create account</Link>
        </p>
        <p className="auth-footer">Your next achievement starts here.</p>
      </section>

      <aside className="auth-side">
        <div className="side-decoration decoration-one" />
        <div className="side-decoration decoration-two" />

        <div className="side-content">
          <span className="side-tag">YOUR LEARNING JOURNEY</span>
          <h2>
            Learn smarter.
            <br />
            Go further.
          </h2>
          <p>
            Practice questions, understand difficult concepts, and build the
            confidence to ace your exams.
          </p>

          <div className="side-stat">
            <span className="stat-icon">✦</span>
            <div>
              <strong>One step at a time</strong>
              <p>Every practice session moves you forward.</p>
            </div>
          </div>
        </div>

        <span className="side-bottom">BUILT FOR YOUR FUTURE</span>
      </aside>
    </main>
  );
}

export default Login;
