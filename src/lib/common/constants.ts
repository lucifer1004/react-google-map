import {
  GoogleMapLibrary,
  GroundOverlayOptions,
  HeatmapLayerOptions,
} from './types'

export const NYC_LATLNG: google.maps.LatLngLiteral = {
  lat: 40.7128,
  lng: -74.006,
}
const NYC_POLYGON: google.maps.LatLngLiteral[] = [
  {lat: 40.718, lng: -74.006},
  {lat: 40.718, lng: -74.01},
  {lat: 40.7138, lng: -74.001},
  {lat: 40.7128, lng: -74.005},
]
const NYC_RECTANGLE: google.maps.LatLngBoundsLiteral = {
  east: -73.98,
  west: -73.985,
  north: 40.706,
  south: 40.702,
}

const DEFAULT_MAP_ZOOM = 14

export const DEFAULT_CIRCLE_OPTIONS: google.maps.CircleOptions = {
  center: {lat: NYC_LATLNG.lat - 0.01, lng: NYC_LATLNG.lng - 0.01},
  radius: 200,
}

export const DEFAULT_GROUND_OVERLAY_OPTIONS: GroundOverlayOptions = {
  url: 'https://placehold.it/256x256',
  bounds: NYC_RECTANGLE,
}

export const DEFAULT_HEAT_MAP_OPTIONS: HeatmapLayerOptions = {
  data: [{lat: 40.718, lng: -74.006}, {lat: 40.712, lng: -74.01}],
  radius: 100,
}

export const DEFAULT_INFO_WINDOW_OPTIONS: google.maps.InfoWindowOptions = {
  content: 'Hello',
  position: NYC_LATLNG,
}

export const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  center: NYC_LATLNG,
  zoom: DEFAULT_MAP_ZOOM,
}

export const DEFAULT_MAP_STYLE = {
  height: '100%',
  width: '100%',
}

export const DEFAULT_MARKER_OPTIONS: google.maps.MarkerOptions = {
  position: NYC_LATLNG,
}

export const DEFAULT_POLYGON_OPTIONS: google.maps.PolygonOptions = {
  paths: NYC_POLYGON,
}

export const DEFAULT_POLYLINE_OPTIONS: google.maps.PolylineOptions = {
  path: NYC_POLYGON.map(latLng => ({
    lat: latLng.lat + 0.01,
    lng: latLng.lng + 0.01,
  })),
}

export const DEFAULT_RECTANGLE_OPTIONS: google.maps.RectangleOptions = {
  bounds: NYC_RECTANGLE,
}

export const DEFAULT_STREET_VIEW_OPTIONS: google.maps.StreetViewPanoramaOptions = {
  position: NYC_LATLNG,
}

export const GOOGLE_MAP_BASE_URI = 'https://maps.googleapis.com/maps/api/js'

export const GOOGLE_MAP_LIBRARY_NAMES: GoogleMapLibrary[] = [
  'drawing',
  'geometry',
  'places',
  'visualization',
]
