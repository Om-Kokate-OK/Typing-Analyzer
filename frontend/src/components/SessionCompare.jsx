import { useEffect, useState } from "react";

function SessionCompare() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sessions/last", {
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(setSessions);
  }, []);

  if (sessions.length < 2) return null;

  const [current, previous] = sessions;

  return (
    <div className="box">
      <h3>Progress Since Last Session</h3>
      <p>WPM: {previous.wpm} → {current.wpm}</p>
      <p>Accuracy: {previous.accuracy}% → {current.accuracy}%</p>
    </div>
  );
}

export default SessionCompare;
