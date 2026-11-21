import { LucideMapPin, LucideCompass, LucideAlertTriangle, LucideFlag, LucideList } from 'lucide-react'

/**
 * Sidebar component for navigation.
 * @param {Object} props
 * @param {string} props.currentSection - Current selected section key.
 * @param {function(string):void} props.onSelect - Callback when a menu item is clicked.
 */
export default function Sidebar({ currentSection, onSelect }) {
  const items = [
    { id: 'navigate', label: 'Navigate', icon: LucideMapPin },
    { id: 'explore', label: 'Explore Campus', icon: LucideCompass },
    { id: 'accessibility', label: 'Accessibility', icon: LucideAlertTriangle },
    { id: 'report', label: 'Report an Issue', icon: LucideFlag },
    { id: 'updates', label: 'Campus Updates', icon: LucideList },
  ]

  return (
    <nav className="sidebar">
      <div className="logo">AccessPath</div>
      <ul>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.id} className={currentSection === item.id ? 'active' : ''}>
              <button type="button" onClick={() => onSelect(item.id)}>
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
