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
  it('add a polygon without a polygon instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_polygon'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a polygon instance'))
  })

  it('add the same polygon more than once', () => {
    expect(() => {
      const polygon = new google.maps.Polygon({})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_polygon', polygon: polygon}} />
          <FakeComponent action={{type: 'add_polygon', polygon: polygon}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('The polygon has already been added'))
  })

  it('remove a polygon without a polygon instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'remove_polygon'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a polygon instance'))
  })

  it('remove a non-existing polygon', () => {
    expect(() => {
      const polygon = new google.maps.Polygon({})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'remove_polygon', polygon: polygon}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('The polygon cannot be found'))
  })
})

describe('The dispatcher will', () => {
  it('add and remove a polygon', () => {
    expect(() => {
      const polygon = new google.maps.Polygon({})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_polygon', polygon: polygon}} />
          <FakeComponent action={{type: 'remove_polygon', polygon: polygon}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).not.toThrow()
  })
})
