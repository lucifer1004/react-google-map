Use BicyclingLayer:

```jsx
const {BicyclingLayer, GoogleMapProvider, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
  <BicyclingLayer />
</GoogleMapProvider>
```
