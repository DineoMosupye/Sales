import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../state/AuthContext";
import styles from "./HomePage.module.css";

const EMAIL_SUFFIX = "@eagleburgmann.com";
const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = useMemo(
    () => email.trim().toLowerCase().endsWith(EMAIL_SUFFIX),
    [email]
  );
  const isStrongPassword = useMemo(
    () => STRONG_PASSWORD_REGEX.test(password),
    [password]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail) {
      setError("Use your @eagleburgmann.com email.");
      return;
    }

    if (!isStrongPassword) {
      setError(
        "Password must be at least 8 characters with an uppercase letter, number, and special character."
      );
      return;
    }

    const didLogin = login(email, password);
    if (!didLogin) {
      setError("Unable to login. Please check your credentials.");
      return;
    }

    setError("");
    navigate("/");
  };

  return (
    <main className={styles.loginPageShell}>
      <section className={styles.loginCard}>
        <img className={styles.loginPageLogo} src="/images/eb-logo.png.avif" alt="EagleBurgmann logo" />
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            className={styles.loginInput}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            autoComplete="email"
            required
          />
          <input
            className={styles.loginInput}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          {error ? <p className={styles.loginError}>{error}</p> : null}
          <button className={styles.loginSubmitButton} type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
