import { useEffect, useState } from "react";
import TypingBox from "../components/TypingBox";
import ResultPanel from "../components/ResultPanel";
import MistakeTable from "../components/MistakeTable";
import KeyboardHeatmap from "../components/KeyboardHeatmap";
import FingerCoach from "../components/FingerCoach";
import Profile from "./Profile";
import ProgressChart from "../components/ProgressChart";
import { generateText } from "../utils/adaptiveText";
import { updateDifficulty } from "../utils/difficultyAI";

function Dashboard() {
  const [view, setView] = useState("typing");
  const [testMode, setTestMode] = useState("words"); // words | time
  const [wordCount, setWordCount] = useState(25);
  const [timeLimit, setTimeLimit] = useState(30);
  const [difficulty, setDifficulty] = useState(2);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [restartKey, setRestartKey] = useState(0);
  const [isTyping, setIsTyping] = useState(false); // New state to hide UI while typing

  const [text, setText] = useState(() => generateText({ count: 25 }));

  function restartTest() {
    setResult(null);
    setIsTyping(false);
    setRestartKey(k => k + 1);
  }

  // Handle shortcuts
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        restartTest();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const newText = generateText({
      mode: testMode,
      count: testMode === "words" ? wordCount : 50,
      mistakeMap: result?.mistakeMap || {}
    });
    setText(newText);
    restartTest();
  }, [testMode, wordCount, timeLimit]);

  async function handleFinish(res) {
    setResult(res);
    setIsTyping(false);
    // ... (Your existing fetch and difficulty logic)
  }

  return (
    <div className="monkey-theme">
      {/* HEADER */}
      <nav className={`nav-bar ${isTyping ? "hidden" : ""}`}>
        <div className="logo" onClick={() => setView("typing")}>
          ⌨️ <span className="logo-text">typing.skill</span>
        </div>
        <div className="nav-links">
          <button onClick={() => setView(view === "typing" ? "profile" : "typing")}>
            {view === "typing" ? "👤" : "⬅ Back"}
          </button>
        </div>
      </nav>

      <main className="content">
        {view === "profile" ? (
          <Profile />
        ) : (
          <div className="typing-area-wrapper">
            {/* CONFIG BAR - Only visible when not typing/no results */}
            {!result && !isTyping && (
              <div className="config-bar">
                <div className="group">
                  <button className={testMode === "time" ? "active" : ""} onClick={() => setTestMode("time")}>time</button>
                  <button className={testMode === "words" ? "active" : ""} onClick={() => setTestMode("words")}>words</button>
                </div>
                <div className="line"></div>
                <div className="group">
                  {testMode === "time" ? 
                    [15, 30, 60].map(t => <button key={t} className={timeLimit === t ? "active" : ""} onClick={() => setTimeLimit(t)}>{t}</button>) :
                    [25, 50, 100].map(n => <button key={n} className={wordCount === n ? "active" : ""} onClick={() => setWordCount(n)}>{n}</button>)
                  }
                </div>
              </div>
            )}

            {/* TYPING BOX */}
            {!result ? (
              <div className="typing-container">
                <TypingBox
                  key={restartKey}
                  text={text}
                  onFinish={handleFinish}
                  onStart={() => setIsTyping(true)} // You'll need to trigger this in TypingBox
                  mode={testMode}
                  timeLimit={timeLimit}
                />
                <div className="restart-hint">
                  <span className="key">Tab</span> - restart
                </div>
              </div>
            ) : (
              /* RESULTS VIEW */
              <div className="results-wrapper">
                <ResultPanel result={result} />
                <div className="stats-grid">
                  <ProgressChart data={history} />
                  <KeyboardHeatmap mistakeMap={result.mistakeMap} />
                  <FingerCoach mistakeMap={result.mistakeMap} />
                </div>
                <button className="restart-btn" onClick={restartTest}>Next Test</button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className={isTyping ? "hidden" : ""}>
        <div className="hints">
          <span>Shift + Tab</span> - Profile
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;