# MLBB Winrate Tracker

A clean, mobile-friendly **Mobile Legends: Bang Bang** target winrate calculator. Enter your current stats in aggregate — total matches, current winrate, and target winrate — and instantly see how many more wins you need, with scenario breakdowns and a live projection chart. No accounts, no backend, no data storage.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-charts-22B5BF)
![Lucide](https://img.shields.io/badge/Lucide-icons-F56565)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Target Winrate Calculator** — three inputs (total matches, current winrate %, target winrate %); everything recalculates instantly as you type.
- **Result Summary** — four stat cards: current wins, wins needed, winrate gap, and minimum matches to play (assuming all wins).
- **Progress Bar** — a visual bar of your current winrate progressing toward the target, with an "already reached" state.
- **What If Scenarios** — a table showing how many additional matches you'd need if you maintain a 50% / 55% / 60% / 70% winrate going forward (rows that can't reach the target are filtered out).
- **Projection Chart** — a line chart of projected winrate as you win more games, with a dashed target line and a marker at the crossing point.
- **Icons, not emoji** — all decorative elements use [Lucide](https://lucide.dev/) icons.
- **Responsive & modern** — light, clean UI built with Tailwind, works great on mobile.

## How the math works

```text
currentWins = round(totalMatches * currentWR / 100)

// Wins needed assuming every additional match is won:
winsNeeded  = ceil((targetWR/100 * totalMatches - currentWins) / (1 - targetWR/100))

// Additional matches if you maintain a forward winrate f (only when f > target):
n = (targetWR/100 * totalMatches - currentWins) / (f/100 - targetWR/100)
```

If `currentWR >= targetWR`, the app shows that you've already reached your target.

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) (chart)
- [Lucide React](https://lucide.dev/) (icons)
- Plain React `useState` / `useMemo` — no global state, no localStorage

## Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/mlbb-winrate.git
cd mlbb-winrate

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the printed URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Vite. Confirm the settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

> No environment variables are required — the app is fully client-side.

You can also deploy from the CLI:

```bash
npm i -g vercel
vercel
```

## Screenshot

> _Add a screenshot of the app here._

![App Screenshot](./screenshot.png)

## Project Structure

```
mlbb-winrate/
├── src/
│   ├── components/
│   │   ├── InputSection.jsx     # Three inputs + sliders + Calculate button
│   │   ├── ResultSummary.jsx    # Four result stat cards
│   │   ├── ProgressCard.jsx     # Current vs target progress bar
│   │   ├── ScenarioTable.jsx    # "What if" forward-winrate table
│   │   └── ProjectionChart.jsx  # Projected winrate line chart
│   ├── lib/
│   │   └── calc.js              # Pure calculation helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```

## License

MIT — free to use and modify.
