import React, { useEffect, useRef } from "react";
import codemirror from "codemirror";
import ACTIONS from "../Actions";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";

import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

// ❌ REMOVED: lint imports — they were showing fake JS errors on C++/Python code
// import "codemirror/addon/lint/lint";
// import "codemirror/addon/lint/lint.css";
// import "codemirror/addon/lint/javascript-lint";
// import { JSHINT } from "jshint";
// window.JSHINT = JSHINT;

const CodeEditor = ({ socketRef, roomId, oncodechange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) return;

    editorRef.current = codemirror.fromTextArea(
      document.getElementById("realtimeCodeEditor"),
      {
        mode: { name: "javascript", json: true },
        lineNumbers: true,
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lint: false,        // ✅ lint completely disabled
        gutters: [],        // ✅ no gutter markers
      }
    );
    // 🔥 DEFAULT CODE (only first time)
const defaultCode = `#include<iostream>
using namespace std;
int main(){
    cout<<"Hello, World!"<<endl;
    return 0;
}`;

// sync with parent (VERY IMPORTANT)
oncodechange(defaultCode);

    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      oncodechange(code);
      if (origin !== "setValue") {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      if (code !== null && editorRef.current) {
        editorRef.current.setValue(code);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  return (
    <textarea
      id="realtimeCodeEditor"
      style={{ width: "100%", height: "100%" }}
      placeholder="Start coding here..."
    />
  );
};

export default CodeEditor;
