// Pure calculation helpers for the target winrate calculator.
// Winrates come in as percentages (0-100) and are converted to fractions here.

const EPS = 1e-9

// Accepts "67,5" as well as "67.5" so Indonesian decimal commas work.
export function parseNumber(raw) {
  if (raw === '' || raw === null || raw === undefined) return NaN
  return Number(String(raw).trim().replace(',', '.'))
}

// Validates the three inputs and derives every number the UI needs.
// Returns { error } when the inputs can't produce an answer.
export function analyze({ matches, current, target }) {
  const T = Math.floor(parseNumber(matches))
  const cwr = parseNumber(current)
  const twr = parseNumber(target)

  if (!Number.isFinite(T) || T <= 0) return { error: 'noMatches', field: 'matches' }
  if (!Number.isFinite(cwr) || cwr < 0) return { error: 'noCurrent', field: 'current' }
  if (cwr > 100) return { error: 'currentOver', field: 'current' }
  if (!Number.isFinite(twr) || twr <= 0) return { error: 'noTarget', field: 'target' }
  if (twr > 100) return { error: 'targetOver', field: 'target' }

  const W = Math.round((T * cwr) / 100)
  const L = T - W
  const t = twr / 100

  if (twr >= 100 && L > 0) return { error: 'target100', field: 'target' }

  const reached = cwr >= twr || W / T >= t - EPS

  // Wins in a row needed: (W + x) / (T + x) >= t  =>  x >= (tT - W) / (1 - t)
  let winsNeeded = 0
  if (!reached) {
    winsNeeded = Math.max(1, Math.ceil((t * T - W) / (1 - t) - EPS))
  }

  // Losses in a row you can afford while staying at or above target: W / (T + y) >= t
  const buffer = reached ? Math.max(0, Math.floor(W / t - T + EPS)) : 0

  const finalMatches = T + winsNeeded
  const finalWR = ((W + winsNeeded) / finalMatches) * 100

  return {
    totalMatches: T,
    currentWR: cwr,
    targetWR: twr,
    wins: W,
    losses: L,
    reached,
    winsNeeded,
    buffer,
    finalMatches,
    finalWR,
    gap: Math.max(0, twr - cwr),
  }
}

// Holding a forward winrate f, how many more matches until the target?
// n = (tT - W) / (f - t), only solvable when f > t.
export function scenarioFor(stats, forwardWR) {
  const t = stats.targetWR / 100
  const f = forwardWR / 100
  if (f <= t) return { forwardWR, possible: false }
  const n = Math.max(1, Math.ceil((t * stats.totalMatches - stats.wins) / (f - t) - EPS))
  return {
    forwardWR,
    possible: true,
    matches: n,
    wins: Math.ceil(n * f - EPS),
  }
}

export const FORWARD_RATES = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95]

export function buildScenarios(stats, rates = FORWARD_RATES) {
  return rates.map((r) => scenarioFor(stats, r))
}

// Chart data. Not reached: winrate across a win streak.
// Reached: winrate across a losing streak, to show how much room there is.
export function buildProjection(stats) {
  const { totalMatches: T, wins: W, reached } = stats
  const pivot = reached ? stats.buffer : stats.winsNeeded
  const span = Math.min(2000, pivot + Math.max(6, Math.round(pivot * 0.3)))
  const data = []
  for (let x = 0; x <= span; x++) {
    const wr = reached ? W / (T + x) : (W + x) / (T + x)
    data.push({ x, winrate: +(wr * 100).toFixed(2) })
  }
  return data
}

// Ledger: one square per match, or per k matches once the record gets long.
const STEPS = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

export function buildLedger(stats, maxCells = 240) {
  const total = stats.totalMatches + stats.winsNeeded
  const per = STEPS.find((s) => total / s <= maxCells) ?? Math.ceil(total / maxCells)
  const round = (n) => (n > 0 ? Math.max(1, Math.round(n / per)) : 0)
  return {
    per,
    wins: round(stats.wins),
    losses: round(stats.losses),
    need: stats.winsNeeded > 0 ? Math.max(1, Math.ceil(stats.winsNeeded / per)) : 0,
  }
}
