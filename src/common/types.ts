export interface MapBoxProps {
  apiKey: string
  centerLat?: number
  centerLon?: number
  zoomLevel?: number
  style?: object
  useDrawing?: boolean
  useGeometry?: boolean
  usePlaces?: boolean
  useVisualization?: boolean
}

export type GMapLibrary = 'drawing' | 'geometry' | 'places' | 'visualization'
