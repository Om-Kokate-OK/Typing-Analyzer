export function calculateResults({ totalTyped, correctTyped, timeTaken, mistakeMap }) {
  const minutes = timeTaken / 60 || 1;
  const wpm = Math.round((correctTyped / 5) / minutes);
  const accuracy = Math.round((correctTyped / totalTyped) * 100);

  return { wpm, accuracy, mistakeMap };
}
