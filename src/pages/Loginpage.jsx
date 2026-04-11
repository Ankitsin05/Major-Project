import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Loginpage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter both email and password");
            return;
        }
        toast.success("Welcome back to CodeSync!");
        navigate("/home");
    };

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
            width: "100%", maxWidth: "400px", textAlign: "center", position: "relative", zIndex: 1,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        },
        input: { 
            width: "100%", padding: "12px 14px", background: "#0d1117", border: "1px solid #30363d", 
            borderRadius: "8px", color: "#e6edf3", outline: "none", fontSize: "14px", boxSizing: "border-box",
            transition: "border-color 0.2s"
        },
        button: { 
            width: "100%", padding: "12px", background: "#238636", color: "white", border: "1px solid #2ea043", 
            borderRadius: "8px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s", fontSize: "15px",
            marginTop: "10px"
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
                <div style={styles.badge}>Welcome Back</div>
                <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px", letterSpacing: "-1px" }}>Sign In</h2>
                <p style={{ color: "#8b949e", fontSize: "14px", marginBottom: "30px" }}>Connect and collaborate</p>
                
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
                    <div>
                        <label style={{ fontSize: "13px", color: "#8b949e", display: "block", marginBottom: "8px" }}>Email address</label>
                        <input 
                            type="email" 
                            placeholder="name@example.com" 
                            autoComplete="username"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderColor = "#388bfd"}
                            onBlur={(e) => e.target.style.borderColor = "#30363d"}
                        />
                    </div>
                    
                    <div>
                        <label style={{ fontSize: "13px", color: "#8b949e", display: "block", marginBottom: "8px" }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            autoComplete="current-password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderColor = "#388bfd"}
                            onBlur={(e) => e.target.style.borderColor = "#30363d"}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        style={styles.button}
                        onMouseEnter={e => e.target.style.background = "#2ea043"} 
                        onMouseLeave={e => e.target.style.background = "#238636"}
                    >
                        Sign In →
                    </button>
                </form>

                <p style={{ marginTop: "24px", fontSize: "14px", color: "#8b949e" }}>
                    Don't have an account? <span onClick={() => navigate("/signup")} style={{ color: "#58a6ff", cursor: "pointer" }}>Create one</span>
                </p>
                
                <div style={{ marginTop: "20px", borderTop: "1px solid #21262d", paddingTop: "20px" }}>
                   <span onClick={() => navigate("/")} style={{ fontSize: "12px", color: "#8b949e", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#e6edf3"} onMouseLeave={e => e.target.style.color = "#8b949e"}>
                     ← Back to Landing Page
                   </span>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;