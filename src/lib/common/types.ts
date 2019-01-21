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
