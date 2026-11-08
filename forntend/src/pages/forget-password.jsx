
import { Link } from "react-router-dom";
import "./auth.css";
import applogo from "../assets/images/Study Smarter Not Harder.png"

function ForgotPassword() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to send reset link.");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card forgot-card">
        <Link to="/" className="auth-brand">
         <img className="brand-icon" src={applogo}/>
          <span>UniExam</span>
        </Link>
        <div className="auth-heading">
          <p className="eyebrow">ACCOUNT RECOVERY</p>
          <h1>Forgot your password?</h1>
          <p>
            It happens. Enter the email address associated with
            your account and we'll help you reset it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="reset-email">Email address</label>
          <input
            id="reset-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <button className="auth-button" type="submit">
            Send Reset Link <span aria-hidden="true">→</span>
          </button>
        </form>

        <Link to="/login" className="back-link">
          <span aria-hidden="true">←</span> Back to sign in
        </Link>

        <p className="auth-footer">
          Need an account? <Link to="/create-account">Join UniExam</Link>
        </p>
      </section>

      <aside className="auth-side">
        <div className="side-decoration decoration-one" />
        <div className="side-decoration decoration-two" />

        <div className="side-content">
          <span className="side-tag">A FRESH START</span>
          <h2>Every setback<br />is a setup to grow.</h2>
          <p>
            Your learning journey matters. Get back into your
            account and continue working toward your goals.
          </p>

          <div className="side-stat">
            <span className="stat-icon">✦</span>
            <div>
              <strong>Your progress is waiting</strong>
              <p>Pick up where you left off.</p>
            </div>
          </div>
        </div>

        <span className="side-bottom">BUILT FOR YOUR FUTURE</span>
      </aside>
    </main>
  );
}

export default ForgotPassword;
