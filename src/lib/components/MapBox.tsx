import React, {useEffect, useState} from 'react'
import {useGoogleAPI, useGoogleListener} from '../hooks'
import {GMAP_LIB_NAMES} from '../common/constants'
import {MapBoxProps} from '../common/types'
import {MapContext} from '../contexts'

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
  children,
}) => {
  // Generate a random id for the DOM node where Google Map will be inserted
  const mapItemId = `map-${Math.random()
    .toString(16)
    .substr(2, 8)}`

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

  // context variable to store the google map object
  const [map, setMap] = useState((undefined as unknown) as google.maps.Map)

  // Load Google Map
  useEffect(() => {
    if (!loaded) return
    setMap(
      new google.maps.Map(document.getElementById(mapItemId), {
        center: center,
        zoom: zoom,
      }),
    )
  }, [loaded])

  // Register google map event listeners
  useGoogleListener(map, 'bounds_changed', onBoundsChanged)
  useGoogleListener(map, 'center_changed', onCenterChanged)
  useGoogleListener(map, 'click', onClick)
  useGoogleListener(map, 'dblclick', onDoubleClick)
  useGoogleListener(map, 'drag', onDrag)
  useGoogleListener(map, 'dragend', onDragEnd)
  useGoogleListener(map, 'dragstart', onDragStart)
  useGoogleListener(map, 'heading_changed', onHeadingChanged)
  useGoogleListener(map, 'idle', onIdle)
  useGoogleListener(map, 'maptypeid_changed', onMapTypeIdChanged)
  useGoogleListener(map, 'mousemove', onMouseMove)
  useGoogleListener(map, 'mouseout', onMouseOut)
  useGoogleListener(map, 'mouseover', onMouseOver)
  useGoogleListener(map, 'projection_changed', onProjectionChanged)
  useGoogleListener(map, 'rightclick', onRightClick)
  useGoogleListener(map, 'tilesloaded', onTilesLoaded)
  useGoogleListener(map, 'tilt_changed', onTiltChanged)
  useGoogleListener(map, 'zoom_changed', onZoomChanged)

  // Modify the google.maps.Map object when <MapBox> props change
  useEffect(() => {
    if (map === undefined) return
    map.setCenter(center)
    map.setZoom(zoom)
  }, [center, zoom])

  // Render <MapBox>
  return (
    <MapContext.Provider value={{map: map, loaded: loaded, markers: []}}>
      <div>
        {loaded ? <LoadedComponent /> : <LoadingComponent />}
        <div id={mapItemId} style={mapStyle} className={mapClass} />
        {children}
      </div>
    </MapContext.Provider>
  )
}

export default MapBox
