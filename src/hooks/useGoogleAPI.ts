import {useState, useEffect} from 'react'
import loadjs from 'loadjs'

const useGoogleAPI = (apiKey: string, callbackFunction: string) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const googleMapScriptUri = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackFunction}`
    loadjs(googleMapScriptUri, () => setLoaded(true))
  }, [])
  return loaded
}

export default useGoogleAPI
