function MistakeTable({ weakKeys }) {
  return (
    <div className="card">
      <h3>Weak Keys</h3>

      <div className="key-list">
        {weakKeys.map(([key, count]) => (
          <div key={key} className="key-item">
            {key.toUpperCase()} — {count}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MistakeTable;
