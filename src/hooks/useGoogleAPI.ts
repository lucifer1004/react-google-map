import {useState, useEffect} from 'react'
import loadjs from 'loadjs'

const useGoogleAPI = (apiKey: string, libraryParam: string) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const googleMapScriptUri = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${libraryParam}`
    loadjs(googleMapScriptUri, 'gmap')
    loadjs.ready('gmap', {
      success: () => {
        setLoaded(true)
      },
      error: () => {
        console.error('Unable to fetch Google Map sdk')
      },
    })
  }, [])
  return loaded
}

export default useGoogleAPI
