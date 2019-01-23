import {MarkerProps, PolygonProps} from '../common/types'

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
          anchorPoint: google.maps.Point
          animation: google.maps.Animation
          clickable: boolean
          draggable: boolean
          icon: string | google.maps.Icon | google.maps.Symbol
          label: string | google.maps.MarkerLabel
          opacity: number
          optimized: boolean
          place: google.maps.Place
          position: google.maps.LatLngLiteral | google.maps.LatLng
          shape: google.maps.MarkerShape
          title: string
          visible: boolean
          zIndex: number
          setAnimation = (animation: google.maps.Animation) => {
            this.animation = animation
          }
          setClickable = (clickable: boolean) => {
            this.clickable = clickable
          }
          setDraggable = (draggable: boolean) => {
            this.draggable = draggable
          }
          setIcon = (icon: string | google.maps.Icon | google.maps.Symbol) => {
            this.icon = icon
          }
          setLabel = (label: string | google.maps.MarkerLabel) => {
            this.label = label
          }
          setOpacity = (opacity: number) => {
            this.opacity = opacity
          }
          setOptimized = (optimized: boolean) => {
            this.optimized = optimized
          }
          setPlace = (place: google.maps.Place) => {
            this.place = place
          }
          setPosition = (
            position: google.maps.LatLngLiteral | google.maps.LatLng,
          ) => {
            this.position = position
          }
          setShape = (shape: google.maps.MarkerShape) => {
            this.shape = shape
          }
          setTitle = (title: string) => {
            this.title = title
          }
          setVisible = (visible: boolean) => {
            this.visible = visible
          }
          setZIndex = (zIndex: number) => {
            this.zIndex = zIndex
          }
          constructor(opts: {
            anchorPoint: google.maps.Point
            animation: google.maps.Animation
            clickable: boolean
            draggable: boolean
            icon: string | google.maps.Icon | google.maps.Symbol
            label: string | google.maps.MarkerLabel
            opacity: number
            optimized: boolean
            place: google.maps.Place
            position: google.maps.LatLngLiteral | google.maps.LatLng
            shape: google.maps.MarkerShape
            title: string
            visible: boolean
            zIndex: number
          }) {
            this.anchorPoint = opts.anchorPoint
            this.animation = opts.animation
            this.clickable = opts.clickable
            this.draggable = opts.draggable
            this.icon = opts.icon
            this.label = opts.label
            this.opacity = opts.opacity
            this.optimized = opts.optimized
            this.place = opts.place
            this.position = opts.position
            this.shape = opts.shape
            this.title = opts.title
            this.visible = opts.visible
            this.zIndex = opts.zIndex
          }
        },
        InfoWindow: class {
          position: google.maps.LatLngLiteral
          content: string
          open(map: google.maps.Map): void {}
          constructor(opts: {
            position: google.maps.LatLngLiteral
            content: string
          }) {
            this.position = opts.position
            this.content = opts.content
          }
        },
        Polygon: class {
          constructor(opts: PolygonProps) {}
        },
      },
    },
    writable: true,
  })
}

export default defineGlobalVariable
