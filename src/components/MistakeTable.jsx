function MistakeTable({ weakKeys }) {
  return (
    <div className="result-box">
      <h2>Weak Keys</h2>

      {weakKeys.length === 0 ? (
        <p>No major weak keys 🎉</p>
      ) : (
        <ul>
          {weakKeys.map(([key, count]) => (
            <li key={key}>
              <b>{key}</b> → {count} mistakes
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MistakeTable;
