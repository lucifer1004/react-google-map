import React, {useEffect, useContext, useState} from 'react'
import {useGoogleAPI, useGoogleListener} from '../hooks'
import {GOOGLE_MAP_LIBRARY_NAMES} from '../common/constants'
import {MapBoxProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import RandomId from '../helpers/generateRandomId'

const MapBox: React.FunctionComponent<MapBoxProps> = ({
  apiKey = '',
  mapClass,
  mapStyle = {
    height: '100vh',
    width: '100vw',
  },
  opts = {
    center: {lat: 40.7128, lng: -74.006},
    zoom: 10,
  },
  useDrawing = false,
  useGeometry = false,
  usePlaces = false,
  useVisualization = false,
  LoadedComponent = () => <h1>This is a map</h1>,
  LoadingComponent = () => <p>Loading...</p>,
  onBoundsChanged,
  onCenterChanged,
  onClick,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onHeadingChanged,
  onIdle,
  onMapTypeIdChanged,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onProjectionChanged,
  onRightClick,
  onTilesLoaded,
  onTiltChanged,
  onZoomChanged,
}) => {
  // Get access to the Google Map context
  const {state, dispatch} = useContext(GoogleMapContext)

  // Generate a random id for the DOM node where Google Map will be inserted
  const [mapItemId] = useState(`map-${RandomId()}`)

  // Define action dispatchers
  const initMap = (
    map: google.maps.Map,
    service?: google.maps.places.PlacesService,
  ) => dispatch({type: 'init_map', map: map, service: service})
  const reset = () => dispatch({type: 'reset'})

  // Construct the library param
  const libraries = {
    drawing: useDrawing,
    geometry: useGeometry,
    places: usePlaces,
    visualization: useVisualization,
  }
  const libraryParam = GOOGLE_MAP_LIBRARY_NAMES.filter(
    library => libraries[library],
  ).join(',')
  const loaded = useGoogleAPI(
    apiKey,
    libraryParam === '' ? '' : `&libraries=${libraryParam}`,
  )

  // Load Google Map
  useEffect(() => {
    if (!loaded) return
    const map = new google.maps.Map(document.getElementById(mapItemId), opts)
    if (usePlaces) {
      const service = new google.maps.places.PlacesService(map)
      initMap(map, service)
    } else initMap(map)
    return () => reset()
  }, [loaded])

  // Register event listeners
  useGoogleListener(state.map, [
    {name: 'bounds_changed', handler: onBoundsChanged},
    {name: 'center_changed', handler: onCenterChanged},
    {name: 'click', handler: onClick},
    {name: 'dblclick', handler: onDoubleClick},
    {name: 'drag', handler: onDrag},
    {name: 'dragend', handler: onDragEnd},
    {name: 'dragstart', handler: onDragStart},
    {name: 'heading_changed', handler: onHeadingChanged},
    {name: 'idle', handler: onIdle},
    {name: 'maptypeid_changed', handler: onMapTypeIdChanged},
    {name: 'mousemove', handler: onMouseMove},
    {name: 'mouseout', handler: onMouseOut},
    {name: 'mouseover', handler: onMouseOver},
    {name: 'projection_changed', handler: onProjectionChanged},
    {name: 'rightclick', handler: onRightClick},
    {name: 'tilesloaded', handler: onTilesLoaded},
    {name: 'tilt_changed', handler: onTiltChanged},
    {name: 'zoom_changed', handler: onZoomChanged},
  ])

  // Modify the google.maps.Map object when component props change
  useEffect(() => {
    if (state.map === undefined) return
    state.map.setOptions(opts)
  }, [opts])

  // Render <MapBox>
  return (
    <>
      {loaded ? <LoadedComponent /> : <LoadingComponent />}
      <div id={mapItemId} style={mapStyle} className={mapClass} />
    </>
  )
}

export default MapBox
