import React, { useState } from "react";

const LANGUAGES = [
  { label: "Python", value: "python", version: "3.10.0", defaultCode: 'print("Hello, World!")' },
  { label: "C++", value: "c++", version: "10.2.0", defaultCode: '#include<iostream>\nusing namespace std;\nint main(){\n    cout<<"Hello, World!"<<endl;\n    return 0;\n}' },
  { label: "C", value: "c", version: "10.2.0", defaultCode: '#include<stdio.h>\nint main(){\n    printf("Hello, World!\\n");\n    return 0;\n}' },
  { label: "Java", value: "java", version: "15.0.2", defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
];

const CompilerPanel = ({ getCode }) => {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
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
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language.value,
          version: language.version,
          files: [{ content: code }],
          stdin: stdin,
        }),
      });

      const data = await res.json();
      console.log("Compiler API response:", data);
      const stdout = data.run?.stdout || "";
      const stderr = data.run?.stderr || "";
    //   const out = stdout + stderr || "No output.";
    //   const hasError = !!stderr && !stdout;
 

    let finalOutput = "";

    if (stdout.trim()) {
      finalOutput = stdout;
    } else if (stderr.trim()) {
      finalOutput = stderr;
    } else {
      finalOutput = "No output.";
    }


      setOutput(finalOutput);
      setStatus(stderr ? "error" : "success");
    } catch (err) {
    //   setOutput("Network error: Could not reach the compiler API.\n" + err.message);
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
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{marginRight: 6, verticalAlign: 'middle'}}>
              <path d="M4 6l-3 2 3 2M12 6l3 2-3 2M9 3l-2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
            title="Toggle stdin input"
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
                  <path d="M3 2l7 4-7 4V2z" fill="currentColor"/>
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
          <label className="stdin-label">stdin input</label>
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
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{marginBottom: 8, opacity: 0.3}}>
              <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 10l4 4-4 4M15 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Output will appear here after you run your code</p>
          </div>
        )}

        {isRunning && (
          <div className="output-placeholder">
            <div className="output-dots">
              <span /><span /><span />
            </div>
            <p style={{marginTop: 10}}>Executing {language.label}...</p>
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
