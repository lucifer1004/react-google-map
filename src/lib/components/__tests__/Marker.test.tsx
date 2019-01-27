import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup, flushEffects} from 'react-testing-library'
import {MapBox, Marker} from '../../'
import {defineGlobalVariable} from '../../__test__helpers__'

describe('Marker', () => {
  beforeEach(() => {
    defineGlobalVariable()
    jest.spyOn(loadjs, 'reset')
  })

  afterEach(() => {
    cleanup()
    Object.defineProperty(global, 'google', {value: undefined})
    jest.restoreAllMocks()
  })

  it('renders inside a MapBox', async () => {
    const {container, rerender} = render(
      <MapBox apiKey="A_FAKE_API_KEY">
        <Marker position={{lat: 39, lng: 116}} />
      </MapBox>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    flushEffects()
    rerender(
      <MapBox apiKey="A_FAKE_API_KEY">
        <Marker
          animation={google.maps.Animation.BOUNCE}
          icon={{}}
          label="test"
          place={{}}
          position={{lat: 39, lng: 116}}
          shape={{}}
          title=""
          zIndex={10}
        />
      </MapBox>,
    )
    flushEffects()
    rerender(
      <MapBox apiKey="A_FAKE_API_KEY">
        <Marker position={{lat: 39, lng: 116}} />
      </MapBox>,
    )
  })
})
