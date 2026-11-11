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

## Clone the Repository

The project is mirrored on both GitHub and GitLab — clone from either one:

```bash
# GitHub
git clone https://github.com/willyrafaelfs/MLBB-winrate-calculator.git

# GitLab
git clone https://gitlab.com/willyrafaelfs/MLBB-winrate-calculator.git

cd MLBB-winrate-calculator
```

## Run with Docker

The app is built with Node.js and served as static files by Nginx in a lightweight container. Requires [Docker](https://docs.docker.com/get-docker/) with Docker Compose.

```bash
# Build the image and start the container in the background
docker compose up -d --build
```

Then open `http://localhost:8080`.

Common commands:

```bash
docker compose logs -f      # follow container logs
docker compose down         # stop and remove the container
docker compose up -d --build  # rebuild after code changes
```

Without Docker Compose:

```bash
docker build -t mlbb-winrate-calculator .
docker run -d -p 8080:80 --name mlbb-winrate-calculator mlbb-winrate-calculator
```

> To use a different port, change the left side of the port mapping (e.g. `"3000:80"`) in `docker-compose.yml`.

## Run Locally (without Docker)

Requires Node.js 20.19+ or 22.12+.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
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

![App Screenshot](./src/assets/screenshot.png)

![App Screenshot](./src/assets/screenshot2.png)

## Project Structure

```
MLBB-winrate-calculator/
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
├── Dockerfile                   # Multi-stage build (Node → Nginx)
├── docker-compose.yml           # Runs the app on port 8080
├── nginx.conf                   # Nginx config for serving the build
├── .dockerignore
├── index.html
├── tailwind.config.js
└── package.json
```

## License & Credit

MIT — free to use and modify.
- **Willy Rafael F. Silalahi**
- **GitHub:** [@willyrafaelfs](https://github.com/willyrafaelfs)
- **Email:** [willy.rafaelfs@gmail.com](mailto:willy.rafaelfs@gmail.com)