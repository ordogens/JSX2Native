import PropTypes from "prop-types";
import "../styles/Output.css";

export const Output = ({ output }) => {
  const lines = output ? output.split("\n") : [];

  return (
    <div className="Output">
      {output && (
        <div className="output-container">
          <div className="line-numbers">
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          <pre className="pre output-text">
            {lines.map((line, index) => (
              <div key={index}>{line || " "}</div>
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
