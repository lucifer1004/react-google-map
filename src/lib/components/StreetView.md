A wrapper around `google.maps.StreetViewPanorama`.

- `opts` specifies the options you want the street view to be created with.
- `style` and `className` will be set for the `div` container of the street
  view.
- `bindToMap` determines whether the street view will be bound to the map. If
  `true`, the map's StreetViewControl will be bound with the current street
  view.
- The rest are event handlers. For each type of event, there can be an event
  handler.

> **[NOTE]** There can be at most one `StreetView` with `bindToMap` set to
> `true`, otherwise issues may occur.
>
> **[NOTE]** Although the `bindToMap` prop can be set dynamically, it is not
> recommended to do so.
>
> **[NOTE]** Currently, `StreetView` cannot be used when there is no `MapBox`.
> If you do not want the map to be displayed, just set its style properly so
> that it will be hidden. Also, attachments to street view is not allowed.

A simple StreetView:

```jsx
const {GoogleMapProvider, MapBox, StreetView} = require('../')

;<GoogleMapProvider>
  <MapBox />
  <StreetView
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
</GoogleMapProvider>
```
