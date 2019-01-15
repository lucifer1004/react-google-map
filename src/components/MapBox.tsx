import React, {useEffect} from 'react'
import useGoogleAPI from '../hooks/useGoogleAPI'

interface MapBoxProps {
  apiKey: string
  centerLat?: number
  centerLon?: number
  zoomLevel?: number
}

const MapBox: React.FunctionComponent<MapBoxProps> = ({
  apiKey,
  centerLat = 39,
  centerLon = 116,
  zoomLevel = 10,
}) => {
  const mapItemId = `map-${Math.random()
    .toString(16)
    .substr(2, 8)}`
  const cb = () => {
    const google = (window as any).google
    const map = new (google as any).maps.Map(
      document.getElementById(mapItemId),
      {
        center: {lat: centerLat, lng: centerLon},
        zoom: zoomLevel,
      },
    )
  }
  ;(window as any).mapBoxCreatedCallback = cb
  const loaded = useGoogleAPI(apiKey, 'mapBoxCreatedCallback')
  return (
    <div>
      {loaded ? <h1>This is a map</h1> : 'Loading...'}
      <div
        id={mapItemId}
        style={{
          width: '100vw',
          height: '90vh',
        }}
      />
    </div>
  )
}

export default MapBox
