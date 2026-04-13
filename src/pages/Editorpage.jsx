import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import CodeEditor from "../components/CodeEditor";
import CompilerPanel from "../components/CompilerPanel";
import { initsocket } from "../socket";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Editor = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const hasJoined = useRef(false);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [showCompiler, setShowCompiler] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (hasJoined.current) return;
    hasJoined.current = true;

    function handleErrors(error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
      reactNavigate("/");
    }

    const init = async () => {
      socketRef.current = await initsocket();
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on("connect_error", (err) => handleErrors(err));

      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`);
        }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => prev.filter((c) => c.socketId !== socketId));
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.disconnect();
      }
    };
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied!");
    } catch {
      toast.error("Failed to copy Room ID.");
    }
  };

  const leaveRoom = () => {
    socketRef.current.disconnect();
    toast.success(`${location.state?.username} left the room.`);
    reactNavigate("/");
  };

  if (!location.state) return <Navigate to="/" />;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#0d1117", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* SIDEBAR */}
      <div style={{
        width: sidebarCollapsed ? "0px" : "220px",
        minWidth: sidebarCollapsed ? "0px" : "220px",
        transition: "all 0.3s ease",
        overflow: "hidden",
        background: "#161b22",
        borderRight: "1px solid #21262d",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
        {/* Logo */}
        <div style={{ padding: "16px", borderBottom: "1px solid #21262d", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/code-sync.png" alt="logo" style={{ width: "32px", height: "32px", borderRadius: "6px" }} />
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#58a6ff" }}>CodeSync</span>
        </div>

        {/* Clients */}
        <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
          <p style={{ fontSize: "11px", color: "#484f58", letterSpacing: "1px", fontWeight: "600", marginBottom: "12px" }}>
            LIVE CLIENTS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {clients.map((client) => (
              <div key={client.socketId} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", borderRadius: "8px", background: "#0d1117", border: "1px solid #21262d" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "#1f6feb", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "13px", fontWeight: "700", color: "white", flexShrink: 0,
                }}>
                  {client.username?.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: "13px", color: "#e6edf3", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {client.username}
                </span>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3fb950", marginLeft: "auto", flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div style={{ padding: "16px", borderTop: "1px solid #21262d", display: "flex", flexDirection: "column", gap: "8px" }}>
          <button onClick={copyRoomId} style={{
            background: "#1f6feb", border: "none", borderRadius: "8px",
            padding: "9px 14px", color: "white", fontWeight: "600",
            fontSize: "13px", cursor: "pointer", transition: "background 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          }}
            onMouseEnter={e => e.target.style.background = "#388bfd"}
            onMouseLeave={e => e.target.style.background = "#1f6feb"}
          >
            📋 Copy Room ID
          </button>
          <button onClick={leaveRoom} style={{
            background: "transparent", border: "1px solid #f85149",
            borderRadius: "8px", padding: "9px 14px", color: "#f85149",
            fontWeight: "600", fontSize: "13px", cursor: "pointer",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,81,73,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            ← Leave Room
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>

        {/* TOP BAR */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#161b22", padding: "0 16px",
          borderBottom: "1px solid #21262d", height: "48px", flexShrink: 0,
        }}>
          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setSidebarCollapsed(p => !p)} style={{
              background: "transparent", border: "1px solid #30363d",
              borderRadius: "6px", color: "#8b949e", cursor: "pointer",
              fontSize: "14px", padding: "4px 8px", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#8b949e"; e.target.style.color = "#e6edf3"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#30363d"; e.target.style.color = "#8b949e"; }}
              title="Toggle sidebar"
            >☰</button>
            <span style={{ fontSize: "13px", color: "#484f58" }}>|</span>
            <span style={{ fontSize: "13px", color: "#8b949e" }}>
              Room: <span style={{ color: "#58a6ff", fontFamily: "monospace" }}>{roomId?.slice(0, 8)}...</span>
            </span>
          </div>

          {/* Center - Tab */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{
              background: "#0d1117", border: "1px solid #21262d",
              borderRadius: "6px", padding: "4px 14px",
              fontSize: "13px", color: "#e6edf3",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{ color: "#f0883e" }}>●</span> main.js
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#3fb950" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3fb950" }} />
              {clients.length} online
            </div>
            <button onClick={() => setShowCompiler(p => !p)} style={{
              background: showCompiler ? "#1f6feb" : "transparent",
              border: "1px solid " + (showCompiler ? "#388bfd" : "#30363d"),
              borderRadius: "6px", padding: "5px 14px",
              color: showCompiler ? "white" : "#8b949e",
              fontWeight: "600", fontSize: "13px", cursor: "pointer",
              transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px",
            }}
              onMouseEnter={e => { if (!showCompiler) { e.currentTarget.style.borderColor = "#8b949e"; e.currentTarget.style.color = "#e6edf3"; } }}
              onMouseLeave={e => { if (!showCompiler) { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; } }}
            >
              ▶ {showCompiler ? "Hide Compiler" : "Run Code"}
            </button>
          </div>
        </div>

        {/* EDITOR + COMPILER */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Code Editor */}
          <div style={{ flex: showCompiler ? "0 0 55%" : "1", overflow: "hidden", background: "#0d1117" }}>
            <CodeEditor
              socketRef={socketRef}
              roomId={roomId}
              oncodechange={(code) => { codeRef.current = code; }}
            />
          </div>

          {/* Compiler Panel */}
          {showCompiler && (
            <div style={{
              flex: "0 0 45%",
              borderLeft: "1px solid #21262d",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              background: "#161b22",
            }}>
              <CompilerPanel getCode={() => codeRef.current} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;