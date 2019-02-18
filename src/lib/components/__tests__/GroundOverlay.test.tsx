import React from 'react'
import {act} from 'react-dom/test-utils'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import {GroundOverlay, MapBox} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

defineGlobalVariable()

describe('GroundOverlay', () => {
  afterEach(() => {
    cleanup()
  })

  it('can be rendered', async () => {
    const {container, rerender} = render(
      <GoogleMapProvider>
        <MapBox apiKey="FAKE_KEY" />
        <GroundOverlay
          id="ground-overlay"
          opts={{
            url: 'https://placehold.it/256x256',
            bounds: {
              east: 116,
              west: 115.9,
              north: 39,
              south: 38.9,
            },
            opacity: 0.8,
          }}
        />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <GroundOverlay
            id="ground-overlay"
            opts={{
              url: 'https://placehold.it/256x256',
              bounds: {
                east: 116,
                west: 115.9,
                north: 39,
                south: 38.9,
              },
              opacity: 0.5,
            }}
          />
        </GoogleMapProvider>,
      ),
    )
    act(() =>
      rerender(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <GroundOverlay
            id="ground-overlay"
            opts={{
              url: 'https://placehold.it/256x256',
              bounds: {
                east: 116,
                west: 115.9,
                north: 39,
                south: 38.8,
              },
              opacity: 0.5,
            }}
          />
        </GoogleMapProvider>,
      ),
    )
  })

  it('of same id cannot be added twice', async () => {
    const check = async () => {
      const {container} = render(
        <GoogleMapProvider>
          <MapBox apiKey="FAKE_KEY" />
          <GroundOverlay id="ground-overlay" />
          <GroundOverlay id="ground-overlay" />
        </GoogleMapProvider>,
      )
      await wait(() => {
        expect(container.innerHTML).not.toMatch('Loading...')
      })
    }

    expect(check()).rejects.toEqual(new Error('The id has already been taken'))
  })
})
