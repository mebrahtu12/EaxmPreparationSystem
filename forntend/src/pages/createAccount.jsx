import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./auth.css";
import applogo from "../assets/images/Study Smarter Not Harder.png";

const API_URL = "http://localhost:3000";

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    stream: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    console.log("123 " + setError(""));
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 5) {
      setError("Password must contain at least 5 characters.");
      return;
    }

    if (!["SOCIAL", "NATURAL"].includes(formData.stream)) {
      setError("Please select a valid stream.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          stream: formData.stream,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = Array.isArray(data.message)
          ? data.message.join(" ")
          : data.message;

        throw new Error(message || "Registration failed.");
      }

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.message || "Unable to connect to the server. Please try again.",
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
          <p className="eyebrow">GET STARTED</p>
          <h1>Create your account.</h1>
          <p>Join UniExam and make your study time count.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="register-username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter a username"
            autoComplete="username"
            minLength={3}
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-username">Stream</label>
          <select
            name="stream"
            id="stream"
            value={formData.stream}
            onChange={handleChange}
            required
          >
            <option value="">select your stream</option>
            <option value="NATURAL">Natural Science</option>
            <option value="SOCIAL">Social Science</option>
          </select>

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 5 characters"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            minLength={5}
            required
          />

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Enter your password again"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={5}
            required
          />

          {error && (
            <p className="form-message error-message" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="form-message success-message" role="status">
              {success}
            </p>
          )}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating..." : "CreateAccount"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <p className="auth-footer">
          By joining, you're taking the next step in your learning journey.
        </p>
      </section>

      <aside className="auth-side">
        <div className="side-decoration decoration-one" />
        <div className="side-decoration decoration-two" />

        <div className="side-content">
          <span className="side-tag">YOUR FUTURE STARTS HERE</span>
          <h2>
            Make every
            <br />
            study session count.
          </h2>
          <p>
            Keep your learning organized, practice at your own pace, and track
            your progress toward exam success.
          </p>

          <div className="side-benefits">
            <p>
              <span>✓</span> Practice and review questions
            </p>
            <p>
              <span>✓</span> Explore your courses
            </p>
            <p>
              <span>✓</span> Build better study habits
            </p>
          </div>
        </div>

        <span className="side-bottom">BUILT FOR YOUR FUTURE</span>
      </aside>
    </main>
  );
}

export default CreateAccount;
