import { useMemo } from 'react'

export default function RouteSummaryCard({ route, locations }) {
  if (!route || !route.pathNodes) return null

  const start = locations.find(l=>l.id===route.pathNodes[0])
  const end   = locations.find(l=>l.id===route.pathNodes.slice(-1)[0])

  const steps = useMemo(()=> {
    return route.pathNodes.map(id => {
      const node = locations.find(n=>n.id===id)
      return node?.name ?? id
    })
  }, [route, locations])

  return (
    <section className="route-summary-card">
      <h3>Route Summary</h3>
      <p><strong>Start:</strong> {start?.name ?? 'Unknown'}</p>
      <p><strong>Destination:</strong> {end?.name ?? 'Unknown'}</p>
      <p><strong>Steps:</strong></p>
      <ol>{steps.map((s, i)=> <li key={i}>{s}</li>)}</ol>
      <p><strong>Total distance:</strong> {route.totalDistance} m</p>
      {route.estimatedTimeMinutes && (
        <p><strong>Estimated time:</strong> {route.estimatedTimeMinutes} min</p>
      )}
    </section>
  )
}
