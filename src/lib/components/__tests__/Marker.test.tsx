import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {
  render,
  wait,
  cleanup,
  flushEffects,
  fireEvent,
} from 'react-testing-library'
import {MapBox, Marker} from '../../'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Marker', () => {
  beforeEach(() => {
    jest.spyOn(loadjs, 'reset')
    jest.spyOn(console, 'log')
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  it('renders inside a MapBox', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <Marker id="marker" />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    flushEffects()
  })

  it('updates options after rerender', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <Marker id="my-marker" opts={{position: {lat: 39, lng: 116}}} />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    flushEffects()
    rerender(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <Marker
          id="my-marker"
          opts={{
            animation: google.maps.Animation.BOUNCE,
            icon: '',
            label: 'test',
            place: {},
            position: {lat: 39, lng: 116},
            title: 'test',
            zIndex: 10,
          }}
        />
      </GoogleMapProvider>,
    )
  })

  it('with same id will only be added once', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <Marker id="marker" />
        <Marker id="marker" />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    flushEffects()
  })
})
