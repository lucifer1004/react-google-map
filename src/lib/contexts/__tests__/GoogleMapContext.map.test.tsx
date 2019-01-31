import React from 'react'
import {GoogleMapProvider} from '../GoogleMapContext'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, flushEffects} from 'react-testing-library'
import {defineGlobalVariable, FakeComponent} from '../../__test__helpers__'

beforeEach(() => {
  defineGlobalVariable()
  console.error = jest.fn()
})

afterEach(() => {
  cleanup()
  Object.defineProperty(global, 'google', {value: undefined})
  jest.restoreAllMocks()
})

describe('The dispatcher throws an error when trying to', () => {
  it('init map without a map instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'init_map'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a map instance'))
  })

  it('add more than one map to one context', () => {
    expect(() => {
      const map = new google.maps.Map(document.createElement('div'), {zoom: 14})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'init_map', map: map}} />
          <FakeComponent action={{type: 'init_map', map: map}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(
      new Error('There can only be one map instance in a context'),
    )
  })
})

describe('The dispatcher will', () => {
  it('reset the map', () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker', marker: marker}} />
          <FakeComponent action={{type: 'reset'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).not.toThrow()
  })

  it('ignore undefined action types', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'undefined'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).not.toThrow()
  })
})
