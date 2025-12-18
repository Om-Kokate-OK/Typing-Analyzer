import { useEffect, useRef, useState } from "react";
import { calculateResults } from "../utils/typingAnalyzer";

function TypingBox({ text, onFinish }) {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [mistakeMap, setMistakeMap] = useState({});
  const [correctCount, setCorrectCount] = useState(0);

  const inputRef = useRef(null);

  /* Reset when text changes */
  useEffect(() => {
    setInput("");
    setStartTime(null);
    setMistakeMap({});
    setCorrectCount(0);
    inputRef.current?.focus();
  }, [text]);

  function handleChange(e) {
    const value = e.target.value;
    const index = value.length - 1;

    if (!startTime) setStartTime(Date.now());

    const expectedChar = text[index];
    const typedChar = value[index];

    if (typedChar && expectedChar) {
      if (typedChar === expectedChar) {
        setCorrectCount((c) => c + 1);
      } else {
        setMistakeMap((m) => ({
          ...m,
          [expectedChar]: (m[expectedChar] || 0) + 1
        }));
      }
    }

    setInput(value);

    if (value.length === text.length && startTime) {
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
    <div className="card" onClick={() => inputRef.current.focus()}>
      {/* Visible typing text */}
      <div className="typing-text">
        {text.split("").map((char, idx) => {
          let className = "";

          if (idx < input.length) {
            className =
              input[idx] === char ? "char correct" : "char wrong";
          } else if (idx === input.length) {
            className = "char current";
          } else {
            className = "char pending";
          }

          return (
            <span key={idx} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Hidden input */}
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        className="hidden-input"
        autoFocus
      />
    </div>
  );
}

export default TypingBox;
