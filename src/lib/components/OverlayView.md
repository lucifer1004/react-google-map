A simple OverlayView:

```jsx
const {GoogleMapProvider, MapBox, OverlayView} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
  <OverlayView>
    <h1 style={{fontSize: '40px'}}>This is an overlay🌈</h1>
  </OverlayView>
</GoogleMapProvider>
```
