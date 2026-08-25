// Splits a lesson duration (minutes) into phase timings.
// Ratios roughly follow the app spec's 30/40/60-minute examples and
// scale proportionally for any other duration.
const PHASE_RATIOS = {
  introduction: 0.15,
  teaching: 0.35,
  activity: 0.3,
  assessment: 0.13,
  closure: 0.07,
}

export function getDurationBreakdown(totalMinutes) {
  const minutes = Number(totalMinutes) || 40
  const raw = Object.entries(PHASE_RATIOS).map(([phase, ratio]) => [
    phase,
    Math.max(3, Math.round(minutes * ratio)),
  ])

  // Adjust rounding drift so the parts sum back to the total.
  const sum = raw.reduce((acc, [, val]) => acc + val, 0)
  let diff = minutes - sum
  let i = raw.length - 1
  while (diff !== 0 && i >= 0) {
    const step = diff > 0 ? 1 : -1
    if (raw[i][1] + step >= 3) {
      raw[i][1] += step
      diff -= step
    }
    i = i === 0 ? raw.length - 1 : i - 1
  }

  return Object.fromEntries(raw)
}
