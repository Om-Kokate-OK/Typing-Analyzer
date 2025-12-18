import { getFingerSuggestions } from "../utils/fingerCoach";

function FingerCoach({ mistakeMap }) {
  const suggestions = getFingerSuggestions(mistakeMap);

  if (suggestions.length === 0) return null;

  return (
    <div className="card">
      <h3>Finger Position Suggestions</h3>

      {suggestions.map(({ key, count, finger }) => (
        <div key={key} className="coach-row">
          <span className="coach-key">{key.toUpperCase()}</span>
          <span className="coach-finger">{finger}</span>
          <span className="coach-count">{count} mistakes</span>
        </div>
      ))}

      <p className="coach-tip">
        💡 Tip: Keep your fingers on the home row (A S D F – J K L ;)
      </p>
    </div>
  );
}

export default FingerCoach;
