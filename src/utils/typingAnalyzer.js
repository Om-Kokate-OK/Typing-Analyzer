export function calculateResults({
  totalTyped,
  correctTyped,
  timeTaken,
  mistakeMap
}) {
  const minutes = timeTaken / 60 || 1;

  const wpm = Math.round((correctTyped / 5) / minutes);
  const accuracy = Math.round((correctTyped / totalTyped) * 100);

  const weakKeys = Object.entries(mistakeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return { wpm, accuracy, weakKeys };
}
