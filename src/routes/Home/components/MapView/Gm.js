import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'

// TODO: calc viewport based on data
const Gm = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={12}
    onMapMounted={props.onBoundsChanged}
    onBoundsChanged={props.onBoundsChanged}
    defaultCenter={{ lat: 59.3288189, lng: 18.0661978 }}
  >
    {(props.data || []).map((marker, i) =>
      <Marker
        key={i}
        position={{ ...marker.geometry.location }}
        onClick={typeof props.handleMarkerClick === 'function'
          ? () => props.handleMarkerClick(i)
          : () => {}}
      />
    )}
  </GoogleMap>
))
export default Gm
