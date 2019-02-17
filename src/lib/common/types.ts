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
  | google.maps.BicyclingLayer
  | google.maps.TrafficLayer
  | google.maps.TransitLayer

export declare type GoogleMapLayer =
  | google.maps.BicyclingLayer
  | google.maps.TrafficLayer
  | google.maps.TransitLayer

declare type MapPanes =
  | 'floatPane'
  | 'mapPane'
  | 'markerLayer'
  | 'overlayLayer'
  | 'overlayMouseTarget'

export declare type Layers = 'bicycling' | 'traffic' | 'transit'

// Google Map context

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

// Map

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

// Marker

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

// InfoWindow
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

// Shapes

interface ShapeProps {
  id: string
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

export interface PolylineProps extends ShapeProps {
  opts?: google.maps.PolylineOptions
}

export interface PolygonProps extends ShapeProps {
  opts?: google.maps.PolygonOptions
}

export interface CircleProps extends ShapeProps {
  opts?: google.maps.CircleOptions
  onCenterChanged?: () => any
  onRadiusChanged?: (event: google.maps.MouseEvent) => any
}

export interface RectangleProps extends ShapeProps {
  opts?: google.maps.RectangleOptions
  onBoundsChanged?: () => any
}

// Heat Map

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

// Overlay View

export interface OverlayViewProps {
  pane?: MapPanes
  children: React.ReactNode
  position?: google.maps.LatLngLiteral
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

// StreetView
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

// BicyclingLayer | TransitLayer | TrafficLayer

export interface LayerProps {
  type: Layers
}

export interface TrafficLayerProps {
  opts?: google.maps.TrafficLayerOptions
}
