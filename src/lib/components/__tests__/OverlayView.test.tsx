import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup} from 'react-testing-library'
import {OverlayView, MapBox} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('OverlayView', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders inside a MapBox', async () => {
    render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" />
        <OverlayView />
      </GoogleMapProvider>,
    )
  })
})
