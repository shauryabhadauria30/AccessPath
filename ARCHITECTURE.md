# Architecture (proposed)

## Shape

```text
Web UI (map/list, destination, start, notices)
        | proposed JSON API
API service (route search, reports, gate notices)
        |                         |
Campus graph + status data     Dijkstra route calculation
```

The graph is the source of navigable connectivity. A node represents a decision point, QR checkpoint, entrance, room, or destination; an edge represents a walkable connection. Include floor/block and human-readable instructions. A QR code encodes a stable node ID only; it establishes a user-selected known starting point, not ongoing location tracking.

## Suggested records

- **Node:** `id`, `label`, `block`, `floor`, `kind`, optional coordinates/map reference, `verifiedAt`.
- **Edge:** `id`, `from`, `to`, `distance`, `stairs`, `ramp`, `lift`, `stepFreeVerified`, `accessibleNotes`, `verifiedAt`, `status`.
- **Report:** `id`, `edgeId`, `kind` (obstruction/closure/condition), `note`, `createdAt`, `expiresAt`, `state`.
- **Gate notice:** `id`, `gateLabel`, `studentAccess` (open/closed/unknown), `deliveryAccess` (open/closed/unknown), `note`, `validUntil`, `updatedAt`, `source`.

Use `unknown` when facts are not confirmed. A ramp or lift attribute alone does not prove an edge is step-free; require explicit verification. Keep user reports separate from verified map facts and expire temporary reports.

## Route calculation

Run Dijkstra over active edges with non-negative distance weights. For an access-focused request, exclude edges not explicitly verified as step-free; do not infer accessibility from missing data. Exclude blocked edges, then return ordered nodes/edges and a clear no-route response when disconnected. MVP can use distance as the weight; later versions may support user preferences. A report should trigger recalculation after the edge is marked unavailable, with its temporary status visible.

## Overnight implementation boundary

Use a manually surveyed sample, one or two floors, a few room/lab destinations, QR/manual start, route result, one path report/block and reroute, and a gate notice. No continuous positioning, campus-wide map, user accounts, moderation console, or claim of live official gate data is needed for the demo. Mark sample and unverified data in the interface.

## Proposed stack choices

React/Vite, Express, SQLite and a small graph module are practical defaults, not commitments. A static JSON graph and in-memory reports may be faster for the first demo. Keep data structures and API contracts simple enough to swap storage later.
