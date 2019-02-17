A simple Circle:

```jsx
const {Circle, GoogleMapProvider, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Circle id="circle" />
</GoogleMapProvider>
```
