import { useState, useEffect } from 'react'
import { getGraph } from '../services/api.js'

/**
 * Indoor schematic map using the demo graph.
 */
export default function IndoorMap({ route }) {
  const [graph, setGraph] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getGraph()
      .then(setGraph)
      .catch((err) => {
        console.error(err)
        setError(err.message || 'Failed to load graph')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="status">Loading map…</p>
  if (error) return <p className="status error">{error}</p>
  if (!graph) return null

  const { nodes, edges } = graph
  // Hard‑coded positions for the demo – keeps layout simple.
  const pos = {
    'buildA-1': { x: 100, y: 200 },
    'corr1-1': { x: 300, y: 200 },
    'room101-1': { x: 500, y: 200 },
    'junction1-1': { x: 300, y: 400 },
    'buildB-1': { x: 600, y: 400 },
    'staircase1-1': { x: 300, y: 600 },
    'lift1-1': { x: 650, y: 200 }
  }

  const routeEdgesSet = new Set(route?.pathEdges || [])
  const startId = route?.pathNodes?.[0] ?? null
  const endId = route?.pathNodes?.slice(-1)[0] ?? null

  return (
    <section className="indoor-map">
      <h3>Demo schematic – not to scale; not a verified campus floor plan.</h3>
      <svg width="100%" height="700px" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid meet">
        {edges.map((e) => {
          const from = pos[e.from]
          const to = pos[e.to]
          const isRoute = routeEdgesSet.has(e.id)
          return (
            <line key={e.id} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={isRoute ? '#0066ff' : '#999'}
              strokeWidth={isRoute ? 4 : 2}
            />
          )
        })}
        {nodes.map((node) => {
          const p = pos[node.id]
          const isStart = node.id === startId
          const isEnd = node.id === endId
          return (
            <g key={node.id}>
              <circle cx={p.x} cy={p.y}
                r={isStart || isEnd ? 10 : 6}
                fill={isStart ? '#00aa00' : isEnd ? '#aa0000' : '#666'}
                stroke="#333"
                strokeWidth="1"/>
              <text x={p.x + 12} y={p.y + 4} fontSize="12">{node.name}</text>
            </g>
          )
        })}
      </svg>
    </section>
  )
}
