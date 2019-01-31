import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import {HeatMap, MapBox} from '../..'
import {GoogleMapProvider} from '../../contexts/GoogleMapContext'
import {defineGlobalVariable} from '../../__test__helpers__'

describe('HeatMap', () => {
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
        <MapBox apiKey="A_FAKE_API_KEY" opts={{}} />
        <HeatMap />
      </GoogleMapProvider>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
  })
})
