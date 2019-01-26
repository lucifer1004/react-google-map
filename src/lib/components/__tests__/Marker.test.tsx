import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import {MapBox, Marker} from '../../'
import {defineGlobalVariable} from '../../helpers'

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

  // it('renders inside a MapBox', async () => {
  //   const {container, rerender} = render(
  //     <MapBox apiKey="A_FAKE_API_KEY">
  //       <Marker label="test" position={{lat: 39, lng: 116}} />
  //     </MapBox>,
  //   )
  //   expect(container.innerHTML).toMatch('Loading...')
  //   await wait(() => {
  //     expect(container.innerHTML).not.toMatch('Loading...')
  //   })
  //   expect(loadjs.reset).not.toHaveBeenCalled()
  //   expect(container.innerHTML).toMatch('This is a map')
  //   rerender(
  //     <MapBox apiKey="A_FAKE_API_KEY">
  //       <Marker label="changed-label" position={{lat: 39, lng: 116}} />
  //     </MapBox>,
  //   )
  // })

  it('renders inside a MapBox', async () => {
    const {container, rerender} = render(
      <MapBox apiKey="A_FAKE_API_KEY">
        <Marker position={{lat: 39, lng: 116}} />
      </MapBox>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
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
  })
})
