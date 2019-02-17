import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {cleanup, render, wait, act} from 'react-testing-library'
import {MapBox, StreetView} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('StreetView', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <StreetView />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <StreetView bindToMap opts={{position: {lat: 39, lng: 116}}} />
        </GoogleMapProvider>,
      ),
    )
  })
})
