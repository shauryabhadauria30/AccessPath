import { useState } from 'react'

/**
 * Toggle for selecting normal or step‑free routing.
 */
export default function RouteOptions({ onToggle, initialStepFree }) {
  const [stepFree, setStepFree] = useState(initialStepFree)

  const handleChange = () => {
    const newValue = !stepFree
    setStepFree(newValue)
    onToggle(newValue)
  }

  return (
    <div className="route-options">
      <label>
        <input type="checkbox" checked={stepFree} onChange={handleChange} />
        Step‑free only
      </label>
    </div>
  )
}
