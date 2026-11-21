# Hackathon tasks

## MVP checklist

- [ ] Agree on the surveyed zone, floors, a handful of destinations, and a demo owner for each area.
- [ ] Walk the zone and record junctions, entrances, rooms/labs, and connections; note floor changes.
- [ ] Verify accessibility edge by edge. Record ramps/lifts and evidence; mark uncertain edges `unknown`.
- [ ] Create stable node IDs and print or display QR codes for a few known starting points.
- [ ] Implement destination selection and QR/manual start selection.
- [ ] Implement Dijkstra over active graph edges; support a step-free-only filter using verified attributes.
- [ ] Display route steps and distinguish verified, unknown, and sample information.
- [ ] Add a temporary obstruction/closure report for one path, block that edge, and reroute.
- [ ] Show one gate status notice with student/delivery distinction and a visible source/time.
- [ ] Walk through the demo on the actual sample data; prepare a fallback manual start if QR scanning fails.

## Suggested three-person split

- **Mapping/data:** survey sample area, build graph data, check QR node IDs and accessibility evidence.
- **Interface:** start/destination selection, route display, gate notice and report interaction.
- **Routing/integration:** Dijkstra, status/report handling, API or shared data format, connect the demo.

Pair briefly on the data format before parallel work. Keep integration working early; reduce scope before adding unverified map coverage.

## Explicitly out of scope for overnight MVP

Continuous indoor positioning, complete campus coverage, automatic official gate feeds, authentication, analytics, crowdsourced moderation workflows, and production accessibility certification.
