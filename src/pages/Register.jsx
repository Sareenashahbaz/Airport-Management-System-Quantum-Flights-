// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UserContext";

export default function Register() {
  const { register: authRegister } = useAuth();
  const { createUser } = useUsers();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError("");

    const { name, email, phone, password, passwordConfirm } = form;
    if (!name || !email || !password || !passwordConfirm) {
      setError("Please fill all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 4) {
      setError("Password should be at least 4 characters.");
      return;
    }

    // Create user in UserContext (persisted to localStorage by context)
    const newUser = createUser({ name, email, phone });
    // Set auth context to log in this user
    authRegister({ email, name });

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow-sm p-4">
            <h3 className="mb-3 text-center">Register</h3>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-2">
                <label className="form-label small">Full name</label>
                <input
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Phone (optional)</label>
                <input
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 3xx xxx xxxx"
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small">Confirm password</label>
                <input
                  name="passwordConfirm"
                  type="password"
                  className="form-control"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100 mb-2">
                Register & Login
              </button>

              <div className="text-center small">
                Already registered? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
