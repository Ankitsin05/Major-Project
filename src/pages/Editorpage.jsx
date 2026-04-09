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
    reactNavigate("/");
  };

  if (!location.state) return <Navigate to="/" />;

  return (
    <div className="mainWrap">
      {/* ── SIDEBAR ── */}
      <div className={`aside ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="asideInner">
          {/* Logo */}
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
            {!sidebarCollapsed && <span className="logo-label">CodeSync</span>}
          </div>

          {!sidebarCollapsed && (
            <>
              <p className="sidebar-tagline">connect and code together</p>

              <div className="clients-section">
                <p className="section-label">Live clients</p>
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
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="3" width="7" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="4" y="1" width="7" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Copy Room ID
              </button>
              <button className="btn leaveBtn" onClick={leaveRoom}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M8 6H2M5 3l-3 3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Leave
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div className="editorWrap">
        {/* Top bar */}
        <div className="editor-topbar">
          <button
            className="topbar-btn"
            onClick={() => setSidebarCollapsed((p) => !p)}
            title="Toggle sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="topbar-tabs">
            <span className="topbar-tab active">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2h8v8H2z" stroke="currentColor" strokeWidth="1" rx="1"/>
              </svg>
              main
            </span>
          </div>

          <div className="topbar-right">
            <span className="online-count">
              <span className="online-dot-sm" />
              {clients.length} online
            </span>
            <button
              className={`run-toggle-btn ${showCompiler ? "active" : ""}`}
              onClick={() => setShowCompiler((p) => !p)}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M3 2l8 4.5L3 11V2z" fill="currentColor"/>
              </svg>
              {showCompiler ? "Hide Compiler" : "Run Code"}
            </button>
          </div>
        </div>

        {/* Editor + Compiler split */}
        <div className={`editor-compiler-wrap ${showCompiler ? "split" : ""}`}>
          <div className="code-editor-area">
            <CodeEditor
              socketRef={socketRef}
              roomId={roomId}
              oncodechange={(code) => {
                codeRef.current = code;
              }}
            />
          </div>

          {showCompiler && (
            <div className="compiler-area">
              <CompilerPanel getCode={() => codeRef.current} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
