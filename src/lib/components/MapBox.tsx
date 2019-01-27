import React, {useEffect, useContext} from 'react'
import {useGoogleAPI, useGoogleListener} from '../hooks'
import {GMAP_LIB_NAMES} from '../common/constants'
import {MapBoxProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import RandomId from '../helpers/generateRandomId'

const MapBox: React.FunctionComponent<MapBoxProps> = ({
  apiKey,
  center = {lat: 39, lng: 116},
  mapClass,
  mapStyle = {
    width: '100vw',
    height: '100vh',
  },
  useDrawing = false,
  useGeometry = false,
  usePlaces = false,
  useVisualization = false,
  zoom = 10,
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
  const initMap = (map: google.maps.Map) =>
    dispatch({type: 'init_map', map: map})

  // Generate a random id for the DOM node where Google Map will be inserted
  const mapItemId = `map-${RandomId()}`

  // Construct the library param
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

  // Load Google Map
  useEffect(() => {
    if (!loaded) return
    initMap(
      new google.maps.Map(document.getElementById(mapItemId), {
        center: center,
        zoom: zoom,
      }),
    )
  }, [loaded])

  // Register google map event listeners
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

  // Modify the google.maps.Map object when <MapBox> props change
  useEffect(() => {
    if (state.map === undefined) return
    state.map.setCenter(center)
    state.map.setZoom(zoom)
  }, [center, zoom])

  // Render <MapBox>
  return (
    <>
      {loaded ? <LoadedComponent /> : <LoadingComponent />}
      <div id={mapItemId} style={mapStyle} className={mapClass} />
    </>
  )
}

export default MapBox
