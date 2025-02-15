import "../styles/Output.css";

export const Output = ({ code, output }) => {
  const lines = output.split("\n");

  return (
    <div className="Output">
      {/* Contenedor de números de línea y salida de código */}
      <div className="output-container">
        {/* Números de línea */}
        <div className="line-numbers">
          {lines.map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        
        {/* Contenido de salida */}
        <pre className="pre output-text">
          {lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};
