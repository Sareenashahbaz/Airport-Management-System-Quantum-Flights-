import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter credentials");
    login({ email, password });
    nav("/dashboard");
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-3">
            <h4 className="mb-3">Login</h4>
            <form onSubmit={submit}>
              <input
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="btn btn-primary w-100">Login</button>
            </form>
            <small className="d-block mt-3">
              No account? <Link to="/register">Register</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
