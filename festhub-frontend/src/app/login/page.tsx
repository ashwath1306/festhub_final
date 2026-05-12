"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar scrolled">
        <div className="nav-content">
          <Link href="/" className="logo">
            <i className="fa-solid fa-bolt"></i> Fest<span>Hub</span>
          </Link>
          <div className="nav-actions">
            <Link href="/register" className="btn btn-outline">Register Instead</Link>
          </div>
        </div>
      </nav>

      <div className="page-container" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="background-effects">
          <div className="glow-orb orb-1" style={{ top: '20%', left: '20%' }}></div>
          <div className="glow-orb orb-2" style={{ bottom: '20%', right: '20%' }}></div>
        </div>

        <div className="form-container">
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }} className="gradient-text">Welcome Back</h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "2rem" }}>Log in to access your dashboard and events.</p>

          {error && (
            <div style={{ padding: "0.8rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Don't have an account? <Link href="/register" style={{ color: "var(--primary-color)", textDecoration: "none" }}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}
