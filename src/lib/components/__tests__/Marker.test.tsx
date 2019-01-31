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
import {
  defineGlobalVariable,
  FakeButton,
  FakeComponent,
} from '../../__test__helpers__'
import {GoogleMapMarker} from '../../common/types'

describe('Marker', () => {
  beforeEach(() => {
    defineGlobalVariable()
    jest.spyOn(loadjs, 'reset')
    jest.spyOn(console, 'log')
  })

  afterEach(() => {
    cleanup()
    Object.defineProperty(global, 'google', {value: undefined})
    jest.restoreAllMocks()
  })

  it('renders inside a MapBox', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <Marker />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    flushEffects()
  })

  it('updates options after rerender', async () => {
    const {container, getByText, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <Marker id="my-marker" opts={{position: {lat: 39, lng: 116}}} />
        <FakeButton
          action={{
            type: 'get_marker',
            id: 'my-marker',
            callback: (marker: GoogleMapMarker) => console.log(marker),
          }}
        />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    flushEffects()
    fireEvent.click(getByText('Fake button'))
    expect(console.log).toHaveBeenCalledTimes(1)
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
        <FakeComponent
          action={{
            type: 'get_marker',
            id: 'my-marker',
            callback: (marker: GoogleMapMarker) => console.log(marker),
          }}
        />
      </GoogleMapProvider>,
    )
    expect(console.log).toHaveBeenCalledTimes(1)
  })
})
