import { useState } from 'react'

/**
 * Panel for selecting start/destination and initiating a route request.
 */
export default function NavigationPanel({ locations, onFindRoute, stepFree, setStepFree }) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  return (
    <section className="navigation-panel">
      <h2>Welcome to AccessPath</h2>
      <div className="selectors">
        <label>
          Starting location:
          <select value={start} onChange={(e) => setStart(e.target.value)}>
            <option value="">-- select --</option>
            {locations.map((node) => (
              <option key={node.id} value={node.id}>
                {node.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Destination:
          <select value={end} onChange={(e) => setEnd(e.target.value)}>
            <option value="">-- select --</option>
            {locations.map((node) => (
              <option key={node.id} value={node.id}>
                {node.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="route-options">
        <label>
          <input type="checkbox" checked={stepFree} onChange={(e) => setStepFree(e.target.checked)} />
          Step‑free only
        </label>
      </div>
      <button type="button" onClick={() => onFindRoute(start, end)} disabled={!start || !end}>
        Find Route
      </button>
    </section>
  )
}
