import {useState, useEffect} from 'react'
import loadjs from 'loadjs'
import {GOOGLE_MAP_BASE_URI} from '../common/constants'

const useGoogleAPI = (apiKey: string, libraryParam: string) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const googleMapScriptUri = `${GOOGLE_MAP_BASE_URI}?key=${apiKey}${libraryParam}`
    if (!loadjs.isDefined('gmap')) loadjs(googleMapScriptUri, 'gmap')
    loadjs.ready('gmap', {
      success: () => {
        setLoaded(true)
      },
      error: () => {
        loadjs.reset()
        console.error('Unable to fetch Google Map sdk')
      },
    })
  }, [])
  return loaded
}

export default useGoogleAPI
