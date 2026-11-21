import { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'

const campusCoords = [30.356883, 76.358625]

export default function OutdoorMap() {
  const mapRef = useRef(null)

  // Configure default icon URLs for Leaflet when using Vite
  L.Icon.Default.mergeOptions({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
  })

  const recenter = () => {
    if (mapRef.current) {
      mapRef.current.setView(campusCoords, 17)
    }
  }

  return (
    <section className="outdoor-map">
      <button onClick={recenter} className="recenter-btn">Center Map</button>
      <MapContainer center={campusCoords} zoom={17} style={{ height: '500px', width: '100%' }} whenCreated={(m)=>{mapRef.current=m}}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={campusCoords}>
          <Popup>Thapar Institute Campus</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
