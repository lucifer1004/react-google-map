import {useEffect} from 'react'

const useGoogleListener = (
  instance: google.maps.MVCObject,
  eventName: string,
  handler: Function | undefined,
) => {
  useEffect(() => {
    if (instance === undefined || handler === undefined) return
    const listener = google.maps.event.addListener(instance, eventName, handler)
    return () => {
      listener.remove()
    }
  }, [instance])
}

export default useGoogleListener
