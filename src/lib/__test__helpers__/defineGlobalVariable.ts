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
        Animation: {
          BOUNCE: 0,
          DROP: 1,
        },
        Map: Map,
        Marker: Marker,
        InfoWindow: InfoWindow,
        Polygon: Polygon,
      },
    },
    writable: true,
  })
}

export default defineGlobalVariable
