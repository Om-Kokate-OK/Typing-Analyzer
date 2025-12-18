function ResultPanel({ result }) {
  return (
    <div className="result-box">
      <h2>Results</h2>
      <p><b>WPM:</b> {result.wpm}</p>
      <p><b>Accuracy:</b> {result.accuracy}%</p>
    </div>
  );
}

export default ResultPanel;
