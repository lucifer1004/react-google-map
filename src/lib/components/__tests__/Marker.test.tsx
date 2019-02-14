import React from 'react'
import {act} from 'react-dom/test-utils'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup, fireEvent} from 'react-testing-library'
import {MapBox, Marker} from '../../'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Marker', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
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
    act(() =>
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
      ),
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
  })
})
