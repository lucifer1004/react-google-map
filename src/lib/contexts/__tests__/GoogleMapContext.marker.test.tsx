import React from 'react'
import {GoogleMapProvider} from '../GoogleMapContext'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup} from 'react-testing-library'
import {defineGlobalVariable, FakeComponent} from '../../__test__helpers__'

defineGlobalVariable()

beforeEach(() => {
  console.error = jest.fn()
})

afterEach(() => {
  cleanup()
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
    }).toThrowError(new Error('You should specify a marker instance'))
  })

  it('add a marker without an id', () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_marker', marker: marker}} />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('You should specify an id'))
  })

  it('add the same marker more than once', () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <FakeComponent
            action={{type: 'add_marker', marker: marker, id: 'marker'}}
          />
          <FakeComponent
            action={{type: 'add_marker', marker: marker, id: 'marker'}}
          />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('The id has already been taken'))
  })

  it('remove a marker without an id', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'remove_marker'}} />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('You should specify an id'))
  })

  it.concurrent('remove a non-existing marker', async () => {
    console.error = jest.fn()
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'remove_marker', id: 'marker'}} />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('There is no marker with the given id'))
  })
})

describe('The dispatcher will', () => {
  it.concurrent('add and remove a marker', async () => {
    expect(() => {
      const marker = new google.maps.Marker({position: {lat: 0, lng: 0}})
      render(
        <GoogleMapProvider>
          <FakeComponent
            action={{type: 'add_marker', marker: marker, id: 'marker'}}
          />
          <FakeComponent action={{type: 'remove_marker', id: 'marker'}} />
        </GoogleMapProvider>,
      )
    }).not.toThrow()
  })
})
