import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import {MapBox, Marker} from '../../'
import {defineGlobalVariable} from '../../helpers'

describe('MapBox', () => {
  beforeEach(() => {
    defineGlobalVariable()
    jest.spyOn(console, 'error')
    jest.spyOn(loadjs, 'reset')
  })

  afterEach(() => {
    cleanup()
    Object.defineProperty(global, 'google', {value: undefined})
    jest.restoreAllMocks()
  })

  it('renders map after fetch succeeded', async () => {
    const {container} = render(
      <MapBox apiKey="AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g">
        <Marker />>
      </MapBox>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(loadjs.reset).not.toHaveBeenCalled()
    expect(container.innerHTML).toMatch('This is a map')
  })
})
