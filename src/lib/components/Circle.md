A simple Circle:

```jsx
const {GoogleMapProvider, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Circle id="circle" />
</GoogleMapProvider>
```
