import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {cleanup, render, wait} from 'react-testing-library'
import {MapBox, StreetView} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('StreetView', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <StreetView />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
