import React from 'react'
import 'jest-dom/extend-expect'
import 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup} from 'react-testing-library'
import MapBox from '../MapBox'

describe('MapBox', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'google', {
      value: {
        maps: {
          Map: class {
            constructor(arg1: any, arg2: any) {
              return
            }
          },
        },
      },
      writable: true,
    })
    jest.spyOn(console, 'error')
  })

  afterEach(() => {
    cleanup()
    Object.defineProperty(global, 'google', {value: undefined})
    jest.restoreAllMocks()
  })

  it('renders map after loading js', async () => {
    const {container} = render(
      <MapBox apiKey="AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g" />,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(container.innerHTML).toMatch('This is a map')
  })

  it('does not re-render if fetch failed', async () => {
    const {container} = render(<MapBox apiKey="" />)
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Unable to fetch Google Map sdk',
      )
    })
    expect(container.innerHTML).toMatch('Loading...')
  })
})
