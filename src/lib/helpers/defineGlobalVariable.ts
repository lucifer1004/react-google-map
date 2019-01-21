const defineGlobalVariable = () => {
  Object.defineProperty(global, 'google', {
    value: {
      maps: {
        Map: class {
          zoom: number
          center: google.maps.LatLngLiteral
          setZoom(zoom: number): void {}
          setCenter(center: google.maps.LatLngLiteral): void {}
          constructor(
            mapDiv: HTMLElement,
            opts: {zoom: number; center: google.maps.LatLngLiteral},
          ) {
            this.zoom = opts.zoom
            this.center = opts.center
            this.setZoom = (zoom: number) => (this.zoom = zoom)
            this.setCenter = (center: google.maps.LatLngLiteral) =>
              (this.center = center)
          }
        },
        Marker: class {
          position: google.maps.LatLngLiteral
          map: google.maps.Map
          draggable: boolean
          constructor(opts: {
            position: google.maps.LatLngLiteral
            map: google.maps.Map
            draggable: boolean
          }) {
            this.position = opts.position
            this.map = opts.map
            this.draggable = opts.draggable
          }
        },
      },
    },
    writable: true,
  })
}

export default defineGlobalVariable
