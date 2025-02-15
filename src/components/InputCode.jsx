import './../styles/InputCode.css'
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export const InputCode = () => {
  const [code, setCode] = useState("// Escribe tu código aquí...");
  return (
    <div className='InputCode'>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />
    </div>
  )
}
