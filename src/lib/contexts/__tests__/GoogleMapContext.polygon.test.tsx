import React from 'react'
import {GoogleMapProvider} from '../GoogleMapContext'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup, flushEffects} from 'react-testing-library'
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
  it('add a polygon without a polygon instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_polygon', id: 'poly'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify a polygon instance'))
  })

  it('add a polygon without an id', () => {
    expect(() => {
      const polygon = new google.maps.Polygon({})
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'add_polygon', polygon: polygon}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify an id'))
  })

  it('use the same id more than once', () => {
    expect(() => {
      const polygon = new google.maps.Polygon({})
      render(
        <GoogleMapProvider>
          <FakeComponent
            action={{type: 'add_polygon', polygon: polygon, id: 'poly'}}
          />
          <FakeComponent
            action={{type: 'add_polygon', polygon: polygon, id: 'poly'}}
          />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('The id has already been taken'))
  })

  it('remove a polygon without an id', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'remove_polygon'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('You should specify an id'))
  })

  /**
   * If this test is not run concurrently, the context will be polluted.
   */
  it.concurrent('remove a non-existing polygon', async () => {
    /**
     * This mock does not work for concurrent tests in the beforeEach hook.
     */

    console.error = jest.fn()

    expect(() => {
      render(
        <GoogleMapProvider>
          <FakeComponent action={{type: 'remove_polygon', id: 'poly'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).toThrowError(new Error('There is no polygon with the given id'))
  })
})

describe('The dispatcher will', () => {
  it.concurrent('add and remove a polygon', async () => {
    expect(() => {
      const polygon = new google.maps.Polygon({})
      render(
        <GoogleMapProvider>
          <FakeComponent
            action={{type: 'add_polygon', polygon: polygon, id: 'poly'}}
          />
          <FakeComponent action={{type: 'remove_polygon', id: 'poly'}} />
        </GoogleMapProvider>,
      )
      flushEffects()
    }).not.toThrow()
  })
})
