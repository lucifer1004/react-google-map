import React from 'react'
import {GoogleMapProvider} from '../GoogleMapContext'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, flushEffects} from 'react-testing-library'
import {defineGlobalVariable, FakeComponent} from '../../__test__helpers__'
import {GoogleMapMarker} from '../../common/types'

const callbackFn = (marker: GoogleMapMarker) => {
  console.log(marker)
}

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

  it('remove a non-existing marker', () => {
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

  it('get a marker without id', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'get_marker'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify an id'))
  })

  it('get a marker without callback function', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'get_marker', id: 'hello'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a callback function'))
  })

  it('get a non-existing marker', () => {
    const marker = new google.maps.Marker({
      position: {lat: 0, lng: 0},
    }) as GoogleMapMarker
    marker.id = 'my-marker'
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker', marker: marker}} />
          <FakeComponent
            action={{type: 'get_marker', id: 'hello', callback: callbackFn}}
          />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('The marker cannot be found'))
  })
})

describe('The dispatcher will', () => {
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

  it('get a marker', () => {
    expect(() => {
      const marker = new google.maps.Marker({
        position: {lat: 0, lng: 0},
      }) as GoogleMapMarker
      marker.id = 'my-marker'
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker', marker: marker}} />
          <FakeComponent
            action={{type: 'get_marker', id: 'my-marker', callback: callbackFn}}
          />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).not.toThrow()
  })
})
