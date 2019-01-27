import React, {useContext, useEffect} from 'react'
import {GoogleMapContext, GoogleMapProvider} from '../GoogleMapContext'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, flushEffects} from 'react-testing-library'
import {defineGlobalVariable} from '../../__test__helpers__'
import {GoogleMapAction} from '../../common/types'

const FakeComponent = ({action}: {action: GoogleMapAction}) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  useEffect(() => {
    dispatch(action)
  }, [state])
  return <div />
}

describe('The dispatcher', () => {
  beforeEach(() => {
    defineGlobalVariable()
    jest.spyOn(console, 'error')
  })

  afterEach(() => {
    cleanup()
    Object.defineProperty(global, 'google', {value: undefined})
    jest.restoreAllMocks()
  })

  it('throws an error when trying to init map without a map instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'init_map'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a map instance'))
  })

  it('throws an error when trying to add more than one map to one context', () => {
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

  it('throws an error when trying to add a marker without a marker instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a marker instance'))
  })

  it('throws an error when trying to add the same marker', () => {
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

  it('throws an error when trying to remove a marker without a marker instance', () => {
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

  it('can reset', () => {
    const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker', marker: marker}} />
          <FakeComponent action={{type: 'reset'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).not.toThrow()
  })

  it('can remove a marker', () => {
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

  it('ignores undefined action types', () => {
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
