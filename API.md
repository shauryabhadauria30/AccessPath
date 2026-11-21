# API contracts (proposed)

Nothing in this document implies that endpoints already exist. These example contracts can be implemented as HTTP/JSON or called as local functions for the MVP. Choose the transport after agreeing on the smallest working demo.

## Proposed operations

### `GET /api/places`

Returns destinations and selectable starting checkpoints in the surveyed sample.

```json
{"places":[{"id":"c-ground-junction-1","label":"C Block junction","kind":"checkpoint","block":"C","floor":"ground"}]}
```

### `POST /api/routes`

Request:

```json
{"startId":"c-ground-junction-1","destinationId":"f-lab-1","stepFreeOnly":true}
```

Response:

```json
{"routeId":"demo-route-1","accessibleStatus":"verified-edges-only","distance":42,"steps":[{"edgeId":"edge-1","instruction":"Continue to the next junction","from":"c-ground-junction-1","to":"e-link-1"}],"notices":[]}
```

Return a clear error such as `NO_ROUTE` when no qualifying path exists. Never silently include an unverified edge in a step-free route.

### `POST /api/reports`

Request:

```json
{"edgeId":"edge-1","kind":"obstruction","note":"Temporary stall blocks this path","expiresAt":"2026-11-22T06:00:00Z"}
```

Response: `{"reportId":"report-1","state":"active","blockedEdgeId":"edge-1"}`. A demo may accept reports without accounts; label them unverified and provide an expiry.

### `GET /api/notices/gates`

Response:

```json
{"notices":[{"gateLabel":"Sample gate","studentAccess":"unknown","deliveryAccess":"unknown","note":"Demo data; confirm locally","updatedAt":"2026-11-21T00:00:00Z","source":"demo"}]}
```

Use `open`, `closed`, or `unknown`; include source and update time. Do not present a user-reported or demo notice as an official live feed.

## Shared conventions

IDs are stable strings; floors are labels agreed by the team. Use ISO 8601 timestamps with timezone. Missing or uncertain facts remain `unknown`. Responses should be small and understandable enough to inspect during the hackathon demo.
