import { useEffect, useState } from "react";
import sampleText from "../data/sampleText";
import { calculateResults } from "../utils/typingAnalyzer";

function TypingBox({ onFinish }) {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [mistakeMap, setMistakeMap] = useState({});
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (input.length === 1 && startTime === null) {
      setStartTime(Date.now());
    }
  }, [input, startTime]);

  function handleChange(e) {
    const value = e.target.value;
    const index = value.length - 1;

    const expectedChar = sampleText[index];
    const typedChar = value[index];

    if (typedChar && expectedChar) {
      if (typedChar === expectedChar) {
        setCorrectCount((prev) => prev + 1);
      } else {
        setMistakeMap((prev) => ({
          ...prev,
          [expectedChar]: (prev[expectedChar] || 0) + 1
        }));
      }
    }

    setInput(value);

    if (value.length === sampleText.length && startTime) {
      const timeTaken = (Date.now() - startTime) / 1000;

      const result = calculateResults({
        totalTyped: value.length,
        correctTyped: correctCount,
        timeTaken,
        mistakeMap
      });

      onFinish(result);
    }
  }

    return (
    <div className="card">
      <div className="typing-text">{sampleText}</div>

      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
    </div>
  );
}


export default TypingBox;
