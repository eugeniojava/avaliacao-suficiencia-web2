import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      await login(email, password);
    } catch (error) {
      // setError(error.data.message);
      setError("errado");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Login</h3>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
            {error && (
              <div class="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
          <p className="forgot-password text-right">
            <Link to={"/register"}>Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
