import { convertJSXToReactNative } from "../utils/converter";
import { InputCode } from "../components/InputCode";
import { Output } from "../components/Output";
import { useState, useEffect } from "react";
import "../styles/Home.css";

export const Home = () => {
  const [code, setCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");

  useEffect(() => {
    if (code.trim()) {
      try {
        const result = convertJSXToReactNative(code);
        setConvertedCode(result);
      } catch (error) {
        setConvertedCode(`[ERROR CONVERT] ${error.message}`);
      }
    } else {
      setConvertedCode("");
    }
  }, [code]);

  return (
    <div className="Home">
      <div className="input-output-container">
        <InputCode code={code} onCodeChange={setCode} />
        <Output output={convertedCode} />
      </div>
    </div>
  );
};
