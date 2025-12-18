export function getKeyColor(count = 0) {
  if (count === 0) return "#1f2937";   // no mistake
  if (count <= 2) return "#facc15";    // yellow
  if (count <= 5) return "#fb923c";    // orange
  return "#ef4444";                    // red
}
