import { useState } from "react";
import TypingBox from "../components/TypingBox";
import ResultPanel from "../components/ResultPanel";
import MistakeTable from "../components/MistakeTable";
import SessionCompare from "../components/SessionCompare";

function Dashboard() {
  const [result, setResult] = useState(null);

  async function handleFinish(res) {
    setResult(res);

    await fetch("http://localhost:5000/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(res)
    });
  }

  return (
    <div className="container">
      <h1>Typing Skill Analyzer</h1>

      <TypingBox onFinish={handleFinish} />

      {result && (
        <>
          <ResultPanel result={result} />
          <MistakeTable weakKeys={Object.entries(result.mistakeMap)} />
          <SessionCompare />
        </>
      )}
    </div>
  );
}

export default Dashboard;
