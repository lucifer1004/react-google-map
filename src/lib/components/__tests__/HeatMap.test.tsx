import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, flushEffects} from 'react-testing-library'
import {HeatMap, MapBox} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('HeatMap', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders inside a MapBox', async () => {
    render(
      <GoogleMapProvider>
        <MapBox
          apiKey="A_FAKE_API_KEY"
          opts={{
            center: {lat: 39, lng: 116},
            zoom: 14,
          }}
        />
        <HeatMap />
      </GoogleMapProvider>,
    )
    flushEffects()
  })
})
