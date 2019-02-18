A simple Polyline:

```jsx
const {GoogleMapProvider, MapBox, Polyline} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Polyline id="polyline" />
</GoogleMapProvider>
```
