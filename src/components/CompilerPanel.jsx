import React, { useState } from "react";

const LANGUAGES = [
  { label: "Python", value: "python3", version: "3.10.0", versionIndex: "4" },
  { label: "C++", value: "cpp17", version: "10.2.0", versionIndex: "0" },
  { label: "C", value: "c", version: "10.2.0", versionIndex: "5" },
  { label: "Java", value: "java", version: "15.0.2", versionIndex: "4" },
];

const CompilerPanel = ({ getCode }) => {
  const [language, setLanguage] = useState(LANGUAGES[1]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState(null);
  const [stdin, setStdin] = useState("");
  const [showStdin, setShowStdin] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setStatus(null);

    const code = getCode?.() || "";
    if (!code.trim()) {
      setOutput("⚠ No code to run. Write some code in the editor first.");
      setStatus("error");
      setIsRunning(false);
      return;
    }

    try {
      // ✅ Server se call hogi - no CORS issue
      const res = await fetch("http://localhost:5002/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: code,
          language: language.value,
          versionIndex: language.versionIndex,
          stdin: stdin,
        }),
      });

      const data = await res.json();
      console.log("Compiler response:", data);

      setOutput(data.output || "No output.");
      setStatus(data.isExecutionSuccess ? "success" : "error");
    } catch (err) {
      setOutput("Error: " + err.message);
      setStatus("error");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="compiler-panel">
      <div className="compiler-header">
        <div className="compiler-header-left">
          <span className="compiler-title">Run Code</span>
          <div className="lang-select-wrap">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                className={`lang-tab ${language.value === lang.value ? "active" : ""}`}
                onClick={() => setLanguage(lang)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
        <div className="compiler-header-right">
          <button className="stdin-toggle" onClick={() => setShowStdin((p) => !p)}>
            {showStdin ? "Hide stdin" : "stdin"}
          </button>
          <button
            className={`run-btn ${isRunning ? "running" : ""}`}
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <><span className="spinner" /> Running...</>
            ) : (
              <>▶ Run</>
            )}
          </button>
        </div>
      </div>

      {showStdin && (
        <div className="stdin-area">
          <label className="stdin-label">STDIN INPUT</label>
          <textarea
            className="stdin-input"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            placeholder="Enter input for your program here..."
            rows={3}
          />
        </div>
      )}

      <div className="compiler-output">
        {output === "" && !isRunning && (
          <div className="output-placeholder">
            <p>Output will appear here after you run your code</p>
          </div>
        )}
        {isRunning && (
          <div className="output-placeholder">
            <div className="output-dots"><span /><span /><span /></div>
            <p style={{ marginTop: 10 }}>Executing {language.label}...</p>
          </div>
        )}
        {output && (
          <div className={`output-content ${status}`}>
            <div className="output-badge">
              {status === "success" ? (
                <span className="badge success">✓ Success</span>
              ) : (
                <span className="badge error">✕ Error</span>
              )}
              <span className="output-lang">{language.label} · v{language.version}</span>
            </div>
            <pre className="output-pre">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompilerPanel;