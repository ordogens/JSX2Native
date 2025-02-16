import { useState, useEffect } from "react";
import { InputCode } from "../components/InputCode";
import { Output } from "../components/Output";
import "../styles/Home.css";

export const Home = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    code.trim() ? runCode(code) : setOutput("");
  }, [code]);

  const runCode = async (code) => {
    try {
      let outputCapture = "";
      const originalConsole = { ...console };

      const captureOutput = (type, ...args) => {
        let formattedMessage = args
          .map((arg) =>
            typeof arg === "object"
              ? JSON.stringify(arg, null, 2)
              : typeof arg === "function"
                ? arg.toString()
                : String(arg)
          )
          .join(" ");

        outputCapture += `[${type}] ${formattedMessage}\n`;
      };

      console.log = (...args) => captureOutput("LOG", ...args);
      console.warn = (...args) => captureOutput("WARN", ...args);
      console.error = (...args) => captureOutput("ERROR", ...args);
      console.info = (...args) => captureOutput("INFO", ...args);

      console.table = (data) => {
        if (Array.isArray(data) || typeof data === "object") {
          let keys = Object.keys(data[0] || data);
          let rows = Array.isArray(data) ? data : [data];

          let columnWidths = keys.map((key) => {
            let maxKeyLength = key.length;
            let maxValueLength = Math.max(
              ...rows.map((row) => String(row[key] || "").length)
            );
            return Math.max(maxKeyLength, maxValueLength);
          });

          const padString = (str, length) =>
            str + " ".repeat(length - str.length);

          let tableString =
            "| " +
            keys.map((key, i) => padString(key, columnWidths[i])).join(" | ") +
            " |\n";
          tableString +=
            "| " +
            columnWidths.map((width) => "-".repeat(width)).join(" | ") +
            " |\n";

          rows.forEach((row) => {
            tableString +=
              "| " +
              keys
                .map((key, i) =>
                  padString(String(row[key] || ""), columnWidths[i])
                )
                .join(" | ") +
              " |\n";
          });

          outputCapture += `[TABLE]\n${tableString}\n`;
        } else {
          captureOutput("TABLE", data);
        }
      };

      const asyncWrapper = `(async () => { ${code} })()`;
      await eval(asyncWrapper);

      Object.assign(console, originalConsole);

      setOutput(outputCapture || "No hay salida");
    } catch (error) {
      setOutput(`[ERROR] ${error.message}`);
    }
  };

  return (
    <div className="Home">
      <div className="input-output-container">
        <InputCode code={code} onCodeChange={setCode} />
        <Output output={output} />
      </div>
    </div>
  );
};
