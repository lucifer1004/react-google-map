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

export type GMapLibrary = 'drawing' | 'geometry' | 'places' | 'visualization'
