import React from 'react'
import {GoogleMapProvider} from '../GoogleMapContext'
import 'react-testing-library/cleanup-after-each'
import {render, cleanup} from 'react-testing-library'
import {defineGlobalVariable, ActionDispatcher} from '../../__test__helpers__'

defineGlobalVariable()

afterEach(() => {
  cleanup()
})

describe('The dispatcher throws an error when trying to', () => {
  it('add a search without a search instance', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <ActionDispatcher action={{type: 'add_search'}} />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('You should specify a search instance'))
  })

  it('add a search without an id', () => {
    expect(() => {
      const search = new google.maps.places.SearchBox(
        document.createElement('input'),
      )
      render(
        <GoogleMapProvider>
          <ActionDispatcher action={{type: 'add_search', search: search}} />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('You should specify an id'))
  })

  it('use the same id more than once', () => {
    expect(() => {
      const search = new google.maps.places.SearchBox(
        document.createElement('input'),
      )
      render(
        <GoogleMapProvider>
          <ActionDispatcher
            action={{type: 'add_search', search: search, id: 'search'}}
          />
          <ActionDispatcher
            action={{type: 'add_search', search: search, id: 'search'}}
          />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('The id has already been taken'))
  })

  it('remove a search without an id', () => {
    expect(() => {
      render(
        <GoogleMapProvider>
          <ActionDispatcher action={{type: 'remove_search'}} />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('You should specify an id'))
  })

  it.concurrent('remove a non-existing search', async () => {
    console.error = jest.fn()
    expect(() => {
      render(
        <GoogleMapProvider>
          <ActionDispatcher action={{type: 'remove_search', id: 'search'}} />
        </GoogleMapProvider>,
      )
    }).toThrowError(new Error('There is no search with the given id'))
  })
})

describe('The dispatcher will', () => {
  it.concurrent('add and remove an object', async () => {
    expect(() => {
      const search = new google.maps.places.SearchBox(
        document.createElement('input'),
      )
      render(
        <GoogleMapProvider>
          <ActionDispatcher
            action={{type: 'add_search', search: search, id: 'search'}}
          />
          <ActionDispatcher action={{type: 'remove_search', id: 'search'}} />
        </GoogleMapProvider>,
      )
    }).not.toThrow()
  })
})
