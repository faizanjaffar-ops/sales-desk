// src/pages/Login.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
      alert("Login successful!");
      if (onSuccess) onSuccess(userCredential.user);
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
      <h2>Login</h2>
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
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
}
