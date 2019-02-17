import {useState, useEffect} from 'react'
import loadjs from 'loadjs'
import {GOOGLE_MAP_BASE_URI} from '../common/constants'

interface GoogleAPIProps {
  apiKey: string
  libraryParam: string
  languageParam: string
}

const useGoogleAPI = ({
  apiKey,
  libraryParam,
  languageParam,
}: GoogleAPIProps) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const googleMapScriptUri = `${GOOGLE_MAP_BASE_URI}?key=${apiKey}${libraryParam}${languageParam}`
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
