Use TransitLayer:

```jsx
const {GoogleMapProvider, MapBox, TransitLayer} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
  <TransitLayer />
</GoogleMapProvider>
```
