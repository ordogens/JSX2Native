import { useState, useEffect } from "react";
import { InputCode } from "../components/InputCode";
import { Output } from "../components/Output";
import '../styles/Home.css'

export const Home = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  // Ejecutar código automáticamente cuando cambia
  useEffect(() => {
    runCode(code);
  }, [code]);

  const runCode = (code) => {
    try {
      let outputCapture = "";
      const logInterceptor = (message) => (outputCapture += message + "\n");

      const originalConsoleLog = console.log;
      console.log = logInterceptor; // Interceptar `console.log()`

      const result = eval(code); // ⚠️ Ejecuta código (solo para JavaScript)

      console.log = originalConsoleLog; // Restaurar `console.log`

      setOutput(outputCapture || String(result) || "No hay salida");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="Home">
      <InputCode code={code} onCodeChange={setCode} />
      <Output code={code} output={output} />
    </div>
  );
};

