import React, {useState} from 'react'
import {StreetView} from '../lib'

export default ({bindToMap}: {bindToMap?: boolean}) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(show => !show)}>
        click to {show ? 'close the' : 'open a'}{' '}
        {bindToMap ? 'bound' : 'separate'} StreetView{' '}
      </button>
      {show ? <StreetView bindToMap={bindToMap} /> : null}
    </>
  )
}
