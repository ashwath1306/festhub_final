"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    college: "",
    department: "",
    year: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
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
            <Link href="/login" className="btn btn-outline">Log In Instead</Link>
          </div>
        </div>
      </nav>

      <div className="page-container" style={{ paddingBottom: "4rem" }}>
        <div className="background-effects">
          <div className="glow-orb orb-3" style={{ top: '10%', left: '50%' }}></div>
        </div>

        <div className="form-container" style={{ maxWidth: "600px", marginTop: "2rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }} className="gradient-text">Join FestHub</h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "2rem" }}>Create an account to register for events and manage your team.</p>

          {error && (
            <div style={{ padding: "0.8rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required minLength={6} />
              </div>
              <div className="form-group">
                <label>Phone Number (Optional)</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>College/University (Optional)</label>
              <input type="text" className="form-control" name="college" value={formData.college} onChange={handleChange} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="form-group">
                <label>Department (Optional)</label>
                <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Year (Optional)</label>
                <select className="form-control" name="year" value={formData.year} onChange={handleChange} style={{ appearance: "none" }}>
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Already have an account? <Link href="/login" style={{ color: "var(--primary-color)", textDecoration: "none" }}>Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
