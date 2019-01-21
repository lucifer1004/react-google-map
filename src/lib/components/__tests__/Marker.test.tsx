import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import {MapBox, Marker} from '../../'

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

describe('MapBox', () => {
  beforeEach(() => {
    defineGlobalVariable()
    jest.spyOn(console, 'error')
    jest.spyOn(loadjs, 'reset')
  })

  afterEach(() => {
    cleanup()
    Object.defineProperty(global, 'google', {value: undefined})
    jest.restoreAllMocks()
  })

  it('renders map after fetch succeeded', async () => {
    const {container} = render(
      <MapBox apiKey="AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g">
        <Marker />>
      </MapBox>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(loadjs.reset).not.toHaveBeenCalled()
    expect(container.innerHTML).toMatch('This is a map')
  })
})
