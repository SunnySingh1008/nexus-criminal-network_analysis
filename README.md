# Nexus — Criminal Network Analysis (React)

React + Vite version of the Nexus dashboard prototype (SIH26189).

## Setup (laptop)

1. Install [Node.js](https://nodejs.org) (v18+) if you don't have it.
2. Open a terminal in this folder and run:
   ```
   npm install
   npm run dev
   ```
3. Open the URL it prints (usually `http://localhost:5173`).

## File map

| File | Screen / part |
|---|---|
| `src/App.jsx` | Screen router (which screen is showing) |
| `src/components/Intro.jsx` | Opening "ENTER TERMINAL" screen |
| `src/components/Cases.jsx` | Case list / case management |
| `src/components/Upload.jsx` | FIR/CDR/financial file upload |
| `src/components/Processing.jsx` | Animated analysis pipeline |
| `src/components/Dashboard.jsx` | Main dashboard (filters, stats, list/graph toggle) |
| `src/components/GraphView.jsx` | Cytoscape.js network graph |
| `src/components/DetailPanel.jsx` | Selected entity's profile panel |
| `src/data/mockData.js` | **Swap this for your backend API response** |
| `src/styles.css` | All styling (dark theme, design tokens) |

## Connecting your real backend

Everything currently reads from `src/data/mockData.js`. To go live:
1. Replace the `nodes` / `edges` exports with a `fetch()` call to your API
   (e.g. inside `App.jsx` with `useEffect` + `useState`, or a small custom hook).
2. Keep the same shape: `{ id, label, type, risk, aliases, sources, lastSeen }`
   for nodes and `{ source, target, rel }` for edges — no other component
   needs to change.
3. Wire `Upload.jsx`'s `addMockFile` to a real `<input type="file">` /
   drag-and-drop handler that POSTs to your ingest endpoint.
