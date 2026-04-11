import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signuppage = () => {
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (!data.username || !data.email || !data.password) {
            toast.error("All fields are required!");
            return;
        }
        toast.success("Account created! Please login.");
        navigate("/login");
    };

    // Landing Page styles matching
    const styles = {
        wrapper: { 
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", 
            background: "#0d1117", color: "#e6edf3", fontFamily: "'Segoe UI', sans-serif",
            position: "relative", overflow: "hidden" 
        },
        grid: { 
            position: "absolute", inset: 0, 
            backgroundImage: "linear-gradient(rgba(56,139,253,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,139,253,0.03) 1px, transparent 1px)", 
            backgroundSize: "44px 44px", pointerEvents: "none" 
        },
        card: { 
            background: "#161b22", padding: "40px", borderRadius: "12px", border: "1px solid #30363d", 
            width: "100%", maxWidth: "400px", textAlign: "center", position: "relative", zIndex: 1 
        },
        input: { 
            width: "100%", padding: "12px 14px", background: "#0d1117", border: "1px solid #30363d", 
            borderRadius: "8px", color: "#e6edf3", outline: "none", fontSize: "14px", boxSizing: "border-box"
        },
        button: { 
            width: "100%", padding: "12px", background: "#1f6feb", color: "white", border: "1px solid #388bfd", 
            borderRadius: "8px", fontWeight: "700", cursor: "pointer", transition: "0.2s", fontSize: "15px" 
        },
        badge: { 
            display: "inline-block", background: "rgba(56,139,253,0.1)", border: "1px solid rgba(56,139,253,0.3)", 
            borderRadius: "20px", padding: "5px 14px", fontSize: "12px", color: "#58a6ff", marginBottom: "20px" 
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.grid} />
            <div style={styles.card}>
                <div style={styles.badge}>Join CodeSync</div>
                <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px", letterSpacing: "-1px" }}>Create Account</h2>
                <p style={{ color: "#8b949e", fontSize: "14px", marginBottom: "30px" }}>Start collaborating in real-time</p>
                
                <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
                    <div>
                        <label style={{ fontSize: "13px", color: "#8b949e", display: "block", marginBottom: "8px" }}>Username</label>
                        <input type="text" placeholder="johndoe" autoComplete="username"
                            onChange={(e) => setData({...data, username: e.target.value})} style={styles.input} />
                    </div>
                    
                    <div>
                        <label style={{ fontSize: "13px", color: "#8b949e", display: "block", marginBottom: "8px" }}>Email address</label>
                        <input type="email" placeholder="name@example.com" autoComplete="email"
                            onChange={(e) => setData({...data, email: e.target.value})} style={styles.input} />
                    </div>
                    
                    <div>
                        <label style={{ fontSize: "13px", color: "#8b949e", display: "block", marginBottom: "8px" }}>Password</label>
                        {/* Important: name="password" and autoComplete="new-password" triggers the browser suggestion */}
                        <input type="password" name="password" placeholder="••••••••" autoComplete="new-password" required
                            onChange={(e) => setData({...data, password: e.target.value})} style={styles.input} />
                    </div>
                    
                    <button type="submit" style={styles.button}
                        onMouseEnter={e => e.target.style.background = "#388bfd"} 
                        onMouseLeave={e => e.target.style.background = "#1f6feb"}>
                        Sign Up →
                    </button>
                </form>

                <p style={{ marginTop: "24px", fontSize: "14px", color: "#8b949e" }}>
                    Already have an account? <span onClick={() => navigate("/login")} style={{ color: "#58a6ff", cursor: "pointer" }}>Sign in</span>
                </p>
            </div>
        </div>
    );
};

export default Signuppage;