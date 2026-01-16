/**
 * Converts workout count to a shade of green
 * 0 workouts = light gray (#BDBDBD)
 * More workouts = darker/richer green
 */
export function getColorForWorkoutCount(count: number): string {
  if (count === 0) {
    return '#BDBDBD'; // Original gray color
  }
  
  // Calculate intensity based on count (cap at 50 for scaling)
  const intensity = Math.min(count / 50, 1);
  
  // Interpolate from light green to dark green
  // Light green: #90EE90 (rgb(144, 238, 144))
  // Dark green: #006400 (rgb(0, 100, 0))
  
  const r = Math.floor(144 - (144 * intensity));
  const g = Math.floor(238 - (138 * intensity)); // 238 -> 100
  const b = Math.floor(144 - (144 * intensity));
  
  // Convert to hex
  const toHex = (n: number) => {
    const hex = n.toString(16).padStart(2, '0');
    return hex.toUpperCase();
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
