// src/pages/Signup.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Registered user:", userCredential.user);
      alert("Registration successful!");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "30px auto", padding: 18, border: "1px solid #eee", borderRadius: 8, fontFamily: "Arial, sans-serif" }}>
      <h2>Create account</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          style={{ width: "100%", padding: 8, margin: "6px 0" }}
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          style={{ width: "100%", padding: 8, margin: "6px 0" }}
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: "8px 12px" }}>
          {loading ? "Please wait..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
