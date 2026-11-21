# AccessPath

AccessPath is a proposed accessibility-first navigation project for Thapar University. It aims to help people discover selected indoor rooms and labs, choose step-free routes where route details have been checked, and respond to temporary closures or gate changes.

## Hackathon MVP

Build a small surveyed zone covering selected connected areas of C, F and E blocks. Keep the first version to one or two floors and a handful of rooms or labs. A user chooses a known start by scanning a QR checkpoint or selecting it manually; the MVP does not continuously track the user. A graph search (Dijkstra) finds a route, respecting verified accessibility attributes. A user can report or block a path and request a reroute. Show a simple gate status notice.

## Proposed stack

These are starting suggestions, not settled decisions: React with Vite for the interface; a small Node.js/Express API; SQLite for a fast local prototype; and a graph represented as nodes and edges queried with Dijkstra. GeoJSON or a hand-drawn floor plan can provide the initial map. Confirm tools with the team before implementation; a simpler all-in-one stack is also reasonable.

## Ground truth and scope

Treat all campus details as unverified until a team member surveys them. User-reported examples include selected interconnected C, F and E blocks; possible Saturnalia stalls near J/H hostels; and gates whose use may differ for students and deliveries. These are examples to validate, not live or authoritative status. Never label a route step-free unless its ramps, lifts, widths/clearances where relevant, and access conditions have been checked. Give reports an expiry/review time and identify stale information.

## Team workflow

1. Agree on a tiny survey boundary and assign mapping, interface, and integration/API responsibilities.
2. Record nodes, connections, floors, accessibility evidence, and last-checked time.
3. Implement a working route through the surveyed sample, then add reporting and gate notices.
4. Demo with clearly labelled sample data and explain what remains unverified.

See [ARCHITECTURE.md](ARCHITECTURE.md), [TASKS.md](TASKS.md), [API.md](API.md), and [GIT_QUICKSTART.md](GIT_QUICKSTART.md).
