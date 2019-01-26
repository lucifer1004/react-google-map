import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
import 'react-testing-library/cleanup-after-each'
import {cleanup, render, wait} from 'react-testing-library'
import MapBox from '../MapBox'
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

  it('does not render map if fetch failed', async () => {
    const {container} = render(<MapBox apiKey="" />)
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Unable to fetch Google Map sdk',
      )
    })
    expect(loadjs.reset).toHaveBeenCalled()
    expect(container.innerHTML).toMatch('Loading...')
  })

  it('renders map after fetch succeeded', async () => {
    const {container} = render(<MapBox apiKey="A_FAKE_API_KEY" />)
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(loadjs.reset).not.toHaveBeenCalled()
    expect(container.innerHTML).toMatch('This is a map')
  })

  it('does not fetch again', async () => {
    const {container} = render(<MapBox apiKey="A_FAKE_API_KEY" />)
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(loadjs.reset).not.toHaveBeenCalled()
    expect(container.innerHTML).toMatch('This is a map')
  })

  it('can accept onClick prop', async () => {
    const {container} = render(
      <MapBox apiKey="A_FAKE_API_KEY" onClick={() => {}} />,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(container.innerHTML).toMatch('This is a map')
  })

  it('renders PortalComponent at portalNode', async () => {
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    const {container, getByText} = render(
      <MapBox apiKey="A_FAKE_API_KEY" portalNode={mountNode} />,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(container.innerHTML).toMatch('This is a map')
    expect(getByText('This is a portal')).not.toBe(null)
  })
})
