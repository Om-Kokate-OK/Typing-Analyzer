import keyboardLayout from "../data/keyboardLayout";
import { getKeyColor } from "../utils/heatmap";

function KeyboardHeatmap({ mistakeMap }) {
  return (
    <div className="card">
      <h3>Keyboard Error Heatmap</h3>

      <div className="keyboard">
        {keyboardLayout.map((row, rowIndex) => (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((key) => {
              const count = mistakeMap[key] || 0;

              return (
                <div
                  key={key}
                  className="key"
                  style={{ backgroundColor: getKeyColor(count) }}
                  title={`${key.toUpperCase()} → ${count} mistakes`}
                >
                  {key.toUpperCase()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyboardHeatmap;
