A simple Polyline:

```jsx
const {GoogleMapProvider, MapBox, Polyline} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Polyline id="polygon" />
</GoogleMapProvider>
```
