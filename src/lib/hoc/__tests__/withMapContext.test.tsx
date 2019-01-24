import React from 'react'
import 'jest-dom/extend-expect'
import loadjs from 'loadjs'
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
    jest.spyOn(loadjs, 'reset')
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
        <Button text="TestButton" filter="test" onClick={handleClick} s />
      </MapBox>,
    )
    expect(container.innerHTML).toMatch('Loading...')
    await wait(() => {
      expect(container.innerHTML).not.toMatch('Loading...')
    })
    expect(loadjs.reset).not.toHaveBeenCalled()
    expect(container.innerHTML).toMatch('This is a map')
    fireEvent.click(getByText('TestButton'))
    expect(console.log).toHaveBeenCalledWith('Marker is clicked')
  })
})
