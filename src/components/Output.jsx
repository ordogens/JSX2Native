import "../styles/Output.css";
import PropTypes from "prop-types";

export const Output = ({ output }) => {
  // Evitar split de undefined o valores vacíos
  const lines = output ? output.split("\n") : [];

  return (
    <div className="Output">
      {output && (
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
              <div key={index}>{line || " "}</div> // Evita altura inconsistente
            ))}
          </pre>
        </div>
      )}
    </div>
  );
};

Output.propTypes = {
  output: PropTypes.string,
};
