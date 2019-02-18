A simple GroundOverlay:

```jsx
const {GoogleMapProvider, GroundOverlay, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <GroundOverlay id="image" />
</GoogleMapProvider>
```
