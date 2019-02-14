A simple OverlayView:

```jsx
const {GoogleMapProvider, MapBox, OverlayView} = require('../')

;<GoogleMapProvider>
  <MapBox
    apiKey=""
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
    opts={{
      center: {lat: 39, lng: 116},
      zoom: 14,
    }}
    LoadedComponent={() => null}
  />
  <OverlayView position={{lat: 39, lng: 116}}>
    <h1 style={{fontSize: '40px'}}>This is an overlay🌈</h1>
  </OverlayView>
</GoogleMapProvider>
```
