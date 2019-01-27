import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import {Polygon, MapBox} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

describe('Polygon', () => {
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
    const {container} = render(
      <GoogleMapProvider>
        <MapBox apiKey="A_FAKE_API_KEY" />
        <Polygon
          paths={[{lat: 35, lng: 18}, {lat: 36, lng: 19}, {lat: 39, lng: 20}]}
        />
      </GoogleMapProvider>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(loadjs.reset).not.toHaveBeenCalled()
    expect(container.innerHTML).toMatch('This is a map')
  })
})
