"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) {
    return <div className="page-container" style={{ justifyContent: "center", alignItems: "center" }}>Loading...</div>;
  }

  return (
    <>
      <nav className="navbar scrolled">
        <div className="nav-content">
          <Link href="/" className="logo">
            <i className="fa-solid fa-bolt"></i> Fest<span>Hub</span>
          </Link>
          <div className="nav-links">
            <Link href="/dashboard" className="active">Dashboard</Link>
            <Link href="/events">Events</Link>
          </div>
          <div className="nav-actions">
            <button onClick={handleLogout} className="btn btn-outline">Log Out</button>
          </div>
        </div>
      </nav>

      <div className="page-container">
        <div className="page-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
            <div>
              <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                Welcome back, {user.name.split(" ")[0]}!
              </h1>
              <p style={{ color: "var(--text-secondary)" }}>Manage your registrations and team from here.</p>
            </div>
            {user.role === 'ADMIN' && (
              <div className="badge" style={{ margin: 0, background: "rgba(236, 72, 153, 0.1)", color: "var(--accent-color)", borderColor: "rgba(236, 72, 153, 0.2)" }}>
                Admin Dashboard
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div className="glass-panel" style={{ padding: "2rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-ticket" style={{ color: "var(--primary-color)" }}></i> My Registrations
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>You haven't registered for any events yet.</p>
              <Link href="/events" className="btn btn-outline" style={{ width: "100%" }}>Browse Events</Link>
            </div>

            <div className="glass-panel" style={{ padding: "2rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-users" style={{ color: "var(--accent-color)" }}></i> My Teams
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>You are not part of any teams.</p>
              <button className="btn btn-outline" style={{ width: "100%" }}>Create Team</button>
            </div>

            <div className="glass-panel" style={{ padding: "2rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-qrcode" style={{ color: "var(--success-color)" }}></i> My QR Pass
              </h3>
              <div style={{ background: "rgba(255,255,255,0.05)", height: "150px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                Register for an event to generate QR
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
