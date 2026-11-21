import { useState } from 'react'
import './App.css'
import './layout.css'
import Sidebar from './components/Sidebar'
import NavigationPanel from './components/NavigationPanel'
import MapView from './components/MapView'
import RouteSummaryCard from './components/RouteSummaryCard'
import CampusUpdates from './components/CampusUpdates'
import { findRoute, getLocations } from './services/api.js'
import { useEffect } from 'react'

function App() {
  const [section, setSection] = useState('navigation')
  const [mapMode, setMapMode] = useState('indoor')
  const [locations, setLocations] = useState([])
  const [route, setRoute] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stepFree, setStepFree] = useState(false)

  // Load locations on mount
  useEffect(() => {
    getLocations()
      .then(setLocations)
      .catch((err) => {
        console.error('Failed to load locations', err);
        setLocations([]);
      });
  }, []);

  const handleFindRoute = (start, end) => {
    setLoading(true);
    findRoute(start, end, stepFree)
      .then((data) => {
        setRoute(data);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || err.toString());
        setRoute(null);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="app-container">
      <Sidebar currentSection={section} onSelect={setSection} />
      <main className="main-content">
        {section === 'navigation' && (
          <> 
            <h2>Navigate</h2>
            <section className="card">
              <NavigationPanel locations={locations} onFindRoute={handleFindRoute} stepFree={stepFree} setStepFree={setStepFree} />
            </section>
            <div className="map-controls">
              <label>
                Map view: 
                <button onClick={() => setMapMode(mapMode==='indoor' ? 'outdoor' : 'indoor')}>{mapMode==='indoor' ? 'Indoor Demo Map' : 'Outdoor Campus Map'}</button>
            </label>
            </div>
            <section className="card"><MapView mapMode={mapMode} route={route} /></section>
            <section className="card"><RouteSummaryCard route={route} locations={locations} /></section>
          </>
        )}
        {section === 'updates' && <CampusUpdates />}
      </main>
    </div>
  );
}

export default App
