import React, {useEffect, useRef, useState} from 'react'
import {useGoogleAPI} from '../hooks'
import {GMAP_LIB_NAMES} from '../common/constants'
import {MapBoxProps} from '../common/types'
import {MapContext} from '../contexts'

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
  LoadingComponent = () => <p>Loading...</p>,
  children,
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

  const [map, setMap] = useState((undefined as unknown) as google.maps.Map)

  // Create a useRef hook to store the Google Map object
  const mapRef = useRef<google.maps.Map | undefined>(undefined)

  // Load Google Map
  useEffect(
    () => {
      if (!loaded) return
      setMap(
        new google.maps.Map(document.getElementById(mapItemId), {
          center: center,
          zoom: zoom,
        }),
      )
    },
    [loaded],
  )

  // Modify the Google Map object when <MapBox> props change
  useEffect(
    () => {
      if (map === undefined) return
      map.setCenter(center)
      map.setZoom(zoom)
    },
    [center, zoom],
  )

  // Render <MapBox>
  return (
    <MapContext.Provider value={{map: map, loaded: loaded}}>
      <div>
        {loaded ? <LoadedComponent /> : <LoadingComponent />}
        <div id={mapItemId} style={style} />
        {children}
      </div>
    </MapContext.Provider>
  )
}

export default MapBox
