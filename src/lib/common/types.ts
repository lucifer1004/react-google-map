export type GMapLibrary = 'drawing' | 'geometry' | 'places' | 'visualization'

export interface GoogleMapReducer {
  state: GoogleMapState
  dispatch: React.Dispatch<GoogleMapAction>
}

export interface GoogleMapState {
  map: google.maps.Map | undefined
  markers: google.maps.Marker[]
  polygons: google.maps.Polygon[]
}

export interface GoogleMapAction {
  type: string
  map?: google.maps.Map
  marker?: google.maps.Marker
  polygon?: google.maps.Polygon
}

export interface MapBoxProps {
  apiKey: string
  opts: google.maps.MapOptions
  mapClass?: string
  mapStyle?: object
  useDrawing?: boolean
  useGeometry?: boolean
  usePlaces?: boolean
  useVisualization?: boolean
  LoadingComponent?: React.FunctionComponent
  LoadedComponent?: React.FunctionComponent
  onBoundsChanged?: () => any
  onCenterChanged?: () => any
  onClick?: (event: google.maps.MouseEvent) => any
  onDoubleClick?: (event: google.maps.MouseEvent) => any
  onDrag?: () => any
  onDragEnd?: () => any
  onDragStart?: () => any
  onHeadingChanged?: () => any
  onIdle?: () => any
  onMapTypeIdChanged?: () => any
  onMouseMove?: (event: google.maps.MouseEvent) => any
  onMouseOut?: (event: google.maps.MouseEvent) => any
  onMouseOver?: (event: google.maps.MouseEvent) => any
  onProjectionChanged?: () => any
  onRightClick?: (event: google.maps.MouseEvent) => any
  onTilesLoaded?: () => any
  onTiltChanged?: () => any
  onZoomChanged?: () => any
}

export interface MarkerProps {
  opts: google.maps.MarkerOptions
  onAnimationChanged?: () => any
  onClick?: (event: google.maps.MouseEvent) => any
  onClickableChanged?: () => any
  onCursorChanged?: () => any
  onDoubleClick?: (event: google.maps.MouseEvent) => any
  onDrag?: (event: google.maps.MouseEvent) => any
  onDragEnd?: (event: google.maps.MouseEvent) => any
  onDraggableChanged?: () => any
  onDragStart?: (event: google.maps.MouseEvent) => any
  onFlatChanged?: () => any
  onIconChanged?: () => any
  onMouseDown?: (event: google.maps.MouseEvent) => any
  onMouseOut?: (event: google.maps.MouseEvent) => any
  onMouseOver?: (event: google.maps.MouseEvent) => any
  onMouseUp?: (event: google.maps.MouseEvent) => any
  onPositionChanged?: () => any
  onRightClick?: (event: google.maps.MouseEvent) => any
  onShapeChanged?: () => any
  onTitleChanged?: () => any
  onVisibleChanged?: () => any
  onZIndexChanged?: () => any
}

export interface InfoWindowProps {
  anchor?: google.maps.Marker
  opts: google.maps.InfoWindowOptions
  visible?: boolean
  onCloseClick?: () => any
  onContentChanged?: () => any
  onDOMReady?: () => any
  onPositionChanged?: () => any
  onZIndexChanged?: () => any
}

export interface PolygonProps {
  opts?: google.maps.PolygonOptions
  paths: google.maps.LatLngLiteral[]
  visible?: boolean
  onClick?: (event: google.maps.MouseEvent) => any
  onDoubleClick?: (event: google.maps.MouseEvent) => any
  onDrag?: (event: google.maps.MouseEvent) => any
  onDragEnd?: (event: google.maps.MouseEvent) => any
  onDragStart?: (event: google.maps.MouseEvent) => any
  onMouseDown?: (event: google.maps.MouseEvent) => any
  onMouseOut?: (event: google.maps.MouseEvent) => any
  onMouseOver?: (event: google.maps.MouseEvent) => any
  onMouseUp?: (event: google.maps.MouseEvent) => any
  onRightClick?: (event: google.maps.MouseEvent) => any
}
