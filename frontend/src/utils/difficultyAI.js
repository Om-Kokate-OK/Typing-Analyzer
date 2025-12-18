export function updateDifficulty({
  currentLevel,
  wpm,
  accuracy
}) {
  let level = currentLevel;

  // 🔼 increase difficulty
  if (accuracy >= 95 && wpm >= 45) {
    level += 1;
  }

  // 🔽 decrease difficulty
  if (accuracy < 85) {
    level -= 1;
  }

  // clamp between 1 and 5
  if (level < 1) level = 1;
  if (level > 5) level = 5;

  return level;
}

export function difficultyConfig(level) {
  return {
    1: { length: 20, complexWords: false },
    2: { length: 25, complexWords: false },
    3: { length: 30, complexWords: true },
    4: { length: 40, complexWords: true },
    5: { length: 50, complexWords: true }
  }[level];
}
