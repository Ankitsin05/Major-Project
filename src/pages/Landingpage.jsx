import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { icon: "⚡", title: "Real-Time Sync", desc: "Every keystroke is instantly synced across all connected users. Zero lag, pure speed." },
    { icon: "🔍", title: "Live Lint Errors", desc: "JavaScript errors and warnings appear in real-time as you type — just like VS Code." },
    { icon: "👥", title: "Multi-User Rooms", desc: "Invite unlimited developers to a shared room using a single Room ID." },
    { icon: "▶", title: "Code Execution", desc: "Run Python, C++, C, and Java directly in the browser with instant output." },
    { icon: "📋", title: "One-Click Room ID", desc: "Copy your Room ID with a single click and share it with your team instantly." },
    { icon: "🚀", title: "No Setup Required", desc: "No installation needed. Open your browser and start coding right away." },
  ];

  const team = [
    { initials: "AK", name: "Ankit Sinha", role: "Full Stack Developer", email: "aaiankitsinha@gmail.com" },
    { initials: "AS", name: "Aryan Singh", role: "Frontend Developer", email: "aryan8354801025@gmail.com" },
    { initials: "AP", name: "Ashutosh Pandey", role: "Backend Developer", email: "linkashutoshpandey@gmail.com" },
    { initials: "PS", name: "Praveen Sharma", role: "Backend Developer", email: "ps7575240@gmail.com" },
  ];

  const faqs = [
    { q: "What is CodeSync?", a: "CodeSync is a real-time collaborative code editor where multiple developers can write and edit code together in the same room — like Google Docs, but for developers." },
    { q: "Do I need to create an account?", a: "You can create an account to save your sessions, or simply join as a guest with just a Room ID and username." },
    { q: "How many people can join a room?", a: "There is no limit. As many developers as needed can join and collaborate in real-time." },
    { q: "Which languages are supported?", a: "JavaScript with live lint errors, plus Python, C++, C, and Java for code execution via our built-in compiler." },
    { q: "Is CodeSync free?", a: "Yes, CodeSync is completely free to use. No hidden charges, no premium plans." },
  ];

  const card = { background: "#161b22", border: "1px solid #21262d", borderRadius: "10px", padding: "22px" };
  const badge = { display: "inline-block", background: "rgba(56,139,253,0.1)", border: "1px solid rgba(56,139,253,0.3)", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", color: "#58a6ff" };
  const inp = { background: "#161b22", border: "1px solid #30363d", borderRadius: "8px", padding: "11px 14px", color: "#e6edf3", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s" };

  return (
    <div style={{ background: "#0d1117", color: "#e6edf3", fontFamily: "'Segoe UI', sans-serif", overflowX: "hidden", overflowY: "auto", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 40 ? "rgba(13,17,23,0.97)" : "rgba(13,17,23,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #21262d",
        transition: "all 0.3s", padding: "0 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px",
      }}>
        <span onClick={() => scrollTo("home")} style={{ fontSize: "18px", fontWeight: "700", color: "#58a6ff", cursor: "pointer" }}>
          CodeSync
        </span>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {[["home","Home"],["features","Features"],["about","About"],["faq","FAQ"],["contact","Contact"]].map(([id, label]) => (
            <span key={id} onClick={() => scrollTo(id)} style={{ cursor: "pointer", fontSize: "14px", color: "#8b949e", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#e6edf3"}
              onMouseLeave={e => e.target.style.color = "#8b949e"}
            >{label}</span>
          ))}
          <span onClick={() => navigate("/login")} style={{ cursor: "pointer", fontSize: "14px", color: "#8b949e", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#e6edf3"}
            onMouseLeave={e => e.target.style.color = "#8b949e"}
          >Login</span>
          <button onClick={() => navigate("/signup")} style={{ background: "transparent", border: "1px solid #30363d", borderRadius: "6px", padding: "6px 16px", color: "#e6edf3", fontSize: "14px", cursor: "pointer", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.target.style.borderColor = "#8b949e"}
            onMouseLeave={e => e.target.style.borderColor = "#30363d"}
          >Sign Up</button>
          <button onClick={() => navigate("/home")} style={{ background: "#1f6feb", border: "none", borderRadius: "6px", padding: "7px 18px", color: "white", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => e.target.style.background = "#388bfd"}
            onMouseLeave={e => e.target.style.background = "#1f6feb"}
          >Launch App →</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "130px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(56,139,253,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,139,253,0.03) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(31,111,235,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "820px" }}>
          <div style={{ ...badge, marginBottom: "28px" }}>● Real-Time Collaborative Code Editor</div>

          <h1 style={{ fontSize: "clamp(56px, 10vw, 96px)", fontWeight: "800", lineHeight: 1.0, margin: "0 0 12px", letterSpacing: "-4px", color: "#e6edf3" }}>
            CodeSync
          </h1>
          <p style={{ fontSize: "clamp(18px, 2.5vw, 26px)", color: "#58a6ff", margin: "0 0 20px", fontWeight: "400", letterSpacing: "-0.5px" }}>
            Write code together, in real-time.
          </p>
          <p style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: "#8b949e", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 40px" }}>
            Create a room, share the ID with your team, and collaborate instantly.
            Supports JavaScript, Python, C++, C, and Java with live execution.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/home")} style={{ background: "#1f6feb", border: "1px solid #388bfd", borderRadius: "8px", padding: "12px 30px", color: "white", fontWeight: "700", fontSize: "15px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "#388bfd"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.target.style.background = "#1f6feb"; e.target.style.transform = "translateY(0)"; }}
            >🚀 Start Coding Now</button>
            <button onClick={() => scrollTo("features")} style={{ background: "transparent", border: "1px solid #30363d", borderRadius: "8px", padding: "12px 30px", color: "#e6edf3", fontWeight: "600", fontSize: "15px", cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.target.style.borderColor = "#8b949e"}
              onMouseLeave={e => e.target.style.borderColor = "#30363d"}
            >Explore Features</button>
          </div>

          <div style={{ display: "flex", marginTop: "64px", border: "1px solid #21262d", borderRadius: "10px", overflow: "hidden", maxWidth: "480px", margin: "64px auto 0" }}>
            {[["Real-Time","Sync"],["Zero","Setup"],["4+","Languages"]].map(([v, l], i) => (
              <div key={v} style={{ flex: 1, padding: "18px 12px", textAlign: "center", borderRight: i < 2 ? "1px solid #21262d" : "none", background: "#161b22" }}>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#58a6ff" }}>{v}</div>
                <div style={{ fontSize: "11px", color: "#8b949e", marginTop: "3px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 48px", borderTop: "1px solid #21262d" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...badge, marginBottom: "16px" }}>How It Works</div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: "700", color: "#e6edf3", margin: "0 0 10px", letterSpacing: "-1px" }}>Get Started in 3 Steps</h2>
          <p style={{ color: "#8b949e", marginBottom: "44px", fontSize: "14px" }}>No complex setup. Just open, share, and code.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "14px" }}>
            {[
              { n: "01", t: "Create a Room", d: "Click Launch App, enter your username, and generate a unique Room ID." },
              { n: "02", t: "Share the Room ID", d: "Copy the Room ID and send it to your teammates. They join instantly." },
              { n: "03", t: "Code Together", d: "Everyone sees changes in real-time. Collaborate and build together." },
            ].map(s => (
              <div key={s.n} style={{ ...card, textAlign: "left" }}>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#21262d", fontFamily: "monospace", marginBottom: "12px" }}>{s.n}</div>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3", marginBottom: "8px" }}>{s.t}</h3>
                <p style={{ fontSize: "13px", color: "#8b949e", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px 48px", borderTop: "1px solid #21262d" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div style={{ ...badge, marginBottom: "14px" }}>Features</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: "700", color: "#e6edf3", margin: "0 0 10px", letterSpacing: "-1px" }}>Everything You Need to Collaborate</h2>
            <p style={{ color: "#8b949e", fontSize: "14px" }}>Powerful tools that make collaborative coding seamless.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
            {features.map((f, i) => (
              <div key={i} style={{ ...card, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#388bfd"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#21262d"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "22px", marginBottom: "10px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3", marginBottom: "7px" }}>{f.title}</h3>
                <p style={{ fontSize: "13px", color: "#8b949e", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 48px", borderTop: "1px solid #21262d" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div style={{ ...badge, marginBottom: "14px" }}>About</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: "700", color: "#e6edf3", margin: "0 0 10px", letterSpacing: "-1px" }}>About the Project</h2>
            <p style={{ color: "#8b949e", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7, fontSize: "14px" }}>
              CodeSync is a Major Project built to solve the real challenge of remote code collaboration.
              Great code is written together — in real-time, without barriers.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "40px" }}>
            <div style={card}>
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3", marginBottom: "12px" }}>Our Mission</h3>
              <p style={{ color: "#8b949e", lineHeight: 1.8, fontSize: "13px", marginBottom: "12px" }}>
                We set out to build a tool that makes pair programming as simple as sharing a link.
                No downloads, no configuration — just open and code together.
              </p>
              <p style={{ color: "#8b949e", lineHeight: 1.8, fontSize: "13px" }}>
                Whether you're in a technical interview, teaching, or debugging with a colleague,
                CodeSync gives you the real-time experience you need.
              </p>
            </div>
            <div style={card}>
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3", marginBottom: "12px" }}>Tech Stack</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "14px" }}>
                {["React", "Node.js", "Socket.IO", "CodeMirror", "Express", "Judge0"].map(t => (
                  <span key={t} style={{ background: "rgba(31,111,235,0.1)", border: "1px solid rgba(56,139,253,0.25)", borderRadius: "6px", padding: "3px 10px", fontSize: "12px", color: "#58a6ff" }}>{t}</span>
                ))}
              </div>
              {["Real-Time Collaboration", "Live Syntax Error Detection", "Multi-Language Code Execution", "No Login Required to Start"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#8b949e", marginBottom: "6px" }}>
                  <span style={{ color: "#3fb950" }}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* WHY CODESYNC - SPECIALTIES SECTION */}
          <div style={{ marginTop: "80px", textAlign: "center" }}>
            <div style={{ ...badge, marginBottom: "14px" }}>Why CodeSync</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: "700", color: "#e6edf3", margin: "0 0 44px", letterSpacing: "-1px" }}>
              The Future of Collaborative Coding
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
              {[
                {
                  title: "1. Immersive Collaboration",
                  points: [
                    { t: "Beyond Text", d: "Integrated low-latency voice channels and spatial audio for seamless team communication." },
                    { t: "Gamified Workspace", d: "Live 'Ghost Cursors' and competitive coding modules to make pair programming engaging." }
                  ]
                },
                {
                  title: "2. Production-Ready Ecosystem",
                  points: [
                    { t: "Zero-Config Sandboxes", d: "Instant, cloud-based environments for Node.js, Python, and C++—no local setup required." },
                    { t: "Visual Debugging", d: "Interactive data bubbles that visualize memory and variable states in real-time." }
                  ]
                },
                {
                  title: "3. Adaptive Learning Intelligence",
                  points: [
                    { t: "Concept Visualization", d: "Automated animations for complex logic like Pointers or Recursion to bridge the gap." },
                    { t: "AI Interviewer", d: "An active feedback loop that challenges users to improve code quality and readiness." }
                  ]
                },
                {
                  title: "4. Universal Continuity",
                  points: [
                    { t: "Platform Agnostic", d: "High-performance mobile-to-desktop sync allowing developers to code anywhere." },
                    { t: "Offline-First Core", d: "Reliable local-first architecture ensuring zero data loss during connectivity drops." }
                  ]
                }
              ].map((spec, idx) => (
                <div key={idx} style={{ ...card, textAlign: "left", background: "rgba(22, 27, 34, 0.5)", borderColor: "#30363d" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#58a6ff", marginBottom: "15px", borderBottom: "1px solid #21262d", paddingBottom: "10px" }}>
                    {spec.title}
                  </h3>
                  {spec.points.map((p, i) => (
                    <div key={i} style={{ marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#e6edf3", marginBottom: "3px" }}>
                        <span style={{ color: "#3fb950", marginRight: "6px" }}>→</span> {p.t}
                      </div>
                      <p style={{ fontSize: "13px", color: "#8b949e", lineHeight: "1.5", paddingLeft: "20px" }}>
                        {p.d}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* TEAM */}
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#e6edf3", textAlign: "center", margin: "80px 0 20px" }}>Meet the Team</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
            {team.map((m, i) => (
              <div key={i} style={{ ...card, textAlign: "center", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#388bfd"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#21262d"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#1f6feb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "15px", fontWeight: "700", color: "white" }}>
                  {m.initials}
                </div>
                <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#e6edf3", marginBottom: "4px" }}>{m.name}</h4>
                <p style={{ fontSize: "12px", color: "#58a6ff", marginBottom: "8px" }}>{m.role}</p>
                <a href={`mailto:${m.email}`} style={{ fontSize: "12px", color: "#8b949e", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#58a6ff"}
                  onMouseLeave={e => e.target.style.color = "#8b949e"}
                >{m.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 48px", borderTop: "1px solid #21262d" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div style={{ ...badge, marginBottom: "14px" }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: "700", color: "#e6edf3", margin: "0", letterSpacing: "-1px" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ ...card, padding: "0", borderColor: openFaq === i ? "#388bfd" : "#21262d", transition: "border-color 0.2s" }}>
                <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: "16px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#e6edf3" }}>{faq.q}</span>
                  <span style={{ color: "#58a6ff", fontSize: "18px", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", display: "inline-block", transition: "transform 0.2s" }}>+</span>
                </div>
                {openFaq === i && <div style={{ padding: "0 18px 16px", color: "#8b949e", fontSize: "13px", lineHeight: 1.7 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 48px", borderTop: "1px solid #21262d" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...badge, marginBottom: "14px" }}>Contact</div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: "700", color: "#e6edf3", margin: "0 0 10px", letterSpacing: "-1px" }}>Get In Touch</h2>
          <p style={{ color: "#8b949e", marginBottom: "36px", fontSize: "14px" }}>Have a suggestion or found a bug? We'd love to hear from you.</p>
          {submitted ? (
            <div style={{ ...card, padding: "44px", borderColor: "#2ea043" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>✅</div>
              <h3 style={{ color: "#3fb950", fontSize: "18px", fontWeight: "600" }}>Message Sent!</h3>
              <p style={{ color: "#8b949e", marginTop: "8px", fontSize: "13px" }}>We'll get back to you soon.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
              <input placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inp}
                onFocus={e => e.target.style.borderColor = "#388bfd"} onBlur={e => e.target.style.borderColor = "#30363d"} />
              <input placeholder="Your email address" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inp}
                onFocus={e => e.target.style.borderColor = "#388bfd"} onBlur={e => e.target.style.borderColor = "#30363d"} />
              <textarea placeholder="Your message..." rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ ...inp, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "#388bfd"} onBlur={e => e.target.style.borderColor = "#30363d"} />
              <button onClick={() => { if (formData.name && formData.email && formData.message) setSubmitted(true); }}
                style={{ background: "#1f6feb", border: "none", borderRadius: "8px", padding: "12px", color: "white", fontWeight: "700", fontSize: "15px", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.target.style.background = "#388bfd"}
                onMouseLeave={e => e.target.style.background = "#1f6feb"}
              >Send Message →</button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 48px", borderTop: "1px solid #21262d", background: "#010409" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#58a6ff" }}>CodeSync</span>
            <p style={{ color: "#484f58", fontSize: "12px", margin: "6px 0 0" }}>© 2024 CodeSync — Real-Time Collaborative Code Editor.</p>
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {[["home","Home"],["features","Features"],["about","About"],["faq","FAQ"],["contact","Contact"]].map(([id, label]) => (
              <span key={id} onClick={() => scrollTo(id)} style={{ color: "#484f58", fontSize: "13px", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#8b949e"}
                onMouseLeave={e => e.target.style.color = "#484f58"}
              >{label}</span>
            ))}
            <span onClick={() => navigate("/login")} style={{ color: "#484f58", fontSize: "13px", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#8b949e"}
              onMouseLeave={e => e.target.style.color = "#484f58"}
            >Login</span>
            <span onClick={() => navigate("/signup")} style={{ color: "#484f58", fontSize: "13px", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#8b949e"}
              onMouseLeave={e => e.target.style.color = "#484f58"}
            >Sign Up</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;