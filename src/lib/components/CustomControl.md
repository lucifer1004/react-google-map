A simple CustomControl:

```jsx
const {
  CustomControl,
  GoogleMapContext,
  GoogleMapProvider,
  MapBox,
} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <CustomControl>
    <button
      style={{
        color: 'red',
      }}
    >
      CustomControl
    </button>
  </CustomControl>
</GoogleMapProvider>
```
