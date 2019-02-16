import React from 'react'
import {act} from 'react-dom/test-utils'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import {Polygon, MapBox} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('Polygon', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <Polygon
          id="polygon"
          paths={[{lat: 35, lng: 18}, {lat: 36, lng: 19}, {lat: 39, lng: 20}]}
        />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
          <Polygon
            id="polygon"
            paths={[{lat: 31, lng: 18}, {lat: 36, lng: 19}, {lat: 39, lng: 20}]}
            opts={{}}
            visible
          />
        </GoogleMapProvider>,
      ),
    )
  })

  it('with same id will only be added once', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <Polygon
          id="polygon"
          paths={[{lat: 35, lng: 18}, {lat: 36, lng: 19}, {lat: 39, lng: 20}]}
        />
        <Polygon
          id="polygon"
          paths={[{lat: 31, lng: 18}, {lat: 36, lng: 19}, {lat: 39, lng: 20}]}
        />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
