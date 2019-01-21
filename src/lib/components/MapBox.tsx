import React, {useEffect, useRef} from 'react'
import {useGoogleAPI} from '../hooks'
import {GMAP_LIB_NAMES} from '../common/constants'
import {MapBoxProps} from '../common/types'

const MapBox: React.FunctionComponent<MapBoxProps> = ({
  apiKey,
  center = {lat: 39, lng: 116},
  zoom = 10,
  style = {
    width: '100vw',
    height: '90vh',
  },
  useDrawing = false,
  useGeometry = false,
  usePlaces = false,
  useVisualization = false,
  LoadedComponent = () => <h1>This is a map</h1>,
  LoadingComponent = () => <p>Loading...'</p>,
}) => {
  // Generate a random id for the DOM node where Google Map will be inserted
  const mapItemId = `map-${Math.random()
    .toString(16)
    .substr(2, 8)}`

  // Build the library param
  const libraries = {
    drawing: useDrawing,
    geometry: useGeometry,
    places: usePlaces,
    visualization: useVisualization,
  }
  const libraryParam = GMAP_LIB_NAMES.filter(
    library => libraries[library],
  ).join(',')
  const loaded = useGoogleAPI(
    apiKey,
    libraryParam === '' ? libraryParam : `&libraries=${libraryParam}`,
  )

  // Create a useRef hook to store the Google Map object
  const mapRef = useRef<google.maps.Map | null>(null)

  // Load Google Map
  useEffect(
    () => {
      if (!loaded) return
      const map = new google.maps.Map(document.getElementById(mapItemId), {
        center: center,
        zoom: zoom,
      })
      mapRef.current = map
    },
    [loaded],
  )

  // Modify the Google Map object when <MapBox> props change
  useEffect(
    () => {
      if (mapRef.current === null) return
      mapRef.current.setCenter(center)
      mapRef.current.setZoom(zoom)
    },
    [center, zoom],
  )

  // Render <MapBox>
  return (
    <div>
      {loaded ? <LoadedComponent /> : <LoadingComponent />}
      <div id={mapItemId} style={style} />
    </div>
  )
}

export default MapBox
