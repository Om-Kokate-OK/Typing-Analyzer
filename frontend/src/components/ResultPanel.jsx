function ResultPanel({ result }) {
  return (
    <div className="card stats">
      <div className="stat">
        <h3>{result.wpm}</h3>
        <p>Words / Min</p>
      </div>

      <div className="stat">
        <h3>{result.accuracy}%</h3>
        <p>Accuracy</p>
      </div>
    </div>
  );
}


export default ResultPanel;
