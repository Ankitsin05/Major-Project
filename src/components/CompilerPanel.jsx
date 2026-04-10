import React, { useState } from "react";

const LANGUAGES = [
  { label: "Python", value: "python", version: "3.10.0", id: 71 },
  { label: "C++", value: "cpp", version: "10.2.0", id: 54 },
  { label: "C", value: "c", version: "10.2.0", id: 50 },
  { label: "Java", value: "java", version: "15.0.2", id: 62 },
];

const CompilerPanel = ({ getCode }) => {
  const [language, setLanguage] = useState(LANGUAGES[1]); // default C++
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
    console.log("Code to run:", code);

    if (!code.trim()) {
      setOutput("⚠ No code to run. Write some code in the editor first.");
      setStatus("error");
      setIsRunning(false);
      return;
    }

    try {
      const res = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            language_id: language.id,
            source_code: code,
            stdin: stdin,
          }),
        }
      );

      const data = await res.json();
      console.log("Judge0 response:", data);

      const stdout = data.stdout || "";
      const stderr = data.stderr || "";
      const compileOutput = data.compile_output || "";

      let finalOutput = "";
      if (stdout.trim()) {
        finalOutput = stdout;
      } else if (compileOutput.trim()) {
        finalOutput = compileOutput;
      } else if (stderr.trim()) {
        finalOutput = stderr;
      } else {
        finalOutput = "No output.";
      }

      setOutput(finalOutput);
      setStatus(stderr || compileOutput ? "error" : "success");
    } catch (err) {
      setOutput("Error: " + err.message);
      setStatus("error");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="compiler-panel">

      {/* Header */}
      <div className="compiler-header">
        <div className="compiler-header-left">
          <span className="compiler-title">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: 6, verticalAlign: "middle" }}>
              <path d="M4 6l-3 2 3 2M12 6l3 2-3 2M9 3l-2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Run Code
          </span>
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
          <button
            className="stdin-toggle"
            onClick={() => setShowStdin((p) => !p)}
          >
            {showStdin ? "Hide stdin" : "stdin"}
          </button>
          <button
            className={`run-btn ${isRunning ? "running" : ""}`}
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span className="spinner" />
                Running...
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 2l7 4-7 4V2z" fill="currentColor" />
                </svg>
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stdin */}
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

      {/* Output */}
      <div className="compiler-output">
        {output === "" && !isRunning && (
          <div className="output-placeholder">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginBottom: 8, opacity: 0.3 }}>
              <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 10l4 4-4 4M15 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Output will appear here after you run your code</p>
          </div>
        )}

        {isRunning && (
          <div className="output-placeholder">
            <div className="output-dots">
              <span /><span /><span />
            </div>
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