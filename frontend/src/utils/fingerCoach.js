import fingerMap from "../data/fingerMap";

export function getFingerSuggestions(mistakeMap, limit = 5) {
  return Object.entries(mistakeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({
      key,
      count,
      finger: fingerMap[key] || "Unknown"
    }));
}
