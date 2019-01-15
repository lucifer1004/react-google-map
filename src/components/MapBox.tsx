import React, {useEffect} from 'react'
import {useGoogleAPI} from '../hooks'
import {GMAP_LIB_NAMES} from '../common/constants'
import {MapBoxProps} from '../common/types'

const MapBox: React.FunctionComponent<MapBoxProps> = ({
  apiKey,
  centerLat = 39,
  centerLon = 116,
  zoomLevel = 10,
  style = {
    width: '100vw',
    height: '90vh',
  },
  useDrawing = false,
  useGeometry = false,
  usePlaces = false,
  useVisualization = false,
}) => {
  const mapItemId = `map-${Math.random()
    .toString(16)
    .substr(2, 8)}`
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
  useEffect(
    () => {
      if (!loaded) return
      const google = (window as any).google
      const map = new (google as any).maps.Map(
        document.getElementById(mapItemId),
        {
          center: {lat: centerLat, lng: centerLon},
          zoom: zoomLevel,
        },
      )
    },
    [loaded],
  )
  return (
    <div>
      {loaded ? <h1>This is a map</h1> : 'Loading...'}
      <div id={mapItemId} style={style} />
    </div>
  )
}

export default MapBox
