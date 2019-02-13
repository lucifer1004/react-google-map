class InfoWindow {
  close = () => {}
  open = (map?: google.maps.Map, anchor?: google.maps.Marker) => {}
  opts: google.maps.InfoWindowOptions
  setOptions = (opts: google.maps.InfoWindowOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.InfoWindowOptions) {
    this.opts = opts
  }
}

class LatLng {
  constructor(lat: number, lng: number) {}
}

class Marker {
  map?: google.maps.Map
  opts: google.maps.MarkerOptions
  setMap = (map: google.maps.Map) => (this.map = map)
  setOptions = (opts: google.maps.MarkerOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.MarkerOptions) {
    this.opts = opts
    this.map = opts.map as google.maps.Map | undefined
  }
}

class Map {
  opts: google.maps.MapOptions
  setOptions = (opts: google.maps.MapOptions) => (this.opts = opts)
  constructor(mapDiv: HTMLElement, opts: google.maps.MapOptions) {
    this.opts = opts
  }
}

class Polygon {
  map?: google.maps.Map
  opts: google.maps.PolygonOptions
  setMap = (map: google.maps.Map) => (this.map = map)
  setOptions = (opts: google.maps.PolygonOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.PolygonOptions) {
    this.opts = opts
    this.map = opts.map as google.maps.Map | undefined
  }
}

class PlacesService {
  map: google.maps.Map
  constructor(map: google.maps.Map) {
    this.map = map
  }
}

export class HeatmapLayer {
  data: any
  map: null | google.maps.Map
  opts: google.maps.visualization.HeatmapLayerOptions
  setData = (data: any) => {
    this.data = data
  }
  setMap = (map: google.maps.Map) => {
    this.map = map
  }
  constructor(opts: google.maps.visualization.HeatmapLayerOptions) {
    this.opts = opts
    this.map = null
  }
}

class OverlayView {
  map: null | google.maps.Map
  overlayLayer: HTMLElement
  draw = () => {}
  onAdd = () => {}
  onRemove = () => {}
  getPanes = () => ({
    overlayLayer: this.overlayLayer,
  })
  getProjection = () => ({
    fromLatLngToDivPixel: (latLng: google.maps.LatLng) => ({
      x: 0,
      y: 0,
    }),
  })
  setMap = (map: google.maps.Map) => {
    this.map = map
  }
  constructor() {
    this.map = null
    this.overlayLayer = document.createElement('div')
    document.body.appendChild(this.overlayLayer)
    setTimeout(() => {
      this.onAdd()
      setTimeout(() => {
        this.draw()
        setTimeout(() => {
          this.onRemove()
        }, 100)
      }, 100)
    }, 100)
  }
}

const defineGlobalVariable = () => {
  Object.defineProperty(global, 'google', {
    value: {
      maps: {
        event: {
          addListener(
            instance: google.maps.MVCObject,
            eventName: string,
            handler: Function,
          ): google.maps.MapsEventListener {
            return {remove: () => {}}
          },
        },
        places: {
          PlacesService: PlacesService,
        },
        visualization: {
          HeatmapLayer: HeatmapLayer,
        },
        Animation: {
          BOUNCE: 0,
          DROP: 1,
        },
        LatLng: LatLng,
        Map: Map,
        Marker: Marker,
        InfoWindow: InfoWindow,
        OverlayView: OverlayView,
        Polygon: Polygon,
      },
    },
    writable: true,
  })
}

export default defineGlobalVariable
