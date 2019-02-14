export type GoogleMapLibrary =
  | 'drawing'
  | 'geometry'
  | 'places'
  | 'visualization'

export type GoogleMapObject =
  | google.maps.Marker
  | google.maps.Polygon
  | google.maps.Polyline
  | google.maps.Circle
  | google.maps.Rectangle

type MapPanes =
  | 'floatPane'
  | 'mapPane'
  | 'markerLayer'
  | 'overlayLayer'
  | 'overlayMouseTarget'

export interface GoogleMapReducer {
  state: GoogleMapState
  dispatch: React.Dispatch<GoogleMapAction>
}

export interface GoogleMapState {
  map: google.maps.Map | undefined
  objects: Map<string, GoogleMapObject>
  service: google.maps.places.PlacesService | undefined
}

export interface GoogleMapAction {
  type: string
  map?: google.maps.Map
  object?: GoogleMapObject
  id?: string
  service?: google.maps.places.PlacesService
}

export interface MapBoxProps {
  apiKey?: string
  opts?: google.maps.MapOptions
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
  id: string
  opts?: google.maps.MarkerOptions
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
  opts?: google.maps.InfoWindowOptions
  visible?: boolean
  onCloseClick?: () => any
  onContentChanged?: () => any
  onDOMReady?: () => any
  onPositionChanged?: () => any
  onZIndexChanged?: () => any
}

export interface PolygonProps {
  id: string
  opts?: google.maps.PolygonOptions
  paths?: google.maps.LatLngLiteral[]
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

export interface WeightedLatLng extends google.maps.LatLngLiteral {
  weight?: number
}

export interface HeatMapProps
  extends google.maps.visualization.HeatmapLayerOptions {
  data: WeightedLatLng[]
}

export interface OverlayViewProps {
  pane?: MapPanes
  children?: JSX.Element
  position: google.maps.LatLngLiteral
  onClick?: (this: GlobalEventHandlers, ev: MouseEvent) => any
  onDoubleClick?: (this: GlobalEventHandlers, ev: MouseEvent) => any
  onMouseDown?: (this: GlobalEventHandlers, ev: MouseEvent) => any
  onMouseOver?: (this: GlobalEventHandlers, ev: MouseEvent) => any
  onMouseOut?: (this: GlobalEventHandlers, ev: MouseEvent) => any
  onMouseUp?: (this: GlobalEventHandlers, ev: MouseEvent) => any
  onTouchEnd?: (this: GlobalEventHandlers, ev: TouchEvent) => any
  onTouchStart?: (this: GlobalEventHandlers, ev: TouchEvent) => any
  disableMapHits?: boolean
  disableMapHitsAndGestures?: boolean
}

export interface StreetViewProps {
  separate?: boolean
}
