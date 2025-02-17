import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/InputCode.css";

export const InputCode = ({ code, onCodeChange }) => {
  const monaco = useMonaco();
  const [themeDefined, setThemeDefined] = useState(false);

  useEffect(() => {
    if (monaco && !themeDefined) {
      monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#1e1e1e99",
          "editor.border": "#00000000",
          focusBorder: "#00000000",
        },
      });
      setThemeDefined(true);
    }
  }, [monaco, themeDefined]);

  return (
    <div className="InputCode">
      <Editor
        defaultLanguage="javascript"
        theme={themeDefined ? "custom-dark" : "vs-dark"}
        value={code}
        onChange={onCodeChange}
        loading={
          <div style={{ color: "#000", textAlign: "center" }}>
            Loading editor...
          </div>
        }
        options={{
          lineNumbersMinChars: 3,
          padding: { top: 10, bottom: 10 },
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

InputCode.propTypes = {
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
};
