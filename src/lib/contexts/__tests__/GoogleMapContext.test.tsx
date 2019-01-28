import React from 'react'
import {GoogleMapProvider} from '../GoogleMapContext'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, flushEffects} from 'react-testing-library'
import {defineGlobalVariable, FakeComponent} from '../../__test__helpers__'

beforeEach(() => {
  defineGlobalVariable()
  jest.spyOn(console, 'error')
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

  it('add a marker without a marker instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a marker instance'))
  })

  it('add the same marker more than once', () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker', marker: marker}} />
          <FakeComponent action={{type: 'add_marker', marker: marker}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('The marker has already been added'))
  })

  it('remove a marker without a marker instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'remove_marker'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a marker instance'))
  })

  it('throws an error when trying to remove a non-existing marker', () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'remove_marker', marker: marker}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('The marker cannot be found'))
  })

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

  it('throws an error when trying to remove a non-existing polygon', () => {
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

  it('add and remove a marker', () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker', marker: marker}} />
          <FakeComponent action={{type: 'remove_marker', marker: marker}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).not.toThrow()
  })

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
