import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, wait, act} from 'react-testing-library'
import {HeatMap, MapBox} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('HeatMap', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" useVisualization />
        <HeatMap />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() => {
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" useVisualization />
          <HeatMap
            opts={{
              data: [
                {lat: 39, lng: 116},
                {lat: 39.001, lng: 116},
                {lat: 39.002, lng: 116.001, weight: 1.5},
                {lat: 39.002, lng: 116.002, weight: 3.5},
              ],
            }}
          />
        </GoogleMapProvider>,
      )
    })
  })
})
