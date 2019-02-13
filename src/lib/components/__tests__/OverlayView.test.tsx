import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, wait} from 'react-testing-library'
import {OverlayView, MapBox} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('OverlayView', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders inside a MapBox', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" />
        <OverlayView position={{lat: 39, lng: 116}}>
          <p>This is an overlay</p>
        </OverlayView>
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })

    // wait for mocked onAdd to be triggered
    await wait(() => {
      expect(document.body.innerHTML).toMatch('This is an overlay')
    })

    // wait for mocked onRemove to be triggered
    await wait(() => {
      expect(document.body.innerHTML).not.toMatch('This is an overlay')
    })
  })
})
