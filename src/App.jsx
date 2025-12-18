import { useState } from "react";
import TypingBox from "./components/TypingBox";
import ResultPanel from "./components/ResultPanel";
import MistakeTable from "./components/MistakeTable";
import "./index.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <h1>Typing Skill Analyzer</h1>

      <TypingBox onFinish={setResult} />

      {result && (
        <>
          <ResultPanel result={result} />
          <MistakeTable weakKeys={result.weakKeys} />
        </>
      )}
    </div>
  );
}

export default App;
