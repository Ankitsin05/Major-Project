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

      socketRef.current.on("connect_error", (err) => {
        handleErrors(err);
      });

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
    <div className="mainWrap">

      {/* SIDEBAR */}
      <div
        className="aside"
        style={{
          width: sidebarCollapsed ? "50px" : "200px",
          transition: "width 0.3s",
          overflow: "hidden",
          minWidth: sidebarCollapsed ? "50px" : "200px",
        }}
      >
        <div className="asideInner">
          <div className="logo" style={{ padding: "10px", borderBottom: "1px solid #444" }}>
            {!sidebarCollapsed && (
              <img className="logoImage" src="/code-sync.png" alt="logo" style={{ width: "175px" }} />
            )}
          </div>

          {!sidebarCollapsed && (
            <>
              <p style={{ color: "#94a3b8", fontSize: "13px", padding: "10px 10px 0" }}>
                connect and code together
              </p>
              <div style={{ padding: "10px" }}>
                <p style={{ color: "#64748b", fontSize: "11px", letterSpacing: "1px", marginBottom: "8px" }}>
                  LIVE CLIENTS
                </p>
                <div className="clients">
                  {clients.map((client) => (
                    <Client key={client.socketId} username={client.username} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="asidebottom">
          {!sidebarCollapsed && (
            <>
              <button className="btn copyBtn" onClick={copyRoomId}>
                Copy Room ID
              </button>
              <button className="btn leaveBtn" onClick={leaveRoom}>
                Leave
              </button>
            </>
          )}
        </div>
      </div>

      {/* MAIN AREA */}
      <div
        className="editorWrap"
        style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}
      >
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#21222c", padding: "6px 14px",
          borderBottom: "1px solid #313244", height: "40px", flexShrink: 0,
        }}>
          <button
            onClick={() => setSidebarCollapsed((p) => !p)}
            style={{
              background: "transparent", border: "none",
              color: "#94a3b8", cursor: "pointer", fontSize: "18px", padding: "0 8px",
            }}
            title="Toggle sidebar"
          >
            ☰
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#6272a4" }}>
              🟢 {clients.length} online
            </span>
            <button
              onClick={() => setShowCompiler((p) => !p)}
              style={{
                background: showCompiler ? "#7c3aed" : "#313244",
                border: "none", borderRadius: "6px", padding: "6px 14px",
                color: "white", fontWeight: "600", fontSize: "13px",
                cursor: "pointer", transition: "background 0.2s",
              }}
            >
              ▶ {showCompiler ? "Hide Compiler" : "Run Code"}
            </button>
          </div>
        </div>

        {/* Editor + Compiler split */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Code Editor Area */}
          <div style={{ flex: showCompiler ? "0 0 55%" : "1", overflow: "hidden" }}>
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
              borderLeft: "1px solid #313244",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
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
