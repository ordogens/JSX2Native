import React from "react";
import Editor from "@monaco-editor/react";
import "../styles/InputCode.css";

export const InputCode = ({ code, onCodeChange }) => {
  return (
    <div className="InputCode">
      <Editor
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={onCodeChange} // Envía el código en tiempo real a `App.js`
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,}}
      />
    </div>
  );
};
