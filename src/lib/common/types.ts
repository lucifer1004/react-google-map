export interface MapBoxProps {
  apiKey: string
  center?: google.maps.LatLngLiteral
  zoom?: number
  style?: object
  LoadingComponent?: React.FunctionComponent
  LoadedComponent?: React.FunctionComponent
  useDrawing?: boolean
  useGeometry?: boolean
  usePlaces?: boolean
  useVisualization?: boolean
  onBoundsChanged?: Function | undefined
  onCenterChanged?: Function | undefined
  onClick?: Function | undefined
  onDoubleClick?: Function | undefined
  onDrag?: Function | undefined
  onDragEnd?: Function | undefined
  onDragStart?: Function | undefined
  onHeadingChanged?: Function | undefined
  onIdle?: Function | undefined
  onMapTypeIdChanged?: Function | undefined
  onMouseMove?: Function | undefined
  onMouseOut?: Function | undefined
  onMouseOver?: Function | undefined
  onProjectionChanged?: Function | undefined
  onRightClick?: Function | undefined
  onTilesLoaded?: Function | undefined
  onTiltChanged?: Function | undefined
  onZoomChanged?: Function | undefined
}

export interface MapContextProps {
  map: google.maps.Map | undefined
  loaded: boolean
}

export interface InfoWindowProps extends google.maps.InfoWindowOptions {
  anchor?: google.maps.Marker
  map?: google.maps.Map
}

export type GMapLibrary = 'drawing' | 'geometry' | 'places' | 'visualization'
