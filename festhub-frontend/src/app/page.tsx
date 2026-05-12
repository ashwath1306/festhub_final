"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animate Chart Bars on Load
    const bars = document.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
    bars.forEach(bar => {
      const targetHeight = bar.style.height;
      bar.style.height = '0%';
      
      setTimeout(() => {
        bar.style.height = targetHeight;
      }, 500);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="background-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <nav className="navbar">
        <div className="nav-content">
          <Link href="/" className="logo">
            <i className="fa-solid fa-bolt"></i> Fest<span>Hub</span>
          </Link>
          <div className="nav-links">
            <Link href="#events" className="active">Events</Link>
            <Link href="#teams">Teams</Link>
            <Link href="#schedule">Schedule</Link>
            <Link href="#sponsors">Sponsors</Link>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="btn btn-outline">Log In</Link>
            <Link href="/register" className="btn btn-primary">Register Now</Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="badge">Registration Open for 2026</div>
            <h1 className="hero-title">Elevate Your <br/><span className="gradient-text">College Fest</span> Experience</h1>
            <p className="hero-subtitle">The ultimate platform to manage, participate, and experience college fests like never before. Seamless registrations, live updates, and epic memories.</p>
            
            <div className="hero-cta">
              <Link href="#events" className="btn btn-primary btn-large">Explore Events <i className="fa-solid fa-arrow-right"></i></Link>
              <button className="btn btn-glass btn-large"><i className="fa-solid fa-play"></i> Watch Teaser</button>
            </div>

            <div className="stats-container">
              <div className="stat-card">
                <h3>50+</h3>
                <p>Epic Events</p>
              </div>
              <div className="stat-card">
                <h3>10k+</h3>
                <p>Participants</p>
              </div>
              <div className="stat-card">
                <h3>₹5L+</h3>
                <p>Prize Pool</p>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="glass-panel main-panel">
              <div className="panel-header">
                <div className="dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="panel-title">Live Dashboard</div>
              </div>
              <div className="panel-body">
                <div className="event-item">
                  <div className="event-icon"><i className="fa-solid fa-code"></i></div>
                  <div className="event-details">
                    <h4>Hackathon 4.0</h4>
                    <p>Ends in 12h 45m</p>
                  </div>
                  <div className="event-status pulse">Live</div>
                </div>
                <div className="event-item">
                  <div className="event-icon"><i className="fa-solid fa-robot"></i></div>
                  <div className="event-details">
                    <h4>RoboWars</h4>
                    <p>Starting in 2h</p>
                  </div>
                  <div className="event-status upcoming">Next</div>
                </div>
                <div className="event-chart">
                  <div className="bar" style={{height: '60%'}}></div>
                  <div className="bar" style={{height: '80%'}}></div>
                  <div className="bar" style={{height: '40%'}}></div>
                  <div className="bar" style={{height: '100%'}}></div>
                  <div className="bar" style={{height: '70%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="events">
          <div className="section-header">
            <h2>Why Choose <span className="gradient-text">FestHub</span></h2>
            <p>Everything you need for a spectacular event in one place.</p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-qrcode"></i></div>
              <h3>Smart Ticketing</h3>
              <p>Instant QR-based check-ins and secure access control for all participants.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-users"></i></div>
              <h3>Team Management</h3>
              <p>Create teams, invite members, and manage registrations effortlessly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-chart-line"></i></div>
              <h3>Real-time Analytics</h3>
              <p>Live leaderboards, attendance tracking, and dynamic event updates.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
