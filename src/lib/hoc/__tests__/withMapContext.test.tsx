import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import {render, wait, cleanup, fireEvent} from 'react-testing-library'
import {MapBox, Marker, withMapContext} from '../../'
import {defineGlobalVariable} from '../../helpers'

const handleClick = (
  markers: google.maps.Marker[] | undefined,
  filter: string,
) => {
  console.log('Marker is clicked')
  if (markers === undefined) return
  markers
    .filter(marker => marker.getLabel() === filter)
    .forEach(marker => marker.setVisible(!marker.getVisible()))
}

const originalButton = ({
  markers,
  text,
  filter,
  onClick,
}: {
  markers: google.maps.Marker[]
  text: string
  filter: string
  onClick: (markers: google.maps.Marker[] | undefined, filter: string) => void
}) => <button onClick={() => onClick(markers, filter)}>{text}</button>
const Button = withMapContext(originalButton)

describe('withMapContext', () => {
  beforeEach(() => {
    defineGlobalVariable()
    jest.spyOn(console, 'log')
  })

  afterEach(() => {
    cleanup()
    Object.defineProperty(global, 'google', {value: undefined})
    jest.restoreAllMocks()
  })

  it('gives a component access to MapContext', async () => {
    const {container, getByText} = render(
      <MapBox apiKey="A_FAKE_API_KEY">
        <Marker label="test" position={{lat: 39, lng: 116}} />
        <Button text="TestButton" filter="test" onClick={handleClick} />
      </MapBox>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    fireEvent.click(getByText('TestButton'))
    expect(console.log).toHaveBeenCalledWith('Marker is clicked')
  })

  it('also works with PortalComponent', async () => {
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    const {container, getByText} = render(
      <MapBox
        apiKey="A_FAKE_API_KEY"
        portalNode={mountNode}
        PortalComponent={() => (
          <Button text="TestButton" filter="test" onClick={handleClick} />
        )}
      >
        <Marker label="test" position={{lat: 39, lng: 116}} />
      </MapBox>,
    )
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    fireEvent.click(getByText('TestButton'))
    expect(console.log).toHaveBeenCalledWith('Marker is clicked')
  })
})
