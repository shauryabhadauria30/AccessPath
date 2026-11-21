import Map from './IndoorMap'
import OutdoorMap from './OutdoorMap'

export default function MapView({ mapMode, route }) {
  return (
    <div className="map-view">
      {mapMode === 'outdoor' ? <OutdoorMap /> : <Map route={route} />}
    </div>
  )
}
