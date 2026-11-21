import { useState } from 'react'

/**
 * Demo list of recent reports and gate notices.
 */
export default function CampusUpdates() {
  const [reports] = useState([
    { id: 1, title: 'Obstacle reported on Corridor 1', status: 'pending' },
    { id: 2, title: 'Gate B closed for maintenance', status: 'notice' },
    { id: 3, title: 'Ramp malfunction in Building A', status: 'pending' },
  ])

  return (
    <section className="campus-updates">
      <h2>Campus Updates</h2>
      <ul>
        {reports.map((r) => (
          <li key={r.id} className={r.status === 'pending' ? 'pending' : ''}>
            {r.title}
          </li>
        ))}
      </ul>
    </section>
  )
}
