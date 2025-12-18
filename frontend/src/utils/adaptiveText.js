import wordBank from "../data/wordBank";

export function generateText({
  mode = "words",        // words | time
  count = 30,
  mistakeMap = {},
}) {
  const weakKeys = Object.entries(mistakeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  const normalPool = [...wordBank];

  const weakPool = wordBank.filter(word =>
    weakKeys.some(k => word.includes(k))
  );

  const finalWords = [];

  for (let i = 0; i < count; i++) {
    const useWeak =
      weakPool.length > 0 && Math.random() < 0.2; // 20% only

    const source = useWeak ? weakPool : normalPool;
    finalWords.push(
      source[Math.floor(Math.random() * source.length)]
    );
  }

  return finalWords.join("   "); // 👈 EXTRA SPACING
}
