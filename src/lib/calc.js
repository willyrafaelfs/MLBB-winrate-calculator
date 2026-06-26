// Pure calculation helpers for the target winrate calculator.
// All winrate inputs are percentages (0-100); internally we convert to fractions.

export function clampNumber(value, min, max) {
  const n = Number(value)
  if (Number.isNaN(n)) return min
  return Math.min(max, Math.max(min, n))
}

// Core derived stats from the three inputs.
export function computeStats({ totalMatches, currentWR, targetWR }) {
  const T = Math.max(0, Math.floor(totalMatches) || 0)
  const cwr = clampNumber(currentWR, 0, 100)
  // Target is capped just under 100% so the math never divides by zero.
  const twr = clampNumber(targetWR, 0, 99)

  const c = cwr / 100 // current winrate fraction
  const t = twr / 100 // target winrate fraction

  const currentWins = Math.round(T * c)
  const currentLosses = Math.max(0, T - currentWins)

  const reached = cwr >= twr

  // Wins needed assuming every additional match is won:
  // (currentWins + x) / (T + x) >= t  =>  x >= (t*T - currentWins) / (1 - t)
  let winsNeeded = 0
  if (!reached) {
    winsNeeded = Math.ceil((t * T - currentWins) / (1 - t))
    if (winsNeeded < 1) winsNeeded = 1 // gap exists, so at least one win is required
  }

  return {
    totalMatches: T,
    currentWR: cwr,
    targetWR: twr,
    currentWins,
    currentLosses,
    reached,
    winsNeeded,
    // Minimum matches to play == winsNeeded (all assumed wins)
    matchesToPlay: winsNeeded,
    gap: Math.max(0, +(twr - cwr).toFixed(1)),
  }
}

// Scenario: maintaining a given forward winrate, how many additional matches
// (and total after) are needed to reach the target.
// n = (t*T - currentWins) / (f - t), only solvable when f > t.
export function scenarioFor(stats, forwardWRPercent) {
  const t = stats.targetWR / 100
  const f = forwardWRPercent / 100
  if (f <= t) {
    return { forwardWR: forwardWRPercent, possible: false }
  }
  const rawN = (t * stats.totalMatches - stats.currentWins) / (f - t)
  const additionalMatches = Math.max(0, Math.ceil(rawN))
  const additionalWins = Math.round(additionalMatches * f)
  return {
    forwardWR: forwardWRPercent,
    possible: true,
    additionalMatches,
    additionalWins,
    totalAfter: stats.totalMatches + additionalMatches,
  }
}

export function buildScenarios(stats, forwardRates = [50, 55, 60, 70]) {
  return forwardRates.map((r) => scenarioFor(stats, r))
}

// Projection data for the chart: winrate as a function of additional wins (all won).
// x = additional wins, projected = (currentWins + x) / (totalMatches + x).
export function buildProjection(stats) {
  const maxX = Math.max(10, stats.winsNeeded + 10)
  const data = []
  for (let x = 0; x <= maxX; x++) {
    const denom = stats.totalMatches + x
    const wr = denom === 0 ? 0 : ((stats.currentWins + x) / denom) * 100
    data.push({ wins: x, winrate: +wr.toFixed(2) })
  }
  return data
}
