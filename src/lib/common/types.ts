export declare type GoogleMapLibrary =
  | 'drawing'
  | 'geometry'
  | 'places'
  | 'visualization'

export declare type GoogleMapObject =
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

export interface GoogleMapProviderProps {
  children: React.ReactNode
  useDrawing?: boolean
  useGeometry?: boolean
  usePlaces?: boolean
  useVisualization?: boolean
}

export interface MapBoxProps {
  apiKey?: string
  language?: string
  mapClass?: string
  mapStyle?: object
  useDrawing?: boolean
  useGeometry?: boolean
  usePlaces?: boolean
  useVisualization?: boolean
  LoadingComponent?: React.ReactNode
  LoadedComponent?: React.ReactNode
  opts?: google.maps.MapOptions
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
  anchor?: GoogleMapObject
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

export interface HeatmapLayerOptions
  extends google.maps.visualization.HeatmapLayerOptions {
  data: WeightedLatLng[]
}

export interface HeatMapProps {
  opts: HeatmapLayerOptions
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
  mapClass?: string
  mapStyle?: object
  opts?: google.maps.StreetViewPanoramaOptions
  bindToMap?: boolean
  onCloseClick?: (event: google.maps.MouseEvent) => any
  onPanoChanged?: () => any
  onPositionChanged?: () => any
  onPovChanged?: () => any
  onResize?: () => any
  onStatusChanged?: () => any
  onVisibleChanged?: () => any
  onZoomChanged?: () => any
}
